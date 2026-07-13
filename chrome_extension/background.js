// background.js

const FLOW_PROJECT_URL = "https://labs.google/fx/ko/tools/flow/project/15375760-e695-4b2f-ad56-71b7f69b4dc5";
const FALLBACK_BIBLE_DOWNLOAD_ROOT = "/Users/dayyoung/Downloads/bible";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findOrOpenFlowTab() {
  const tabs = await new Promise((resolve) => {
    chrome.tabs.query({}, resolve);
  });

  const flowTab = tabs.find(t => t.url && t.url.includes("labs.google/fx/") && t.url.includes("/tools/flow/project/"));
  if (flowTab && typeof flowTab.id === "number") {
    await new Promise((resolve) => {
      chrome.tabs.update(flowTab.id, { active: true }, resolve);
    });
    return { tab: flowTab, created: false };
  }

  const createdTab = await new Promise((resolve) => {
    chrome.tabs.create({ url: FLOW_PROJECT_URL, active: true }, resolve);
  });
  await sleep(4000);
  return { tab: createdTab, created: true };
}

async function ensureFlowContentScriptInjected(tabId) {
  try {
    await new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, { action: "ping" }, (response) => {
        if (chrome.runtime.lastError || !response || response.status !== "pong") {
          reject(new Error("Not loaded"));
        } else {
          resolve();
        }
      });
    });
    return false; // Already injected
  } catch (e) {
    console.warn("[BG] Flow content script not loaded. Injecting programmatically...", e);
    await new Promise((resolve, reject) => {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content_flow.js"]
      }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
    await sleep(600);
    return true; // Newly injected
  }
}

// ==========================================
// [Chrome Debugger / Trusted Inputs]
// ==========================================

function debuggerAttach(target) {
  return new Promise((resolve, reject) => {
    chrome.debugger.attach(target, "1.3", () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

function debuggerDetach(target) {
  return new Promise(resolve => {
    chrome.debugger.detach(target, () => resolve());
  });
}

function debuggerSendCommand(target, method, params = {}) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(target, method, params, result => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(result);
    });
  });
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeFilenamePart(value) {
  return String(value || "").replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").trim();
}

function buildFallbackCharacterImagePaths(bookTitle, chapterNum, characterName) {
  const safeBookTitle = sanitizeFilenamePart(bookTitle);
  const safeChapterNum = sanitizeFilenamePart(chapterNum);
  const safeCharacterName = sanitizeFilenamePart(characterName);
  return ["jpeg", "jpg", "png", "webp"].map(ext => (
    `${FALLBACK_BIBLE_DOWNLOAD_ROOT}/${safeBookTitle}/Chapter_${safeChapterNum}/character_${safeCharacterName}.${ext}`
  ));
}

async function findDownloadedCharacterImage(bookTitle, chapterNum, characterName) {
  const safeBookTitle = sanitizeFilenamePart(bookTitle);
  const safeChapterNum = sanitizeFilenamePart(chapterNum);
  const safeCharacterName = sanitizeFilenamePart(characterName);
  const filenameRegex = [
    "[/\\\\]bible[/\\\\]",
    escapeRegex(safeBookTitle),
    "[/\\\\]Chapter_",
    escapeRegex(safeChapterNum),
    "[/\\\\]character_",
    escapeRegex(safeCharacterName),
    "\\.(?:png|jpe?g|webp)$"
  ].join("");

  const matches = await new Promise((resolve) => {
    chrome.downloads.search({
      filenameRegex,
      exists: true,
      state: "complete",
      limit: 20,
      orderBy: ["-startTime"]
    }, (items) => {
      if (chrome.runtime.lastError) {
        console.warn("[BG] Download search failed:", chrome.runtime.lastError.message);
        resolve([]);
        return;
      }
      resolve(items || []);
    });
  });

  const exactMatch = matches.find(item => {
    const normalized = String(item.filename || "").replace(/\\/g, "/");
    return normalized.endsWith(`/bible/${safeBookTitle}/Chapter_${safeChapterNum}/character_${safeCharacterName}.${(normalized.split(".").pop() || "")}`);
  });

  return (exactMatch || matches[0] || null)?.filename || null;
}

async function resolveDownloadedCharacterImages(bookTitle, chapterNum, characterNames) {
  const references = [];

  for (const name of characterNames || []) {
    const filePath = await findDownloadedCharacterImage(bookTitle, chapterNum, name);
    references.push({
      name,
      filePath,
      fallbackPaths: filePath ? [] : buildFallbackCharacterImagePaths(bookTitle, chapterNum, name)
    });
  }

  return references;
}

async function setFileInputFiles(tabId, files) {
  const target = { tabId };
  let attached = false;

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, "DOM.enable");
    const doc = await debuggerSendCommand(target, "DOM.getDocument", { pierce: true });
    const selectors = [
      "input[type='file'][accept*='image']",
      "input[type='file']"
    ];

    for (const selector of selectors) {
      const result = await debuggerSendCommand(target, "DOM.querySelector", {
        nodeId: doc.root.nodeId,
        selector
      });

      if (result.nodeId) {
        await debuggerSendCommand(target, "DOM.setFileInputFiles", {
          nodeId: result.nodeId,
          files
        });
        return;
      }
    }

    throw new Error("No file input found");
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

async function dispatchTrustedClick(tabId, x, y) {
  const target = { tabId };
  let attached = false;

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x,
      y
    });
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mousePressed",
      x,
      y,
      button: "left",
      buttons: 1,
      clickCount: 1
    });
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      buttons: 0,
      clickCount: 1
    });
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

async function insertTrustedText(tabId, text) {
  const target = { tabId };
  let attached = false;

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, "Input.insertText", { text });
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

async function replaceTrustedText(tabId, x, y, text) {
  const target = { tabId };
  let attached = false;

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x,
      y
    });
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mousePressed",
      x,
      y,
      button: "left",
      buttons: 1,
      clickCount: 1
    });
    await debuggerSendCommand(target, "Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      buttons: 0,
      clickCount: 1
    });

    await sleep(100);
    await debuggerSendCommand(target, "Input.insertText", { text });
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

// ==========================================
// [Message Router]
// ==========================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start_bible_pipeline") {
    (async () => {
      try {
        const data = await new Promise((resolve) => {
          chrome.storage.local.get([
            "bible_prompts",
            "generation_mode",
            "current_book",
            "current_chapter"
          ], resolve);
        });

        const { tab, created } = await findOrOpenFlowTab();
        
        if (!created) {
          // Tab was already open, ensure injection and check if it was newly injected
          const injected = await ensureFlowContentScriptInjected(tab.id);
          if (!injected) {
            // Script was already loaded, so flow_ready won't fire. Execute immediately.
            chrome.tabs.sendMessage(tab.id, {
              action: "execute_bible_flow_generation",
              prompts: data.bible_prompts,
              mode: data.generation_mode,
              bookTitle: data.current_book,
              chapterNum: data.current_chapter
            });
          } else {
            console.log("[BG] Content script newly injected. Waiting for flow_ready callback...");
          }
        } else {
          // Tab was created. The content script will load and trigger flow_ready,
          // so we don't send the message here.
          console.log("[BG] Created new Flow tab, waiting for flow_ready...");
        }
      } catch (err) {
        console.error("[BG] Failed to start pipeline", err);
      }
    })();
  } else if (request.action === "flow_ready") {
    console.log("[BG] Flow content script ready. Fetching prompts from storage...");
    chrome.storage.local.get([
      "bible_prompts",
      "generation_mode",
      "current_book",
      "current_chapter"
    ], (data) => {
      if (data.bible_prompts && data.bible_prompts.length && sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "execute_bible_flow_generation",
          prompts: data.bible_prompts,
          mode: data.generation_mode,
          bookTitle: data.current_book,
          chapterNum: data.current_chapter
        });
      }
    });
  } else if (request.action === "stop_bible_pipeline") {
    chrome.storage.local.set({
      active_state: "stopped",
      current_count: 0,
      total_count: 0,
      pipeline_status: "대기 중...",
      bible_prompts: [],
      generation_mode: null,
      current_book: null,
      current_chapter: null
    });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && tab.url.includes("labs.google")) {
          chrome.tabs.sendMessage(tab.id, { action: "abort_bible_flow" }).catch(() => null);
        }
      });
    });
  } else if (request.action === "download_bible_image") {
    (async () => {
      const { url, filename, characterName, dataUrl } = request;
      
      chrome.downloads.download({
        url,
        filename,
        conflictAction: "overwrite"
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error(`[BG] Download failed for ${filename}:`, chrome.runtime.lastError.message);
        } else {
          console.log(`[BG] Download started for ${filename}: id=${downloadId}`);
        }
      });

      if (characterName && dataUrl) {
        chrome.storage.local.get("character_images_cache", (storage) => {
          const cache = storage.character_images_cache || {};
          cache[characterName] = dataUrl;
          chrome.storage.local.set({ character_images_cache: cache });
        });
      }
    })();
  } else if (request.action === "resolve_downloaded_character_images") {
    resolveDownloadedCharacterImages(request.bookTitle, request.chapterNum, request.characterNames)
      .then(references => sendResponse({ ok: true, references }))
      .catch(err => {
        console.error("[BG] Failed to resolve downloaded character images", err);
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  } else if (request.action === "trusted_set_file_input_files") {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: "No sender tab for file input" });
      return;
    }
    setFileInputFiles(sender.tab.id, request.files || [])
      .then(() => sendResponse({ ok: true }))
      .catch(err => {
        console.error("[BG] Failed to set file input files", err);
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  } else if (request.action === "trusted_click") {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: "No sender tab for trusted click" });
      return;
    }
    dispatchTrustedClick(sender.tab.id, request.x, request.y)
      .then(() => sendResponse({ ok: true }))
      .catch(err => {
        console.error("[BG] Trusted click failed", err);
        chrome.storage.local.set({
          active_state: "stopped",
          pipeline_status: `에러: 디버거 클릭 실패 - ${err.message}`
        });
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  } else if (request.action === "trusted_insert_text") {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: "No sender tab for trusted text input" });
      return;
    }
    insertTrustedText(sender.tab.id, request.text || "")
      .then(() => sendResponse({ ok: true }))
      .catch(err => {
        console.error("[BG] Trusted text input failed", err);
        chrome.storage.local.set({
          active_state: "stopped",
          pipeline_status: `에러: 디버거 텍스트 입력 실패 - ${err.message}`
        });
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  } else if (request.action === "trusted_replace_text") {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: "No sender tab for trusted text replacement" });
      return;
    }
    replaceTrustedText(sender.tab.id, request.x, request.y, request.text || "")
      .then(() => sendResponse({ ok: true }))
      .catch(err => {
        console.error("[BG] Trusted text replacement failed", err);
        chrome.storage.local.set({
          active_state: "stopped",
          pipeline_status: `에러: 디버거 텍스트 변경 실패 - ${err.message}`
        });
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  }
  return true;
});
