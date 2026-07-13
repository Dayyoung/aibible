let isAborted = false;
let isPipelineActive = false;

const FAST_EDITOR_SETTLE_MS = 100;
const FAST_TEXT_SETTLE_MS = 200;
const RETRY_SUBMIT_SETTLE_MS = 800;
const IMAGE_COLLECT_TIMEOUT_MS = 45 * 1000;

function getElementByXpath(path) {
  try {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  } catch (e) {
    console.error("[Flow-CS] XPath error for path: " + path, e);
    return null;
  }
}

function killCookieBanner() {
  try {
    const badSelectors = [
      "iframe[title*='Consent']",
      "iframe[title*='consent']",
      "iframe[src*='consent']",
      "iframe[id*='google-fc']",
      "div[class*='consent']",
      "div[class*='fc-consent']",
      "#google-fc-consent-dialog",
      ".fc-consent-root"
    ];
    
    badSelectors.forEach(sel => {
      const nodes = document.querySelectorAll(sel);
      nodes.forEach(n => n.remove());
    });

    const agreeBtn = getElementByXpath("//button[contains(., '동의함')]") || 
                     getElementByXpath("//button[contains(., '나중에')]") ||
                     getElementByXpath("//button[contains(., 'Accept all')]") ||
                     getElementByXpath("//button[contains(., 'Accept')]");
    if (agreeBtn) {
      agreeBtn.click();
    }
  } catch (err) {
    console.error("[Flow-CS] Cookie banner bypass fail", err);
  }
}

function showOverlay(current, total, statusText = "이미지 생성 진행 중...") {
  let overlay = document.getElementById("aibible-flow-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "aibible-flow-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      width: 360px;
      padding: 16px 20px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(16px);
      font-family: 'Outfit', -apple-system, sans-serif;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.3s ease;
    `;

    const title = document.createElement("div");
    title.innerText = "AI BIBLE AUTO GENERATION";
    title.style.cssText = `
      font-size: 11px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 1.5px;
    `;
    overlay.appendChild(title);

    const desc = document.createElement("div");
    desc.id = "aibible-overlay-desc";
    desc.style.cssText = `
      font-size: 14px;
      font-weight: 600;
    `;
    overlay.appendChild(desc);

    const progressWrap = document.createElement("div");
    progressWrap.style.cssText = `
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #94a3b8;
    `;
    const progressLeft = document.createElement("span");
    progressLeft.id = "aibible-overlay-status-text";
    progressLeft.innerText = statusText;
    const progressRight = document.createElement("span");
    progressRight.id = "aibible-overlay-counter";
    progressRight.innerText = `${current} / ${total}`;
    
    progressWrap.appendChild(progressLeft);
    progressWrap.appendChild(progressRight);
    overlay.appendChild(progressWrap);

    const barContainer = document.createElement("div");
    barContainer.style.cssText = `
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 3px;
      overflow: hidden;
    `;
    const bar = document.createElement("div");
    bar.id = "aibible-overlay-bar";
    bar.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #38bdf8, #3b82f6);
      border-radius: 3px;
      transition: width 0.4s ease;
    `;
    barContainer.appendChild(bar);
    overlay.appendChild(barContainer);

    document.body.appendChild(overlay);
  }

  document.getElementById("aibible-overlay-desc").innerText = statusText;
  document.getElementById("aibible-overlay-status-text").innerText = "진행률";
  document.getElementById("aibible-overlay-counter").innerText = `${current} / ${total}`;
  document.getElementById("aibible-overlay-bar").style.width = `${total > 0 ? (current / total) * 100 : 0}%`;
}

function removeOverlay() {
  const overlay = document.getElementById("aibible-flow-overlay");
  if (overlay) overlay.remove();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

function isVisibleElement(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getButtonText(button) {
  return [
    button.getAttribute("aria-label"),
    button.getAttribute("title"),
    button.textContent
  ].filter(Boolean).join(" ").trim();
}

function getActiveArrowSubmitButton() {
  const allButtons = Array.from(document.querySelectorAll("button"));
  return allButtons.find(btn => {
    const buttonText = getButtonText(btn);
    const iconText = Array.from(btn.querySelectorAll("i"))
      .map(icon => icon.textContent || "")
      .join(" ");
    const isSubmitButton = buttonText.includes("만들기") || iconText.includes("arrow_forward");
    const isAddButton = iconText.includes("add_2") || buttonText.includes("프롬프트에 추가");
    const isActive = btn.getAttribute("aria-disabled") !== "true" && !btn.disabled;

    return isSubmitButton && !isAddButton && isActive && isVisibleElement(btn);
  });
}

function dispatchMouseLikeEvent(target, type, x, y) {
  const eventOptions = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: x,
    clientY: y,
    screenX: window.screenX + x,
    screenY: window.screenY + y,
    button: 0,
    buttons: type.endsWith("down") ? 1 : 0
  };

  if (window.PointerEvent && type.startsWith("pointer")) {
    target.dispatchEvent(new PointerEvent(type, {
      ...eventOptions,
      pointerId: 1,
      pointerType: "mouse",
      isPrimary: true
    }));
    return;
  }

  target.dispatchEvent(new MouseEvent(type.replace("pointer", "mouse"), eventOptions));
}

async function clickLikeUser(el) {
  if (!el) return false;
  el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  await sleep(100);

  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  try {
    el.focus({ preventScroll: true });
  } catch (err) {
    el.focus();
  }

  [
    "pointerover", "mouseover", "pointerenter", "mouseenter", "pointermove",
    "mousemove", "pointerdown", "mousedown", "pointerup", "mouseup", "click"
  ].forEach(type => dispatchMouseLikeEvent(el, type, x, y));

  el.click();
  return true;
}

function sendRuntimeMessage(message) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }
      resolve(response || { ok: true });
    });
  });
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function clickWithTrustedInput(el) {
  if (!el) return { ok: false, error: "No element to click" };
  el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  await sleep(100);

  const rect = el.getBoundingClientRect();
  const x = Math.round(rect.left + rect.width / 2);
  const y = Math.round(rect.top + rect.height / 2);

  return sendRuntimeMessage({
    action: "trusted_click",
    x,
    y
  });
}

function selectElementContents(el) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(el);
  selection.removeAllRanges();
  selection.addRange(range);
}

function collapseSelectionToEnd(el) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function hasPromptRequiredToast() {
  const toasts = Array.from(document.querySelectorAll("[data-sonner-toast], [role='status'], [role='alert']"));
  return toasts.some(toast => (toast.textContent || "").includes("프롬프트를 입력해야 합니다"));
}

async function submitPromptButton(submitBtn) {
  if (!submitBtn) return false;
  if (submitBtn.getAttribute("aria-disabled") === "true" || submitBtn.disabled) return false;

  const trustedResult = await clickWithTrustedInput(submitBtn);
  if (trustedResult.ok) {
    console.log("[Flow-CS] Submit button clicked via trusted input.");
    return true;
  }

  console.warn("[Flow-CS] Trusted submit click failed. Falling back to content click:", trustedResult.error);
  await clickLikeUser(submitBtn);
  submitBtn.click();
  console.log("[Flow-CS] Submit button clicked via content fallback.");
  return true;
}

async function waitForSubmitEffect(submitBtn, editor, timeoutMs = 2500) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (hasPromptRequiredToast()) return false;

    const activeBtn = getActiveArrowSubmitButton();
    const editorText = (editor.innerText || editor.textContent || "").trim();
    const buttonBecameInactive = !submitBtn.isConnected ||
      submitBtn.disabled ||
      submitBtn.getAttribute("aria-disabled") === "true" ||
      activeBtn !== submitBtn;

    if (buttonBecameInactive || editorText.length < 10) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function dismissPromptRequiredToasts() {
  const toasts = Array.from(document.querySelectorAll("[data-sonner-toast], [role='status'], [role='alert']"));
  for (const toast of toasts) {
    if (!(toast.textContent || "").includes("프롬프트를 입력해야 합니다")) continue;

    const closeButton = Array.from(toast.querySelectorAll("button"))
      .find(button => (button.textContent || "").includes("닫기"));

    if (closeButton) {
      await clickLikeUser(closeButton);
    } else {
      toast.remove();
    }
  }
}

async function focusPromptEditorAtEnd(editor) {
  editor.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  await sleep(FAST_EDITOR_SETTLE_MS);
  editor.focus({ preventScroll: true });
  collapseSelectionToEnd(editor);
  document.dispatchEvent(new Event("selectionchange", { bubbles: true }));
  await sleep(FAST_EDITOR_SETTLE_MS);
}

async function insertPromptText(editor, text) {
  await focusPromptEditorAtEnd(editor);
  const trustedResult = await sendRuntimeMessage({
    action: "trusted_insert_text",
    text
  });

  if (trustedResult.ok) {
    console.log("[Flow-CS] Text inserted via focused trusted keyboard input.");
  } else {
    console.warn("[Flow-CS] Trusted text insertion failed. Falling back to execCommand:", trustedResult.error);
    await focusPromptEditorAtEnd(editor);

    try {
      document.execCommand("insertText", false, text);
      editor.dispatchEvent(new Event("input", { bubbles: true }));
      console.log("[Flow-CS] Text inserted via standard execCommand insertText.");
    } catch (err) {
      console.warn("[Flow-CS] execCommand insertText failed:", err);
    }
  }

  await sleep(1000);
  return (editor.innerText || editor.textContent || "").trim().length > 0;
}

async function nudgePromptRecognition(editor, text) {
  const currentText = (editor.innerText || editor.textContent || "").trim();
  const preview = text.slice(0, 40);

  if (!currentText.includes(preview)) {
    return insertPromptText(editor, text);
  }

  await focusPromptEditorAtEnd(editor);
  const trustedResult = await sendRuntimeMessage({
    action: "trusted_insert_text",
    text: " "
  });

  if (!trustedResult.ok) {
    console.warn("[Flow-CS] Prompt recognition nudge failed:", trustedResult.error);
  }

  await sleep(1000);
  return true;
}

function dispatchInputEvent(el, inputType, data = null) {
  try {
    el.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      cancelable: false,
      composed: true,
      inputType,
      data
    }));
  } catch (err) {
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

function dispatchPasteEvent(el, text) {
  let pasteEvent;
  try {
    const clipboardData = new DataTransfer();
    clipboardData.setData("text/plain", text);
    pasteEvent = new ClipboardEvent("paste", {
      bubbles: true,
      cancelable: true,
      composed: true,
      clipboardData
    });
  } catch (err) {
    pasteEvent = new Event("paste", {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    Object.defineProperty(pasteEvent, "clipboardData", {
      value: {
        getData: type => type === "text/plain" ? text : ""
      }
    });
  }
  el.dispatchEvent(pasteEvent);
}

async function clearPromptEditor(editor) {
  editor.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  await sleep(FAST_EDITOR_SETTLE_MS);
  editor.click();
  editor.focus();
  await sleep(FAST_EDITOR_SETTLE_MS);

  selectElementContents(editor);
  document.execCommand("delete", false, null);
  dispatchInputEvent(editor, "deleteContentBackward");
  collapseSelectionToEnd(editor);
  await sleep(FAST_TEXT_SETTLE_MS);
}

function getValidImageUrls() {
  const allImgs = Array.from(document.querySelectorAll("img[src*='getMediaUrlRedirect'], img[src*='media'], img[src*='googleusercontent']"));
  const valid = [];
  for (const img of allImgs) {
    if (img.closest("div[contenteditable='true'], [role='listbox'], [role='dialog'], #aibible-flow-overlay")) continue;
    const src = img.currentSrc || img.src || img.getAttribute("src");
    if (!src || src.includes("/a/") || src.includes("=s96-c") || src.includes("avatar")) continue;
    const rect = img.getBoundingClientRect();
    if (rect.width >= 200 && rect.height >= 200) {
      valid.push(src);
    }
  }
  return valid;
}

function isGenerationRunning() {
  // 1. Check for any visible loading indicators, spinners, skeletons or progress bars
  const loaderSelectors = [
    "[class*='loading']",
    "[class*='spinner']",
    "[class*='progress']",
    "[class*='skeleton']",
    "[class*='generating']",
    "[data-testid*='loading']",
    "[data-type*='loading']",
    "svg[class*='spinner']",
    ".loading-indicator",
    ".loading-spinner",
    "div[class*='Shimmer']",
    "div[class*='shimmer']"
  ];
  
  for (const selector of loaderSelectors) {
    const els = document.querySelectorAll(selector);
    for (const el of els) {
      if (el.closest("#aibible-flow-overlay")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return true;
      }
    }
  }
  
  // 2. Check if the submit button is disabled (during generation it becomes disabled or missing)
  const allButtons = Array.from(document.querySelectorAll("button"));
  const submitBtn = allButtons.find(btn => {
    const buttonText = getButtonText(btn);
    const iconText = Array.from(btn.querySelectorAll("i")).map(icon => icon.textContent || "").join(" ");
    return (buttonText.includes("만들기") || iconText.includes("arrow_forward")) && !iconText.includes("add_2") && !buttonText.includes("프롬프트에 추가");
  });
  
  if (submitBtn) {
    const isDisabled = submitBtn.disabled || submitBtn.getAttribute("aria-disabled") === "true";
    if (isDisabled) {
      return true;
    }
  } else {
    // If submit button is not found at all, it might be mid-generation reloading
    return true;
  }
  
  return false;
}

// Attach uploaded asset from Gallery
async function addAsset(imgName) {
  try {
    let uploadBtn = getElementByXpath("//button[.//i[contains(text(), 'add_2')]]") || 
                    document.querySelector("button[class*='add']");
    if (!uploadBtn) return false;
    await clickLikeUser(uploadBtn);
    await sleep(1200);

    const searchInput = document.querySelector("input#add-menu-input") || 
                        document.querySelector("input[placeholder*='검색']");
    if (!searchInput) return false;
    searchInput.focus();
    searchInput.value = "";
    document.execCommand('insertText', false, imgName);
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(1500);

    const assetItem = getElementByXpath(`//div[@role='option'][contains(., '${imgName}')]`) ||
                      getElementByXpath(`//div[contains(@class, 'option')][contains(., '${imgName}')]`);
    if (!assetItem) {
      console.warn("[Flow-CS] Asset not found in list:", imgName);
      document.body.click();
      return false;
    }
    assetItem.click();
    await sleep(1000);

    const addBtn = getElementByXpath("//button[contains(., '프롬프트에 추가')]") ||
                   getElementByXpath("//button[contains(., '추가')]") ||
                   document.querySelector("button[class*='gecFQL']");
    if (addBtn) {
      await clickLikeUser(addBtn);
      await sleep(1000);
      console.log("[Flow-CS] Reference character image attached:", imgName);
      return true;
    }
  } catch (err) {
    console.error("[Flow-CS] addAsset failed:", err);
  }
  return false;
}

async function openMediaUploadFileInput() {
  const uploadBtn = getElementByXpath("//button[contains(., '미디어 업로드')]") || 
                    document.querySelector("button[class*='hqrnuD']") ||
                    getElementByXpath("//button[.//i[contains(text(), 'upload')]]");
                    
  if (!uploadBtn) {
    console.warn("[Flow-CS] Media Upload button not found.");
    return null;
  }

  // Intercept click on hidden file input to prevent native file picker dialog from opening
  const preventDialog = (e) => {
    if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'file') {
      console.log("[Flow-CS] Intercepted native file picker click");
      e.preventDefault();
      e.stopPropagation();
    }
  };
  window.addEventListener('click', preventDialog, true);

  await clickLikeUser(uploadBtn);
  
  let fileInput = null;
  for (let i = 0; i < 15; i++) {
    fileInput = document.querySelector("input[type='file'][accept*='image']") || 
                document.querySelector("input[type='file']");
    if (fileInput) break;
    await sleep(200);
  }

  window.removeEventListener('click', preventDialog, true);

  if (!fileInput) {
    console.warn("[Flow-CS] Hidden file input element not found after clicking upload button.");
  }

  return fileInput;
}

async function uploadLocalReferenceImages(localChars) {
  if (!localChars.length) return true;

  const fileInput = await openMediaUploadFileInput();
  if (!fileInput) return false;

  const pathLists = localChars.map(char => {
    if (char.filePath) return [char.filePath];
    return Array.isArray(char.fallbackPaths) ? char.fallbackPaths : [];
  });
  const candidateFileSets = [[]];

  for (const paths of pathLists) {
    const nextSets = [];
    for (const existingSet of candidateFileSets) {
      for (const path of paths) {
        if (nextSets.length >= 32) break;
        nextSets.push([...existingSet, path]);
      }
    }
    candidateFileSets.splice(0, candidateFileSets.length, ...nextSets);
  }

  for (const files of candidateFileSets) {
    const setFilesResult = await sendRuntimeMessage({
      action: "trusted_set_file_input_files",
      files
    });

    if (!setFilesResult.ok) {
      console.warn("[Flow-CS] Local file input injection failed:", setFilesResult.error, files);
      continue;
    }

    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    fileInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("[Flow-CS] Local uploads dispatched for files:", files);

    await sleep(4000);
    return true;
  }

  return false;
}

async function uploadCachedReferenceImages(cachedChars) {
  if (!cachedChars.length) return true;

  const fileInput = await openMediaUploadFileInput();
  if (!fileInput) return false;

  const dataTransfer = new DataTransfer();
  
  for (const char of cachedChars) {
    const response = await fetch(char.dataUrl);
    const blob = await response.blob();
    const filename = `character_${char.name}.png`;
    const file = new File([blob], filename, { type: blob.type || "image/png" });
    dataTransfer.items.add(file);
  }

  fileInput.files = dataTransfer.files;
  fileInput.dispatchEvent(new Event('change', { bubbles: true }));
  fileInput.dispatchEvent(new Event('input', { bubbles: true }));
  console.log("[Flow-CS] Cached uploads dispatched for files:", cachedChars.map(c => `character_${c.name}.png`));
  
  await sleep(4000);
  return true;
}

// Programmatic File Upload for multiple character references
async function uploadReferenceImages(matchedChars) {
  try {
    const localChars = matchedChars.filter(char => char.filePath || (Array.isArray(char.fallbackPaths) && char.fallbackPaths.length));
    const cachedChars = matchedChars.filter(char => char.dataUrl && !char.filePath);
    const localOk = await uploadLocalReferenceImages(localChars);
    const cachedOk = await uploadCachedReferenceImages(cachedChars);

    return localOk && cachedOk;
  } catch (err) {
    console.error("[Flow-CS] uploadReferenceImages failed:", err);
  }
  return false;
}

async function resolveDownloadedCharacterReferences(promptItem) {
  const characterNames = Array.isArray(promptItem.characterNames) ? promptItem.characterNames : [];
  if (!characterNames.length) return [];

  const response = await sendRuntimeMessage({
    action: "resolve_downloaded_character_images",
    bookTitle: promptItem.bookTitle,
    chapterNum: promptItem.chapterNum,
    characterNames
  });

  if (!response.ok) {
    console.warn("[Flow-CS] Downloaded character lookup failed:", response.error);
    return [];
  }

  return Array.isArray(response.references) ? response.references : [];
}

async function convertUrlToBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error("Base64 conversion failed", e);
    return null;
  }
}

// Main execution message router
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ping") {
    sendResponse({ ok: true, status: "pong" });
  } else if (request.action === "execute_bible_flow_generation") {
    if (isPipelineActive) {
      console.warn("[Flow-CS] Pipeline is already active. Ignoring duplicate execution request.");
      sendResponse({ ok: false, error: "Pipeline already active" });
      return;
    }
    isPipelineActive = true;
    sendResponse({ ok: true });
    
    (async () => {
      try {
        isAborted = false;
        const { prompts, mode, bookTitle, chapterNum } = request;
        const totalCount = prompts.length;

      showOverlay(0, totalCount, "생성 파이프라인 시작 대기 중...");
      
      const uploadedCharacters = new Set();
      
      // If we are in screen mode, fetch character images cache
      const storage = await new Promise(r => chrome.storage.local.get("character_images_cache", r));
      const charCache = storage.character_images_cache || {};

      for (let index = 0; index < totalCount; index++) {
        if (isAborted) break;

        const promptItem = prompts[index];
        const sceneNum = index + 1;
        const currentLabel = mode === "character" ? `인물 [${promptItem.characterName}]` : `구절 [${promptItem.verseNumber}]`;
        
        // 0. Check if image already exists in local downloads
        const checkFilename = mode === "character" 
          ? `bible/${bookTitle}/Chapter_${chapterNum}/${promptItem.characterName}.jpg`
          : `bible/${bookTitle}/Chapter_${chapterNum}/${promptItem.verseNumber}.jpg`;

        const checkResponse = await sendRuntimeMessage({
          action: "check_file_exists",
          filename: checkFilename
        });

        if (checkResponse && checkResponse.ok && checkResponse.exists) {
          console.log(`[Flow-CS] Image already exists: ${checkFilename}. Skipping generation.`);
          showOverlay(index + 1, totalCount, `${currentLabel} 이미 존재함. 건너뜀.`);
          chrome.storage.local.set({
            current_count: index + 1,
            pipeline_status: `${currentLabel} 이미 존재하여 건너뜀`
          });
          await sleep(300);
          continue;
        }

        showOverlay(index, totalCount, `${currentLabel} 대기 중...`);
        chrome.storage.local.set({
          current_count: index,
          pipeline_status: `${currentLabel} 생성 처리 중...`
        });

        // 1. Editor Check & Cookie banner clean
        for (let w = 0; w < 15; w++) {
          killCookieBanner();
          if (document.querySelector("div[contenteditable='true']")) break;
          await sleep(200);
        }

        const editor = document.querySelector("div[contenteditable='true']");
        if (!editor) {
          console.error("Editor not found!");
          continue;
        }

        await clearPromptEditor(editor);

        // 2. Write prompt text using trusted input first
        const promptInserted = await insertPromptText(editor, promptItem.imagePrompt);
        await sleep(FAST_TEXT_SETTLE_MS);

        // 3. Reference characters attachment logic (Screen Mode only) - disabled to use text prompts
        if (false && mode === "screen") {
          const verseText = promptItem.verseText;
          const matchedChars = [];
          const matchedNames = new Set();
          
          showOverlay(index, totalCount, `인물 매칭 분석 중...`);
          console.log("[Flow-CS] Checking matches for verseText:", verseText);
          console.log("[Flow-CS] Screen character names:", promptItem.characterNames || []);
          console.log("[Flow-CS] Available cached characters:", Object.keys(charCache));

          const downloadedReferences = await resolveDownloadedCharacterReferences(promptItem);
          for (const reference of downloadedReferences) {
            if (!reference.filePath && (!Array.isArray(reference.fallbackPaths) || !reference.fallbackPaths.length)) {
              continue;
            }
            matchedChars.push({
              name: reference.name,
              filePath: reference.filePath,
              fallbackPaths: reference.fallbackPaths
            });
            matchedNames.add(String(reference.name).toLowerCase());
          }
          
          for (const charName of Object.keys(charCache)) {
            const cleanCharName = charName.replace(/^character_/i, "").trim();
            const regex = new RegExp(`\\b${escapeRegExp(cleanCharName)}\\b`, "i");
            const isMatch = regex.test(verseText);
            console.log(`[Flow-CS] Match check: '${cleanCharName}' ->`, isMatch);
            if (isMatch && !matchedNames.has(cleanCharName.toLowerCase())) {
              matchedChars.push({ name: cleanCharName, dataUrl: charCache[charName] });
              matchedNames.add(cleanCharName.toLowerCase());
            }
          }

          if (matchedChars.length > 0) {
            const matchedNameLabel = matchedChars.map(c => c.name).join(", ");
            showOverlay(index, totalCount, `인물 감지됨: [${matchedNameLabel}]. 이미지 업로드 중...`);
            
            const uploadOk = await uploadReferenceImages(matchedChars);
            if (uploadOk) {
              showOverlay(index, totalCount, `인물 [${matchedNameLabel}] 이미지 첨부 완료!`);
            } else {
              showOverlay(index, totalCount, `인물 [${matchedNameLabel}] 이미지 첨부 실패! (인풋 탐색 오류)`);
            }
            await sleep(1200);
          } else {
            showOverlay(index, totalCount, `감지된 인물 없음. 이미지 첨부 건너뜀.`);
            await sleep(800);
          }
        }

        // 4. Capture current page image URLs before click
        const beforeUrls = new Set(getValidImageUrls());

        // 5. Detect and click submit button using trusted click & validation retries
        let submitBtn = getActiveArrowSubmitButton();
        const startBtnWait = Date.now();

        while (Date.now() - startBtnWait < 6000) {
          if (isAborted) return;
          killCookieBanner();
          submitBtn = getActiveArrowSubmitButton();
          if (submitBtn) break;
          await sleep(50);
        }

        if (!submitBtn && promptInserted) {
          console.warn("[Flow-CS] Submit button still disabled. Nudging prompt recognition once...");
          await nudgePromptRecognition(editor, promptItem.imagePrompt);
          const retryBtnWait = Date.now();

          while (Date.now() - retryBtnWait < 6000) {
            if (isAborted) return;
            killCookieBanner();
            submitBtn = getActiveArrowSubmitButton();
            if (submitBtn) break;
            await sleep(50);
          }
        }

        if (!submitBtn) {
          console.error("Submit button still disabled.");
          continue;
        }

        await dismissPromptRequiredToasts();

        // 6. Click submit button and check for active state response
        const submitClicked = await submitPromptButton(submitBtn);
        let isSubmitted = submitClicked && await waitForSubmitEffect(submitBtn, editor, RETRY_SUBMIT_SETTLE_MS);

        // Retries if click wasn't accepted
        for (let retry = 0; !isSubmitted && retry < 2; retry++) {
          submitBtn = getActiveArrowSubmitButton() || submitBtn;
          if (!submitBtn) break;

          console.warn(`[Flow-CS] Submit click was not reflected. Nudging prompt and retrying submit (${retry + 1}/2)...`);
          await nudgePromptRecognition(editor, promptItem.imagePrompt);
          await dismissPromptRequiredToasts();

          const retryClicked = await submitPromptButton(submitBtn);
          isSubmitted = retryClicked && await waitForSubmitEffect(submitBtn, editor, RETRY_SUBMIT_SETTLE_MS);
        }

        if (!isSubmitted) {
          console.error("Submit validation failed.");
          continue;
        }

        // 7. Monitor generation and collect new image url (Batch size = 1)
        showOverlay(index, totalCount, `${currentLabel} 생성 대기 중...`);
        const startCollect = Date.now();
        let targetUrl = null;
        let generationStarted = false;

        // Wait up to 5 seconds for generation to start (loading state to become true)
        for (let i = 0; i < 15; i++) {
          if (isAborted) return;
          if (isGenerationRunning()) {
            generationStarted = true;
            console.log("[Flow-CS] Generation start detected (loading/disabled submit button).");
            break;
          }
          await sleep(200);
        }

        // Wait for generation to complete (loading state to become false)
        const timeout = IMAGE_COLLECT_TIMEOUT_MS; // 45000ms
        while (Date.now() - startCollect < timeout) {
          if (isAborted) return;
          killCookieBanner();

          // A. Keep checking if a new image URL appeared in the DOM
          const currentUrls = getValidImageUrls();
          const newUrl = currentUrls.find(url => !beforeUrls.has(url));
          if (newUrl) {
            targetUrl = newUrl;
            console.log("[Flow-CS] Detected new image URL during generation:", newUrl);
            break; // 이미지가 감지되면 즉시 대기를 종료하고 루프를 탈출합니다.
          }

          // B. Check if the loading screen is still active
          const isLoading = isGenerationRunning();
          if (generationStarted && !isLoading) {
            console.log("[Flow-CS] Generation complete (loading screen disappeared).");
            break;
          } else if (!generationStarted && isLoading) {
            generationStarted = true;
          }

          await sleep(500); // 체크 주기를 1초에서 0.5초로 줄여 반응 속도를 높입니다.
        }

        // Settle delay after generation completes to let image render fully
        // 이미지가 감지되었거나 루프가 완료되었으므로 대기 시간을 2.5초에서 0.8초로 단축합니다.
        await sleep(800);

        // Fallback: If targetUrl was not set by URL comparison, get the first visible image on the page
        if (!targetUrl) {
          const currentUrls = getValidImageUrls();
          if (currentUrls.length > 0) {
            targetUrl = currentUrls[0];
            console.log("[Flow-CS] Fallback to first visible image on page:", targetUrl);
          }
        }

        if (!targetUrl) {
          console.error("Image generation timeout for:", currentLabel);
          continue;
        }

        // 8. Download image and cache if character mode
        showOverlay(index, totalCount, `${currentLabel} 다운로드 중...`);
        let filename = "";
        let dataUrl = "";
        
        if (mode === "character") {
          filename = `bible/${bookTitle}/Chapter_${chapterNum}/${promptItem.characterName}.jpg`;
          dataUrl = await convertUrlToBase64(targetUrl);
        } else {
          filename = `bible/${bookTitle}/Chapter_${chapterNum}/${promptItem.verseNumber}.jpg`;
        }

        chrome.runtime.sendMessage({
          action: "download_bible_image",
          url: targetUrl,
          filename,
          characterName: mode === "character" ? promptItem.characterName : null,
          dataUrl
        });

        await sleep(1500);
      }

      if (!isAborted) {
        showOverlay(totalCount, totalCount, "생성 완료! 다음 장 이동 준비 중...");
        chrome.runtime.sendMessage({
          action: "bible_chapter_completed",
          bookTitle: bookTitle,
          chapterNum: chapterNum
        });
      } else {
        showOverlay(totalCount, totalCount, "생성 중단되었습니다.");
        chrome.storage.local.set({
          active_state: "stopped",
          current_count: totalCount,
          pipeline_status: "작업 중단"
        });
      }
      await sleep(2000);
      removeOverlay();
      } finally {
        isPipelineActive = false;
      }
    })();
  } else if (request.action === "abort_bible_flow") {
    isAborted = true;
    isPipelineActive = false;
    removeOverlay();
    console.log("[Flow-CS] Bible image generation aborted.");
  }
  return true;
});

// Periodic page check loop to handle freshly loaded tabs
const initCheck = setInterval(() => {
  const editor = document.querySelector("div[contenteditable='true']");
  if (editor) {
    clearInterval(initCheck);
    killCookieBanner();
    chrome.storage.local.get("active_state", (data) => {
      if (data.active_state === "running") {
        chrome.runtime.sendMessage({ action: "flow_ready" });
      }
    });
  }
}, 1500);
