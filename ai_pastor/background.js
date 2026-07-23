// AI Minister Background Service Worker

let sermonDownloadWatch = null;

function saveSermonDownloadWatch(watch) {
  sermonDownloadWatch = watch;
  chrome.storage.local.set({ ai_pastor_download_watch: watch });
}

function clearSermonDownloadWatch() {
  sermonDownloadWatch = null;
  chrome.storage.local.remove('ai_pastor_download_watch');
}

function getSermonDownloadWatch(callback) {
  if (sermonDownloadWatch) {
    callback(sermonDownloadWatch);
    return;
  }

  chrome.storage.local.get(['ai_pastor_download_watch'], (result) => {
    sermonDownloadWatch = result.ai_pastor_download_watch || null;
    callback(sermonDownloadWatch);
  });
}

// 1. Popup 등에서 전달되는 메시지 리스너
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'START_AUTOMATION') {
    startOrFocusGoogleVidsTab();
  } else if (message.action === 'PAUSE_AUTOMATION') {
    // 상태는 popup.js에서 이미 chrome.storage.local에 저장함
    console.log('Automation Paused.');
  } else if (message.action === 'RESET_AUTOMATION') {
    console.log('Automation Reset.');
  } else if (message.action === 'trusted_insert_text') {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: 'No sender tab for trusted text input' });
      return false;
    }

    insertTrustedText(sender.tab.id, message.text || '')
      .then(() => sendResponse({ ok: true }))
      .catch((err) => {
        console.error('[AI Minister] Trusted text input failed:', err);
        sendResponse({ ok: false, error: err.message });
      });
    return true;
	  } else if (message.action === 'trusted_click') {
    if (!sender.tab || !sender.tab.id) {
      sendResponse({ ok: false, error: 'No sender tab for trusted click' });
      return false;
    }

    clickTrustedPoint(sender.tab.id, message.x, message.y)
      .then(() => sendResponse({ ok: true }))
      .catch((err) => {
        console.error('[AI Pastor] Trusted click failed:', err);
        sendResponse({ ok: false, error: err.message });
      });
	    return true;
	  } else if (message.action === 'watch_sermon_download') {
	    saveSermonDownloadWatch({
	      book: message.book || '',
	      chapter: message.chapter || 1,
	      downloadId: null,
	      startedAt: Date.now()
	    });
	    console.log('[AI Pastor] Watching next sermon download:', sermonDownloadWatch);
	    sendResponse({ ok: true });
	    return false;
	  } else if (message.action === 'clear_sermon_download_watch') {
	    clearSermonDownloadWatch();
	    sendResponse({ ok: true });
	    return false;
	  }
	});

if (chrome.downloads && chrome.downloads.onCreated) {
  chrome.downloads.onCreated.addListener((downloadItem) => {
    getSermonDownloadWatch((watch) => {
      if (!watch || watch.downloadId) return;

      const fileName = downloadItem.filename || '';
      const url = `${downloadItem.url || ''} ${downloadItem.finalUrl || ''}`.toLowerCase();
      const mime = (downloadItem.mime || '').toLowerCase();
      const looksLikeVideo = /\.mp4(?:$|\?)/i.test(fileName) ||
        mime.includes('video') ||
        url.includes('notebooklm.google.com');

      if (!looksLikeVideo) return;

      watch.downloadId = downloadItem.id;
      watch.fileName = fileName;
      saveSermonDownloadWatch(watch);
      console.log('[AI Pastor] Sermon download detected:', downloadItem.id, fileName || downloadItem.url);
    });
  });
}

if (chrome.downloads && chrome.downloads.onChanged) {
  chrome.downloads.onChanged.addListener((delta) => {
    getSermonDownloadWatch((watch) => {
      if (!watch || watch.downloadId !== delta.id || !delta.state) return;

      if (delta.state.current === 'complete') {
        completeSermonDownloadWatch(delta.id);
      } else if (delta.state.current === 'interrupted') {
        failSermonDownloadWatch('다운로드가 중단되었습니다.');
      }
    });
  });
}

function completeSermonDownloadWatch(downloadId) {
  const watch = sermonDownloadWatch;
  clearSermonDownloadWatch();

  chrome.downloads.search({ id: downloadId }, (items) => {
    const item = items && items[0];
    chrome.storage.local.get(['ai_pastor_sermon_state'], (result) => {
      const state = result.ai_pastor_sermon_state;
      if (!state || state.status !== 'running') return;
      if (state.book !== watch.book || Number(state.chapter) !== Number(watch.chapter)) return;

      state.step = 'download_completed';
      state.downloadedFileName = item ? item.filename : watch.fileName;
      state.downloadCompletedAt = Date.now();
      chrome.storage.local.set({ ai_pastor_sermon_state: state });
      console.log('[AI Pastor] Sermon download completed:', state.downloadedFileName || downloadId);
    });
  });
}

function failSermonDownloadWatch(error) {
  const watch = sermonDownloadWatch;
  clearSermonDownloadWatch();

  chrome.storage.local.get(['ai_pastor_sermon_state'], (result) => {
    const state = result.ai_pastor_sermon_state;
    if (!state || state.status !== 'running') return;
    if (state.book !== watch.book || Number(state.chapter) !== Number(watch.chapter)) return;

    state.status = 'failed';
    state.step = 'failed';
    state.error = error;
    chrome.storage.local.set({ ai_pastor_sermon_state: state });
  });
}

function debuggerAttach(target) {
  return new Promise((resolve, reject) => {
    chrome.debugger.attach(target, '1.3', () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve();
    });
  });
}

function debuggerDetach(target) {
  return new Promise((resolve) => {
    chrome.debugger.detach(target, () => resolve());
  });
}

function debuggerSendCommand(target, method, params = {}) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(target, method, params, (result) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(result);
    });
  });
}

async function insertTrustedText(tabId, text) {
  const target = { tabId };
  let attached = false;

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, 'Input.insertText', { text });
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

async function clickTrustedPoint(tabId, x, y) {
  const target = { tabId };
  let attached = false;
  const clickX = Number(x);
  const clickY = Number(y);

  if (!Number.isFinite(clickX) || !Number.isFinite(clickY)) {
    throw new Error('Invalid click coordinates');
  }

  await debuggerAttach(target);
  attached = true;

  try {
    await debuggerSendCommand(target, 'Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: clickX,
      y: clickY,
      button: 'none'
    });
    await debuggerSendCommand(target, 'Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: clickX,
      y: clickY,
      button: 'left',
      buttons: 1,
      clickCount: 1
    });
    await debuggerSendCommand(target, 'Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: clickX,
      y: clickY,
      button: 'left',
      buttons: 0,
      clickCount: 1
    });
  } finally {
    if (attached) {
      await debuggerDetach(target);
    }
  }
}

// 2. 구글 비디오 홈화면 탭을 열거나 활성화하는 헬퍼 함수
function startOrFocusGoogleVidsTab() {
  const targetUrl = 'https://docs.google.com/videos/u/0/';

  // 이미 열려있는 구글 비디오 탭이 있는지 조회
  chrome.tabs.query({}, (tabs) => {
    // 1) 완전히 일치하는 URL 또는 유사 URL이 있는지 검색
    const vidsTab = tabs.find(tab => tab.url && (tab.url.startsWith('https://docs.google.com/videos/') || tab.url.includes('docs.google.com/presentation/d/')));

    if (vidsTab) {
      // 이미 열려 있다면 활성화 및 포커스
      chrome.tabs.update(vidsTab.id, { active: true }, (tab) => {
        // window도 포커스해줌
        chrome.windows.update(tab.windowId, { focused: true });
        
        // 탭 상태 기록
        chrome.storage.local.get(['ai_minister_state'], (result) => {
          if (result.ai_minister_state) {
            const state = result.ai_minister_state;
            state.tabId = tab.id;
            chrome.storage.local.set({ ai_minister_state: state });
          }
        });
      });
    } else {
      // 열려 있는 탭이 없다면 새로 열기
      chrome.tabs.create({ url: targetUrl }, (tab) => {
        chrome.storage.local.get(['ai_minister_state'], (result) => {
          if (result.ai_minister_state) {
            const state = result.ai_minister_state;
            state.tabId = tab.id;
            chrome.storage.local.set({ ai_minister_state: state });
          }
        });
      });
    }
  });
}
