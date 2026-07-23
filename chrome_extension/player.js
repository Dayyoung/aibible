// player.js - AI Bible Video Maker Controller

const params = new URLSearchParams(window.location.search);
const sessionId = params.get("sessionId") || "";
const canvas = document.getElementById("stage");
const caption = document.getElementById("caption");
const badge = document.getElementById("badge");
const ctx = canvas.getContext("2d");

let isStopped = false;
let mediaRecorder = null;
let audioContext = null;
let audioDestination = null;
let recordingStream = null;
let recordedChunks = [];
let activeBlobUrl = "";

function chromeStorageGet(keys) {
  return new Promise(resolve => chrome.storage.local.get(keys, resolve));
}

function chromeStorageSet(items) {
  return new Promise(resolve => chrome.storage.local.set(items, resolve));
}

function chromeDownload(options) {
  return new Promise(resolve => {
    chrome.downloads.download(options, downloadId => {
      if (chrome.runtime.lastError || typeof downloadId !== "number") {
        resolve({
          downloadId,
          error: chrome.runtime.lastError ? chrome.runtime.lastError.message : "Download failed"
        });
        return;
      }

      const timeout = setTimeout(() => {
        chrome.downloads.onChanged.removeListener(onChanged);
        resolve({ downloadId, error: "Download completion timeout" });
      }, 10 * 60 * 1000);

      function onChanged(delta) {
        if (delta.id !== downloadId || !delta.state) return;

        if (delta.state.current === "complete") {
          clearTimeout(timeout);
          chrome.downloads.onChanged.removeListener(onChanged);
          resolve({ downloadId, error: "" });
        } else if (delta.state.current === "interrupted") {
          clearTimeout(timeout);
          chrome.downloads.onChanged.removeListener(onChanged);
          resolve({ downloadId, error: "Download interrupted" });
        }
      }

      chrome.downloads.onChanged.addListener(onChanged);
    });
  });
}

function getSupportedMimeType() {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm"
  ];
  return candidates.find(type => MediaRecorder.isTypeSupported(type)) || "";
}

function getTtsUrl(text) {
  const trimmedText = String(text || "").replace(/\s+/g, " ").trim().slice(0, 180);
  // Force Korean language (tl=ko) for narration
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ko&q=${encodeURIComponent(trimmedText)}`;
}

async function fetchTtsAudioBuffer(text) {
  const response = await fetch(getTtsUrl(text), {
    cache: "no-store",
    credentials: "omit"
  });

  if (!response.ok) {
    throw new Error(`TTS fetch failed: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Enable cross-origin image loads on canvas
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Image load failed: ${src}`));
    image.src = src;
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawContain(image) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = (canvas.width - width) / 2;
  const y = (canvas.height - height) / 2;
  ctx.drawImage(image, x, y, width, height);
}

async function playTts(sentence, settings) {
  if (!sentence || !audioContext || !audioDestination) return;

  try {
    const buffer = await fetchTtsAudioBuffer(sentence);
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    const rate = Number.isFinite(Number(settings.rate)) ? Number(settings.rate) : 0.95;
    const volume = Number.isFinite(Number(settings.volume)) ? Number(settings.volume) : 1;

    source.buffer = buffer;
    source.playbackRate.value = Math.min(1.4, Math.max(0.6, rate));
    gain.gain.value = Math.min(1, Math.max(0, volume));
    source.connect(gain);
    gain.connect(audioDestination);
    gain.connect(audioContext.destination);

    await audioContext.resume();
    await new Promise(resolve => {
      const fallbackMs = Math.max(1800, Math.min(15000, (buffer.duration / source.playbackRate.value) * 1000 + 500));
      const timeout = setTimeout(resolve, fallbackMs);
      source.onended = () => {
        clearTimeout(timeout);
        resolve();
      };
      source.start();
    });
  } catch (err) {
    console.warn("[Player] TTS playback failed, falling back to delay timer", err.message);
    const fallbackMs = Math.max(2500, Math.min(8000, sentence.split(/\s+/).length * 350));
    badge.innerText = "TTS 로드 실패 (안내자막 타이밍 유지)";
    await new Promise(resolve => setTimeout(resolve, fallbackMs));
  }
}

function startRecording(filename) {
  recordedChunks = [];
  audioContext = new AudioContext();
  audioDestination = audioContext.createMediaStreamDestination();

  const canvasStream = canvas.captureStream(30);
  recordingStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioDestination.stream.getAudioTracks()
  ]);

  const mimeType = getSupportedMimeType();
  mediaRecorder = new MediaRecorder(recordingStream, mimeType ? { mimeType } : undefined);
  mediaRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  mediaRecorder.start(1000);

  return filename;
}

function stopTracks() {
  if (recordingStream) {
    recordingStream.getTracks().forEach(track => track.stop());
    recordingStream = null;
  }

  if (audioContext) {
    audioContext.close().catch(() => {});
    audioContext = null;
  }

  audioDestination = null;
}

function stopRecording(filename) {
  return new Promise(resolve => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      stopTracks();
      resolve({ ok: false, error: "No active recording" });
      return;
    }

    const recorder = mediaRecorder;
    recorder.onstop = async () => {
      const mimeType = recorder.mimeType || "video/webm";
      const blob = new Blob(recordedChunks, { type: mimeType });
      activeBlobUrl = URL.createObjectURL(blob);
      
      const result = await chromeDownload({
        url: activeBlobUrl,
        filename,
        conflictAction: "overwrite",
        saveAs: false
      });

      resolve({
        ok: !result.error,
        filename,
        mimeType,
        byteLength: blob.size,
        downloadId: result.downloadId,
        error: result.error
      });

      mediaRecorder = null;
      recordedChunks = [];
      stopTracks();
      setTimeout(() => {
        if (activeBlobUrl) URL.revokeObjectURL(activeBlobUrl);
        activeBlobUrl = "";
      }, 60000);
    };

    recorder.stop();
  });
}

async function finishPlayback(payload, reason) {
  const recordingResult = await stopRecording(payload.filename);
  chrome.runtime.sendMessage({
    action: "manual_slideshow_finished",
    bookTitle: payload.bookTitle,
    chapterNum: payload.chapterNum,
    reason,
    recordingResult
  });
}

async function runPlayer(payload) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const images = payload.images || [];
  const verses = payload.verses || [];
  const totalCount = verses.length;
  
  if (!totalCount) {
    badge.innerText = "Error";
    caption.innerText = "녹화할 구절 데이터를 찾을 수 없습니다.";
    return;
  }

  startRecording(payload.filename);

  for (let index = 0; index < totalCount && !isStopped; index++) {
    // 1. Draw image to canvas
    if (images[index]) {
      try {
        const image = await loadImage(images[index]);
        drawContain(image);
      } catch (err) {
        console.error("[Player] Image load error:", images[index], err.message);
        // Fallback: draw black screen
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // 2. Play text narration and update caption
    const text = verses[index];
    caption.innerText = text;
    badge.innerText = `${payload.bookTitle} ${payload.chapterNum}장 · ${index + 1} / ${totalCount} 구절`;
    
    await chromeStorageSet({
      current_count: index + 1,
      total_count: totalCount,
      pipeline_status: `${payload.bookTitle} ${payload.chapterNum}장 비디오 녹화 중...`
    }).catch(() => {});

    await playTts(text, payload.ttsSettings || {});
  }

  await finishPlayback(payload, isStopped ? "stopped" : "completed");
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== "snshero_player" || message.sessionId !== sessionId) return false;

  if (message.action === "stop_player") {
    isStopped = true;
    sendResponse({ ok: true });
    return true;
  }

  return false;
});

(async () => {
  const data = await chromeStorageGet("manual_player_payload");
  const payload = data.manual_player_payload;
  if (!payload || payload.sessionId !== sessionId) {
    badge.innerText = "Bible Video Maker";
    caption.innerText = "재생 데이터를 찾을 수 없습니다.";
    return;
  }

  runPlayer(payload).catch(err => {
    console.error("[Player] Run error:", err);
    chrome.runtime.sendMessage({
      action: "manual_slideshow_finished",
      bookTitle: payload.bookTitle,
      chapterNum: payload.chapterNum,
      reason: "error",
      recordingResult: { ok: false, error: err.message }
    });
  });
})();
