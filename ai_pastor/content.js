// AI Minister Content Script - Google Vids Automation (Blank Video ➡️ Avatar setup ➡️ Script Loop)

let automationInterval = null;
let lastStepLog = ''; // 디버깅 로그 도배 방지용

console.log('[AI Minister] Content script loaded and active.');

// 자동화 루프 시작
function startAutomationLoop() {
  if (automationInterval) clearInterval(automationInterval);
  automationInterval = setInterval(checkAndExecute, 2000); // 2초 주기 체크
  console.log('[AI Minister] Automation loop started.');
}

// 스크립트 로드 시 즉시 루프 시작
startAutomationLoop();

// 텍스트 매칭으로 요소 찾기 헬퍼 함수 (완전 일치 우선 ➡️ 부분 일치 백업)
function findElementByText(selector, text) {
  const elements = document.querySelectorAll(selector);
  
  // 1순위: 완전 일치
  for (const el of elements) {
    if (el.textContent.trim() === text) {
      return el;
    }
  }
  
  // 2순위: 부분 일치 (공백이나 자식 노드가 섞여 있을 때 대응)
  for (const el of elements) {
    if (el.textContent.includes(text)) {
      return el;
    }
  }
  
  return null;
}

function getClickableTarget(element) {
  if (!element) return null;
  return element.closest('[role="button"], button, .docs-material-button, .docs-gm3-button, [role="radio"], .docs-thumbnailcontrol') || element;
}

function findClickableByText(selector, text) {
  const element = findElementByText(selector, text);
  if (element) return getClickableTarget(element);

  const textNodes = document.querySelectorAll('.docs-material-button-content, .appsFlixPluginsVoiceoversAvatarsSelectionDialogFilterChip, .docs-gm3-button');
  for (const node of textNodes) {
    if (node.textContent.trim() === text || node.textContent.includes(text)) {
      return getClickableTarget(node);
    }
  }

  return null;
}

function getEventPoint(element) {
  const rect = element.getBoundingClientRect();
  return {
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2
  };
}

// Wiz / GM3 / Material Design 컴포넌트용 강력한 클릭 시뮬레이션 헬퍼
function simulateClick(element) {
  if (!element) return false;
  
  try {
    const target = getClickableTarget(element);
    if (!target) return false;

    target.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
    const point = getEventPoint(target);

    // 1. 포커스 주기
    target.focus();
    
    // 2. PointerEvent를 먼저 발생시켜 Google/Wiz 컴포넌트의 pressed 상태를 유도
    if (window.PointerEvent) {
      target.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', ...point }));
      target.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', ...point }));
      target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', buttons: 1, ...point }));
      target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', ...point }));
    }
    
    // 3. MouseEvent를 이용해 mousedown, mouseup, click 명시적 트리거
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window, buttons: 1, ...point });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window, ...point });
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window, ...point });
    
    target.dispatchEvent(mousedownEvent);
    target.dispatchEvent(mouseupEvent);
    target.dispatchEvent(clickEvent);

    // 4. 일반 click()도 마지막에 호출
    target.click();
    
    return true;
  } catch (e) {
    console.error('[AI Minister] Error simulating click on element:', element, e);
    return false;
  }
}

function simulateSingleClick(element, options = {}) {
  if (!element) return false;

  try {
    const target = options.exactTarget ? element : getClickableTarget(element);
    if (!target) return false;

    target.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
    const point = getEventPoint(target);

    if (typeof target.focus === 'function') {
      target.focus();
    }

    if (window.PointerEvent) {
      target.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', ...point }));
      target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', buttons: 1, ...point }));
      target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', ...point }));
    }

    target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window, buttons: 1, ...point }));
    target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window, ...point }));
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, ...point }));
    return true;
  } catch (e) {
    console.error('[AI Pastor] Error simulating single click on element:', element, e);
    return false;
  }
}

// 아바타 카드 자체와 하위 요소들을 재귀적/다중으로 클릭해 확실히 선택시키는 헬퍼
function clickAvatarCardDeeply(avatarEl) {
  if (!avatarEl) return;
  
  console.log('[AI Minister] Attempting deep click on avatar card.');
  const radio = avatarEl.closest('[role="radio"].docs-thumbnailcontrol, [role="radio"]') || avatarEl;
  
  // 1) 카드 루트 요소 클릭
  simulateClick(radio);
  
  // 2) 내부 아바타 컨테이너 (.appsFlixPluginsVoiceoversAvatarsSelectionDialogAvatarContainer) 클릭
  const innerContainer = radio.querySelector('.appsFlixPluginsVoiceoversAvatarsSelectionDialogAvatarContainer');
  if (innerContainer) {
    simulateClick(innerContainer);
  }
  
  // 3) 내부 이미지 (img) 클릭 (가장 물리적인 클릭 영역일 확률이 높음)
  const avatarImg = radio.querySelector('img');
  if (avatarImg) {
    simulateClick(avatarImg);
  }
}

// 텍스트 입력 시뮬레이션 헬퍼 함수
function simulateTextInput(element, text) {
  element.focus();
  
  // 1. contenteditable 엘리먼트인 경우
  if (element.getAttribute('contenteditable') === 'true' || element.isContentEditable) {
    element.innerHTML = '';
    try {
      document.execCommand('insertText', false, text);
    } catch (e) {
      element.textContent = text;
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }
  
  // 2. input 또는 textarea 인 경우
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    element.value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  return false;
}

function dispatchInputEvent(element, inputType, data = null) {
  try {
    element.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      cancelable: false,
      composed: true,
      inputType,
      data
    }));
  } catch (e) {
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function dispatchPasteEvent(element, text) {
  let pasteEvent;
  try {
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/plain', text);
    pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      composed: true,
      clipboardData
    });
  } catch (e) {
    pasteEvent = new Event('paste', {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: (type) => type === 'text/plain' ? text : ''
      }
    });
  }

  element.dispatchEvent(pasteEvent);
}

function findScriptEditorArea() {
  return findVisibleElement('.appsFlixScriptsSidebarWorkspace') ||
         findVisibleElement('.appsFlixScriptsSidebarScripts') ||
         document.querySelector('.appsFlixScriptsSidebarWorkspace, .appsFlixScriptsSidebarScripts');
}

function getEditorTextSnapshot() {
  const scriptContainer = document.querySelector('.appsFlixScriptsSidebarScripts');
  return scriptContainer ? (scriptContainer.textContent || '') : '';
}

function getScriptCharacterCount() {
  const counter = document.querySelector('.appsFlixScriptsSidebarCharacterCounter');
  const match = counter && (counter.textContent || '').match(/(\d+)\s*\/\s*\d+/);
  return match ? Number(match[1]) : 0;
}

function isScriptTextPresent(text) {
  const preview = text.trim().slice(0, 30);
  if (!preview) return false;
  return getEditorTextSnapshot().includes(preview);
}

function isScriptReadyForPreview(state, text, currentIndex) {
  return isScriptTextPresent(text) ||
         (state.scriptTextInsertedForIndex === currentIndex && getScriptCharacterCount() > 0);
}

function requestTrustedTextInput(text, callback) {
  chrome.runtime.sendMessage({ action: 'trusted_insert_text', text }, (response) => {
    if (chrome.runtime.lastError) {
      callback({ ok: false, error: chrome.runtime.lastError.message });
      return;
    }

    callback(response || { ok: false, error: 'No response from background' });
  });
}

function requestTrustedClick(element, callback) {
  if (!element) {
    callback({ ok: false, error: 'No element to click' });
    return;
  }

  const target = getClickableTarget(element) || element;
  target.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
  const point = getEventPoint(target);

  chrome.runtime.sendMessage({
    action: 'trusted_click',
    x: point.clientX,
    y: point.clientY
  }, (response) => {
    if (chrome.runtime.lastError) {
      callback({ ok: false, error: chrome.runtime.lastError.message });
      return;
    }

    callback(response || { ok: false, error: 'No response from background' });
  });
}

function requestSermonDownloadWatch(book, chapter, callback) {
  chrome.runtime.sendMessage({
    action: 'watch_sermon_download',
    book,
    chapter
  }, (response) => {
    if (chrome.runtime.lastError) {
      callback({ ok: false, error: chrome.runtime.lastError.message });
      return;
    }

    callback(response || { ok: false, error: 'No response from background' });
  });
}

// Google Docs/Vids의 특수 입력창 텍스트 주입 헬퍼
function injectTextIntoGoogleEditor(targetSelector, text) {
  const editorArea = findScriptEditorArea() || document.querySelector(targetSelector);
  if (!editorArea) return false;

  // 1. 먼저 편집 영역 클릭 시뮬레이션으로 포커스 유도
  simulateClick(editorArea);
  editorArea.focus();
  document.dispatchEvent(new Event('selectionchange', { bubbles: true }));

  if (isScriptTextPresent(text)) {
    console.log('[AI Minister] Script text is already present');
    return true;
  }

  if (getScriptCharacterCount() > 0) {
    try {
      document.execCommand('selectAll', false, null);
      document.execCommand('delete', false, null);
      dispatchInputEvent(editorArea, 'deleteContentBackward');
    } catch (e) {
      console.log('[AI Minister] Could not clear existing script text before insert:', e);
    }
  }

  try {
    document.execCommand('insertText', false, text);
    dispatchInputEvent(editorArea, 'insertText', text);
  } catch (e) {
    console.log('[AI Minister] execCommand insertText failed, continuing with fallbacks:', e);
  }

  if (isScriptTextPresent(text)) {
    console.log('[AI Minister] Script text detected after execCommand insertText');
    return true;
  }
  
  // 2. 잠시 후 activeElement에 주입 시도
  const activeEl = document.activeElement;
  if (activeEl && activeEl !== document.body) {
    if (simulateTextInput(activeEl, text)) {
      dispatchInputEvent(activeEl, 'insertText', text);
      if (isScriptTextPresent(text)) {
        console.log('[AI Minister] Injected text into activeElement:', activeEl);
        return true;
      }
    }
  }

  // 3. Google Docs 숨겨진 텍스트 입력기(textarea) 직접 공략
  const hiddenTextarea = document.querySelector('textarea.docs-texteventimporter-textarea');
  if (hiddenTextarea) {
    if (simulateTextInput(hiddenTextarea, text)) {
      dispatchInputEvent(hiddenTextarea, 'insertText', text);
      if (isScriptTextPresent(text)) {
        console.log('[AI Minister] Injected text into hidden docs textarea');
        return true;
      }
    }
  }

  // 4. 붙여넣기 이벤트 fallback: Google 편집기가 paste를 더 잘 처리하는 경우가 있음
  const pasteTargets = [
    document.activeElement,
    editorArea,
    document.querySelector('.appsFlixScriptsSidebarScripts')
  ].filter(Boolean);

  for (const target of pasteTargets) {
    dispatchPasteEvent(target, text);
    dispatchInputEvent(target, 'insertFromPaste', text);
    if (isScriptTextPresent(text)) {
      console.log('[AI Minister] Script text detected after paste event');
      return true;
    }
  }

  // 5. 마지막 보루: editorArea 자체에 주입 시도
  if (simulateTextInput(editorArea, text)) {
    console.log('[AI Minister] Injected text into editor area directly');
    return true;
  }

  return false;
}

function isVisible(element) {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && element.offsetParent !== null;
}

function findVisibleElement(selector) {
  return Array.from(document.querySelectorAll(selector)).find(isVisible) || null;
}

function isProgressBlocking() {
  const progressContainer = findVisibleElement('.appsFlixScriptsSidebarInProgressViewContainer');
  const progressText = findVisibleElement('.appsFlixScriptsSidebarInProgressPercentage');
  return !!(progressContainer && progressText);
}

function isActionEnabled(element) {
  if (!element || !isVisible(element)) return false;
  return element.getAttribute('aria-disabled') !== 'true' &&
         !element.classList.contains('docs-gm3-button-disabled') &&
         !element.classList.contains('jfk-button-disabled');
}

function findMediaActionButton(label) {
  const buttons = Array.from(document.querySelectorAll(
    '.appsFlixVoiceoversSidebarGenerateMediaCardPrimaryActionButton [role="button"], .docs-gm3-filled-button[role="button"], [role="button"]'
  ));

  return buttons.find((button) => {
    const text = (button.textContent || '').trim();
    return text.includes(label) && isActionEnabled(button);
  }) || null;
}

function normalizeSelectedAvatar(avatar) {
  if (!avatar || typeof avatar !== 'object') {
    return {
      mode: 'id',
      id: 'actor30',
      name: 'Benjamin',
      category: '3D 만화'
    };
  }

  return {
    mode: avatar.mode || (avatar.id ? 'id' : 'first'),
    id: avatar.id || '',
    name: avatar.name || '',
    category: avatar.category || ''
  };
}

function findCategoryButton(category) {
  if (!category) return null;
  return findClickableByText('button.appsFlixPluginsVoiceoversAvatarsSelectionDialogFilterChip, [role="button"], button', category) ||
         findClickableByText('button.appsFlixPluginsVoiceoversAvatarsSelectionDialogFilterChip, [role="button"], button', category.replace('3D 만화', '3D Cartoon'));
}

function escapeAttrValue(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function findAvatarElement(avatar) {
  const radioSelector = 'div[role="radio"], [role="radio"], div.docs-thumbnailcontrol[id^="actor"]';

  if (avatar.mode === 'id' && avatar.id) {
    const safeId = escapeAttrValue(avatar.id);
    const byRadioId = document.querySelector(`.docs-thumbnailcontrol[role="radio"][id="${safeId}"], [role="radio"][id="${safeId}"]`);
    if (byRadioId) return byRadioId;

    const byInnerId = document.getElementById(avatar.id);
    const radioParent = byInnerId && byInnerId.closest('[role="radio"].docs-thumbnailcontrol, [role="radio"]');
    if (radioParent) return radioParent;
    if (byInnerId) return byInnerId;
  }

  if (avatar.mode === 'first') {
    const firstVisible = Array.from(document.querySelectorAll(radioSelector)).find(isVisible);
    if (firstVisible) return firstVisible;
  }

  if (avatar.name) {
    const name = avatar.name.toLowerCase();
    const byName = Array.from(document.querySelectorAll(radioSelector)).find((element) => {
      const aria = (element.getAttribute('aria-label') || '').toLowerCase();
      const title = (element.getAttribute('title') || '').toLowerCase();
      const text = (element.textContent || '').toLowerCase();
      return aria.includes(name) || title.includes(name) || text.includes(name);
    });
    if (byName) return byName;
  }

  return null;
}

function buildPromptedText(promptText, sentence) {
  const prompt = (promptText || '').trim();
  if (!prompt) return sentence;

  if (prompt.includes('{text}') || prompt.includes('{sentence}')) {
    return prompt
      .replaceAll('{text}', sentence)
      .replaceAll('{sentence}', sentence);
  }

  return `${prompt}\n\n${sentence}`;
}

function isAvatarChecked(avatarElement) {
  const radio = avatarElement && (avatarElement.closest('[role="radio"]') || avatarElement);
  return !!radio && radio.getAttribute('aria-checked') === 'true';
}

function findAvatarChangeButton() {
  return document.querySelector('.appsFlixVoiceoversSidebarGenerateMediaCardAvatarModeContainer .appsFlixVoiceoversSidebarGenerateMediaCardChangeMediaButton [role="button"][aria-label*="아바타"]') ||
         document.querySelector('.appsFlixVoiceoversSidebarGenerateMediaCardAvatarModeContainer .appsFlixVoiceoversSidebarGenerateMediaCardChangeMediaButton [role="button"][data-tooltip*="아바타"]') ||
         findClickableByText('.appsFlixVoiceoversSidebarGenerateMediaCardAvatarModeContainer .appsFlixVoiceoversSidebarGenerateMediaCardChangeMediaButton [role="button"], .docs-material-button-content', '변경') ||
         findClickableByText('.appsFlixVoiceoversSidebarGenerateMediaCardAvatarModeContainer .appsFlixVoiceoversSidebarGenerateMediaCardChangeMediaButton [role="button"], .docs-material-button-content', 'Change');
}

function isConfiguredAvatarDisplayed(avatar) {
  const card = document.querySelector('.appsFlixVoiceoversSidebarGenerateMediaCardAvatarModeContainer .appsFlixVoiceoversSidebarGenerateMediaCardMediaCard');
  if (!card) return false;

  const image = card.querySelector('img[src*="/presetavatars/"], img[src*="presetavatars"]');
  if (avatar.id && image && image.src.includes(`${avatar.id}.png`)) {
    return true;
  }

  const name = card.querySelector('.appsFlixPluginsVoiceoversVoicecardVoiceName');
  if (avatar.name && name && name.textContent.trim().toLowerCase() === avatar.name.toLowerCase()) {
    return true;
  }

  return false;
}

// 메인 자동화 로직
function checkAndExecute() {
  // 1. 확장 프로그램 컨텍스트 유효성 검사 (만료 시 타이머 해제 및 중단)
  if (!chrome.runtime || !chrome.runtime.id) {
    console.log('[AI Minister] Extension context was invalidated. Clearing automation timer.');
    if (automationInterval) {
      clearInterval(automationInterval);
      automationInterval = null;
    }
    return;
  }

  try {
    chrome.storage.local.get(['ai_minister_state'], (result) => {
      // 콜백 시점에 만료되었는지 확인
      if (chrome.runtime.lastError) {
        console.log('[AI Minister] runtime.lastError detected:', chrome.runtime.lastError.message);
        if (automationInterval) {
          clearInterval(automationInterval);
          automationInterval = null;
        }
        return;
      }

      const state = result.ai_minister_state;
      if (!state || state.status !== 'running') {
        return;
      }

      const { sentences, currentIndex } = state;
      let step = state.step || 'init';
      
      // 모든 문장 완료 조건
      if (currentIndex >= sentences.length) {
        console.log('[AI Minister] All sentences generated successfully!');
        state.status = 'completed';
        chrome.storage.local.set({ ai_minister_state: state });
        return;
      }

      const selectedAvatar = normalizeSelectedAvatar(state.selectedAvatar);
      const currentText = buildPromptedText(state.promptText, sentences[currentIndex]);
      const currentUrl = window.location.href;

      // A. 구글 비디오 홈화면인 경우 (URL에 /videos/u/0/ 등이 포함됨)
      if (currentUrl.includes('/videos/u/0/')) {
        if (step === 'init') {
          logStep('Home Screen - Starting New Video');
          const newVideoBtn = document.querySelector('div.docs-homescreen-templates-templateview-preview-showcase');
          if (newVideoBtn) {
            console.log('[AI Minister] Clicking "New Video" button.');
            simulateClick(newVideoBtn);
            
            state.step = 'blank_video';
            chrome.storage.local.set({ ai_minister_state: state });
          } else {
            console.log('[AI Minister] Waiting for "New Video" template button...');
          }
        } else {
          // 이미 단계가 넘어갔으나 홈화면인 경우 리셋
          state.step = 'init';
          chrome.storage.local.set({ ai_minister_state: state });
        }
        return;
      }

      // B. 비디오 문서 편집 화면인 경우 (/videos/d/ 또는 /presentation/d/)
      if (currentUrl.includes('/videos/d/') || currentUrl.includes('/presentation/d/')) {
        
        // 진행도(프로그레스) 요소가 존재하는지 확인
        const progressEl = findVisibleElement('.appsFlixScriptsSidebarInProgressPercentage');
        const progressValue = progressEl ? progressEl.textContent.trim() : '';
        const progressAwareSteps = ['wait_generation_started', 'wait_progress', 'wait_media_inserted'];
        
        // wait_progress 단계가 아님에도 진행도 UI가 화면을 가리고 있다면 대기 (예외 방지)
        if (isProgressBlocking() && !progressAwareSteps.includes(step) && progressValue !== '0%') {
          logStep('Waiting - System busy with progress bar');
          return;
        }

        switch (step) {
          case 'init':
            // 홈화면 단계를 건너뛰고 바로 편집기로 들어온 경우 대처
            state.step = 'blank_video';
            chrome.storage.local.set({ ai_minister_state: state });
            break;

          case 'blank_video':
            logStep('Editor [blank_video] - Locating Blank Video option');
            
            const blankVideoBtn = document.querySelector('button.appsDocsGettingStartedEntryPointSelectionViewBlankCard') ||
                                  findElementByText('button.appsDocsGettingStartedEntryPointSelectionViewButton', '빈 Vids 동영상') ||
                                  findElementByText('button.appsDocsGettingStartedEntryPointSelectionViewButton', 'Blank video');
            
            if (blankVideoBtn) {
              console.log('[AI Minister] Clicking "Blank Video" button.');
              simulateClick(blankVideoBtn);
              
              state.step = 'show_avatar_rail';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              // 이미 이 시작 화면(Blank Card)이 사라졌다면 다음 단계로 자동 전이
              const railBtn = document.querySelector('div#content-library-rail-avatars-element');
              if (railBtn) {
                console.log('[AI Minister] Blank card screen not visible but toolbar rail is. Proceeding to show_avatar_rail.');
                state.step = 'show_avatar_rail';
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Waiting for Blank Video screen option...');
              }
            }
            break;

          case 'show_avatar_rail':
            logStep('Editor [show_avatar_rail] - Clicking Avatar Toolbar button');
            
            const railBtn = document.querySelector('div#content-library-rail-avatars-element') ||
                            document.querySelector('div[aria-label="아바타 생성"]') ||
                            document.querySelector('div[data-tooltip="아바타 생성"]');
            
            if (railBtn) {
              // 이미 툴바 아바타 버튼이 눌려 활성화 상태인 경우 클릭할 필요 없음
              if (railBtn.getAttribute('aria-pressed') === 'true' || railBtn.classList.contains('appsSketchyContentLibraryRailToolbarButtonRefreshed-checked')) {
                console.log('[AI Minister] Avatar rail is already pressed. Transition to click_avatar_change');
                state.step = 'click_avatar_change';
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Clicking Avatar Rail button.');
                simulateClick(railBtn);
                state.step = 'click_avatar_change';
                chrome.storage.local.set({ ai_minister_state: state });
              }
            } else {
              console.log('[AI Minister] Waiting for Avatar Rail button to load...');
            }
            break;

          case 'click_avatar_change':
            logStep('Editor [click_avatar_change] - Locating and clicking Change (변경) button');
            
            const changeBtn = findAvatarChangeButton() ||
                              findClickableByText('.docs-material-button, [role="button"], button, .docs-material-button-content', '변경') ||
                              findClickableByText('.docs-material-button, [role="button"], button, .docs-material-button-content', 'Change');
            
            if (changeBtn) {
              console.log('[AI Minister] Clicking "Change" (변경) button.');
              simulateClick(changeBtn);
              state.step = 'select_avatar_category';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              // 아바타 다이얼로그가 이미 활성화되어 있는 상태인지 체크하여 바로 이행
              const avatarDialogOpen = document.querySelector('button.appsFlixPluginsVoiceoversAvatarsSelectionDialogFilterChip, [role="dialog"] [role="radio"], div.docs-thumbnailcontrol[id^="actor"]');
              if (avatarDialogOpen) {
                console.log('[AI Minister] Change button not visible but Avatar Dialog is open. Transition to avatar selection');
                state.step = selectedAvatar.category ? 'select_avatar_category' : 'select_avatar';
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Waiting for "Change" (변경) button to appear in sidebar...');
              }
            }
            break;

          case 'select_avatar_category':
            if (!selectedAvatar.category) {
              logStep('Editor [select_avatar_category] - No category selected, moving to avatar selection');
              state.step = 'select_avatar';
              chrome.storage.local.set({ ai_minister_state: state });
              break;
            }

            logStep(`Editor [select_avatar_category] - Clicking ${selectedAvatar.category} filter`);
            
            const categoryBtn = findCategoryButton(selectedAvatar.category);
            
            if (categoryBtn) {
              if (categoryBtn.getAttribute('aria-pressed') === 'true') {
                console.log('[AI Minister] Avatar category filter already active. Transition to select_avatar');
                state.step = 'select_avatar';
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Clicking avatar category filter.');
                simulateClick(categoryBtn);
                state.step = 'select_avatar';
                chrome.storage.local.set({ ai_minister_state: state });
              }
            } else {
              console.log('[AI Minister] Waiting for Category Filter buttons in dialog...');
            }
            break;

          case 'select_avatar_benjamin':
          case 'select_avatar':
            logStep(`Editor [select_avatar] - Selecting avatar: ${selectedAvatar.name || selectedAvatar.id || selectedAvatar.mode}`);
            
            const avatarElement = findAvatarElement(selectedAvatar);
            if (avatarElement) {
              if (isAvatarChecked(avatarElement)) {
                console.log('[AI Minister] Selected avatar already checked. Transition to confirm_avatar');
                delete state.avatarSelectAttempts;
                state.step = 'confirm_avatar';
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Selecting configured avatar with deep click.');
                clickAvatarCardDeeply(avatarElement);
                state.avatarSelectAttempts = 1;
                state.step = 'wait_avatar_selected';
                chrome.storage.local.set({ ai_minister_state: state });
              }
            } else {
              console.log('[AI Minister] Configured avatar is not loaded yet. Waiting...');
            }
            break;

          case 'wait_avatar_selected':
            logStep('Editor [wait_avatar_selected] - Waiting for selected avatar state');

            const selectedAvatarElement = findAvatarElement(selectedAvatar);
            if (selectedAvatarElement && isAvatarChecked(selectedAvatarElement)) {
              console.log('[AI Minister] Avatar selection is confirmed. Transition to confirm_avatar');
              delete state.avatarSelectAttempts;
              state.step = 'confirm_avatar';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if (selectedAvatarElement && (state.avatarSelectAttempts || 0) < 3) {
              console.log('[AI Minister] Avatar is not checked yet. Clicking again.');
              clickAvatarCardDeeply(selectedAvatarElement);
              state.avatarSelectAttempts = (state.avatarSelectAttempts || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Avatar checked state was not reflected. Trying final Select anyway.');
              delete state.avatarSelectAttempts;
              state.step = 'confirm_avatar';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'confirm_avatar':
            logStep('Editor [confirm_avatar] - Clicking final Confirm (선택) button');
            
            const confirmBtn = findClickableByText('.docs-material-gm-dialog-call-to-action-button, .docs-gm3-filled-button, [role="button"]', '선택') ||
                               findClickableByText('.docs-material-gm-dialog-call-to-action-button, .docs-gm3-filled-button, [role="button"]', 'Select');
            
            if (confirmBtn) {
              console.log('[AI Minister] Clicking final Select (선택) button.');
              simulateClick(confirmBtn);
              state.avatarApplyAttempts = 0;
              state.step = 'wait_avatar_applied';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Waiting for final Select (선택) button to activate...');
            }
            break;

          case 'wait_avatar_applied':
            logStep('Editor [wait_avatar_applied] - Waiting for avatar sidebar card to update');

            if (isConfiguredAvatarDisplayed(selectedAvatar)) {
              console.log('[AI Minister] Avatar sidebar card is updated. Moving to script input.');
              delete state.avatarApplyAttempts;
              state.avatarSetupDone = true;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.avatarApplyAttempts || 0) < 5) {
              state.avatarApplyAttempts = (state.avatarApplyAttempts || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Avatar sidebar card did not update yet. Reopening avatar selection.');
              delete state.avatarApplyAttempts;
              state.avatarSetupDone = false;
              state.step = 'click_avatar_change';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'input_text':
            logStep(`Editor [input_text] - Writing Script [${currentIndex + 1}/${sentences.length}]: "${currentText}"`);

            if (!state.avatarSetupDone) {
              if (isConfiguredAvatarDisplayed(selectedAvatar)) {
                console.log('[AI Minister] Configured avatar is already displayed in sidebar.');
                state.avatarSetupDone = true;
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                console.log('[AI Minister] Avatar is not configured yet. Returning to avatar change step.');
                state.step = 'click_avatar_change';
                chrome.storage.local.set({ ai_minister_state: state });
              }
              return;
            }
            
            // 만약 "스크립트 수정" 모드 버튼이 보인다면 클릭하여 에디터를 활성화
            const editBtn = findVisibleElement('.appsFlixScriptsSidebarKeyboardEditButton');
            if (editBtn && !state.scriptEditorActivated) {
              console.log('[AI Minister] Clicking "Edit Script" (스크립트 수정) button.');
              simulateClick(editBtn);
              state.scriptEditorActivated = true;
              state.scriptInputAttempts = 0;
              state.step = 'activate_script_editor';
              chrome.storage.local.set({ ai_minister_state: state });
              return;
            }

            state.step = 'insert_script_text';
            chrome.storage.local.set({ ai_minister_state: state });
            break;

          case 'activate_script_editor':
            logStep('Editor [activate_script_editor] - Focusing script workspace');

            const editorArea = findScriptEditorArea();
            if (editorArea) {
              simulateClick(editorArea);
              state.step = 'insert_script_text';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.scriptInputAttempts || 0) < 3) {
              state.scriptInputAttempts = (state.scriptInputAttempts || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Script editor area was not found. Retrying from input_text.');
              state.scriptEditorActivated = false;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'insert_script_text':
            logStep(`Editor [insert_script_text] - Injecting script [${currentIndex + 1}/${sentences.length}]`);

            if (isScriptReadyForPreview(state, currentText, currentIndex)) {
              console.log('[AI Minister] Script text is already ready. Transition to click_preview');
              delete state.scriptInputAttempts;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              state.step = 'click_preview';
              chrome.storage.local.set({ ai_minister_state: state });
              break;
            }
            
            // 텍스트 주입
            const inputSuccess = injectTextIntoGoogleEditor('.appsFlixScriptsSidebarWorkspace, .appsFlixScriptsSidebarScripts', currentText);
            if (inputSuccess || getScriptCharacterCount() > 0) {
              console.log('[AI Minister] Script text injected. Transition to click_preview');
              delete state.scriptInputAttempts;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              state.scriptTextInsertedForIndex = currentIndex;
              state.step = 'click_preview';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.scriptInputAttempts || 0) >= 2 && !state.trustedInputRequested) {
              console.log('[AI Minister] DOM text injection failed. Trying trusted text input.');
              const trustedState = { ...state };
              trustedState.trustedInputRequested = true;
              trustedState.scriptInputAttempts = (trustedState.scriptInputAttempts || 0) + 1;
              trustedState.step = 'verify_script_text';
              chrome.storage.local.set({ ai_minister_state: trustedState });
              requestTrustedTextInput(currentText, (response) => {
                chrome.storage.local.get(['ai_minister_state'], (result) => {
                  const latestState = result.ai_minister_state || trustedState;
                  latestState.trustedInputResult = response.ok ? 'ok' : (response.error || 'failed');
                  if (response.ok) {
                    latestState.scriptTextInsertedForIndex = currentIndex;
                  }
                  latestState.step = 'verify_script_text';
                  chrome.storage.local.set({ ai_minister_state: latestState });
                });
              });
            } else if ((state.scriptInputAttempts || 0) < 5) {
              state.scriptInputAttempts = (state.scriptInputAttempts || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Script injection failed after retries. Reactivating script editor.');
              state.scriptEditorActivated = false;
              state.scriptInputAttempts = 0;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'verify_script_text':
            logStep('Editor [verify_script_text] - Verifying script text input');

            if (isScriptReadyForPreview(state, currentText, currentIndex) || getScriptCharacterCount() > 0) {
              console.log('[AI Minister] Script text verified. Transition to click_preview');
              delete state.scriptInputAttempts;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              state.scriptTextInsertedForIndex = currentIndex;
              state.step = 'click_preview';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.scriptInputAttempts || 0) < 6) {
              console.log('[AI Minister] Script text is not visible yet. Retrying injection.');
              delete state.trustedInputRequested;
              state.step = 'insert_script_text';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Script text verification failed. Reactivating editor.');
              state.scriptEditorActivated = false;
              state.scriptInputAttempts = 0;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'click_preview':
            logStep('Editor [click_preview] - Locating Preview or Generate button');
            
            const directGenerateBtn = findMediaActionButton('생성');
            if (directGenerateBtn) {
              console.log('[AI Minister] Generate button is already available. Transition to click_generate.');
              state.step = 'click_generate';
              chrome.storage.local.set({ ai_minister_state: state });
              break;
            }

            const previewBtn = findMediaActionButton('미리보기');
            if (previewBtn) {
              console.log('[AI Minister] Clicking "Preview" (미리보기) button.');
              simulateClick(previewBtn);
              state.step = 'click_generate';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Preview/Generate button not found or disabled yet. Retrying...');
            }
            break;

          case 'click_generate':
            logStep('Editor [click_generate] - Waiting for Generate button');
            
            const generateBtn = findMediaActionButton('생성');
            if (generateBtn) {
              console.log('[AI Minister] "Generate" (생성) button is visible. Clicking...');
              simulateClick(generateBtn);
              state.generationWaitTicks = 0;
              state.generationSettleTicks = 0;
              state.sawGenerationProgress = false;
              state.step = 'wait_generation_started';
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Generate button is not visible or enabled yet. Waiting...');
            }
            break;

          case 'wait_generation_started':
            logStep('Editor [wait_generation_started] - Waiting for generation progress to start');

            if (progressEl && progressValue === '100%') {
              console.log('[AI Minister] Generation already reached 100%. Waiting for media insertion.');
              state.sawGenerationProgress = true;
              state.step = 'wait_media_inserted';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if (progressEl && progressValue !== '0%') {
              console.log(`[AI Minister] Generation progress started: ${progressValue}`);
              state.sawGenerationProgress = true;
              state.step = 'wait_progress';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.generationWaitTicks || 0) < 30) {
              state.generationWaitTicks = (state.generationWaitTicks || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Generation progress did not appear. Returning to Generate button.');
              delete state.generationWaitTicks;
              delete state.generationSettleTicks;
              delete state.generationNoProgressTicks;
              delete state.sawGenerationProgress;
              state.step = 'click_generate';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'wait_progress':
            if (progressEl) {
              const progressPct = progressEl.textContent.trim();
              logStep(`Editor [wait_progress] - Generation In Progress: ${progressPct}`);
              state.sawGenerationProgress = state.sawGenerationProgress || progressPct !== '0%';
              
              if (progressPct === '100%') {
                console.log('[AI Minister] Progress is 100%. Waiting for generated media to be inserted.');
                state.step = 'wait_media_inserted';
                state.generationSettleTicks = 0;
                chrome.storage.local.set({ ai_minister_state: state });
              } else {
                chrome.storage.local.set({ ai_minister_state: state });
              }
            } else {
              logStep('Editor [wait_progress] - Progress UI not visible');
              if (state.sawGenerationProgress) {
                state.generationNoProgressTicks = (state.generationNoProgressTicks || 0) + 1;
                if (state.generationNoProgressTicks >= 3) {
                  console.log('[AI Minister] Progress disappeared after starting. Waiting for media insertion.');
                  state.step = 'wait_media_inserted';
                  state.generationSettleTicks = 0;
                }
              } else {
                state.generationWaitTicks = (state.generationWaitTicks || 0) + 1;
              }
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'wait_media_inserted':
            logStep('Editor [wait_media_inserted] - Waiting before adding next scene');

            if (isProgressBlocking() && progressValue !== '100%') {
              state.generationSettleTicks = 0;
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.generationSettleTicks || 0) < 6) {
              state.generationSettleTicks = (state.generationSettleTicks || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] Generated media should be inserted now. Transition to add_scene.');
              delete state.generationWaitTicks;
              delete state.generationSettleTicks;
              delete state.generationNoProgressTicks;
              delete state.sawGenerationProgress;
              state.step = 'add_scene';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;

          case 'add_scene':
            logStep('Editor [add_scene] - Clicking "New Scene" (새로운 장면) button');
            
            // "새로운 장면 (Ctrl+M)" 버튼 검색
            const addSceneBtn = document.querySelector('div.appsFlixTimelineAddSceneButtonContainer div[role="button"], div.appsFlixTimelineAddSceneButtonContainer .docs-material-button, div[aria-label="새로운 장면 (Ctrl+M)"]');
            
            if (addSceneBtn) {
              console.log('[AI Minister] Clicking "New Scene" (새로운 장면) button.');
              simulateClick(addSceneBtn);
              
              // 다음 문장 인덱스 증가 및 첫 단계로 복귀
              state.currentIndex = currentIndex + 1;
              delete state.scriptEditorActivated;
              delete state.scriptInputAttempts;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              delete state.scriptTextInsertedForIndex;
              delete state.generationWaitTicks;
              delete state.generationSettleTicks;
              delete state.generationNoProgressTicks;
              delete state.sawGenerationProgress;
              delete state.addSceneAttempts;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            } else if ((state.addSceneAttempts || 0) < 5) {
              state.addSceneAttempts = (state.addSceneAttempts || 0) + 1;
              chrome.storage.local.set({ ai_minister_state: state });
            } else {
              console.log('[AI Minister] "New Scene" button not found after retries. Continuing with current scene input.');
              delete state.addSceneAttempts;
              delete state.scriptEditorActivated;
              delete state.scriptInputAttempts;
              delete state.trustedInputRequested;
              delete state.trustedInputResult;
              delete state.scriptTextInsertedForIndex;
              state.step = 'input_text';
              chrome.storage.local.set({ ai_minister_state: state });
            }
            break;
        }
      }
    });
  } catch (err) {
    if (err.message && err.message.includes('Extension context invalidated')) {
      console.log('[AI Minister] Exception caught: Extension context invalidated. Clearing interval.');
      if (automationInterval) {
        clearInterval(automationInterval);
        automationInterval = null;
      }
    } else {
      console.error('[AI Minister] Unexpected error in checkAndExecute:', err);
    }
  }
}

// 로그 도배 방지용 헬퍼
function logStep(stepName) {
  if (lastStepLog !== stepName) {
    console.log(`[AI Pastor] State: ${stepName}`);
    lastStepLog = stepName;
  }
}

// ==========================================
// --- NotebookLM Automation Logic (Tab 2) ---
// ==========================================

let notebookLMInterval = null;

const LANGUAGE_TEXT_RE = /\benglish\b|영어/i;
const LANGUAGE_CONTEXT_RE = /language|언어|한국어|korean|english|영어/i;
const NOTEBOOKLM_URL = 'https://notebooklm.google.com/notebook/ecd77ff6-d7f6-49fe-9493-84abb1d9a39c';
const NOTEBOOKLM_GENERATION_REFRESH_MS = 60000;
const NOTEBOOKLM_START_LOAD_TIMEOUT_MS = 60000;
const NOTEBOOKLM_BIBLE_BOOKS = [
  { id: "Genesis", chapters: 50 },
  { id: "Exodus", chapters: 40 },
  { id: "Leviticus", chapters: 27 },
  { id: "Numbers", chapters: 36 },
  { id: "Deuteronomy", chapters: 34 },
  { id: "Joshua", chapters: 24 },
  { id: "Judges", chapters: 21 },
  { id: "Ruth", chapters: 4 },
  { id: "1Samuel", chapters: 31 },
  { id: "2Samuel", chapters: 24 },
  { id: "1Kings", chapters: 22 },
  { id: "2Kings", chapters: 25 },
  { id: "1Chronicles", chapters: 29 },
  { id: "2Chronicles", chapters: 36 },
  { id: "Ezra", chapters: 10 },
  { id: "Nehemiah", chapters: 13 },
  { id: "Esther", chapters: 10 },
  { id: "Job", chapters: 42 },
  { id: "Psalms", chapters: 150 },
  { id: "Proverbs", chapters: 31 },
  { id: "Ecclesiastes", chapters: 12 },
  { id: "SongofSolomon", chapters: 8 },
  { id: "Isaiah", chapters: 66 },
  { id: "Jeremiah", chapters: 52 },
  { id: "Lamentations", chapters: 5 },
  { id: "Ezekiel", chapters: 48 },
  { id: "Daniel", chapters: 12 },
  { id: "Hosea", chapters: 14 },
  { id: "Joel", chapters: 3 },
  { id: "Amos", chapters: 9 },
  { id: "Obadiah", chapters: 1 },
  { id: "Jonah", chapters: 4 },
  { id: "Micah", chapters: 7 },
  { id: "Nahum", chapters: 3 },
  { id: "Habakkuk", chapters: 3 },
  { id: "Zephaniah", chapters: 3 },
  { id: "Haggai", chapters: 2 },
  { id: "Zechariah", chapters: 14 },
  { id: "Malachi", chapters: 4 },
  { id: "Matthew", chapters: 28 },
  { id: "Mark", chapters: 16 },
  { id: "Luke", chapters: 24 },
  { id: "John", chapters: 21 },
  { id: "Acts", chapters: 28 },
  { id: "Romans", chapters: 16 },
  { id: "1Corinthians", chapters: 16 },
  { id: "2Corinthians", chapters: 13 },
  { id: "Galatians", chapters: 6 },
  { id: "Ephesians", chapters: 6 },
  { id: "Philippians", chapters: 4 },
  { id: "Colossians", chapters: 4 },
  { id: "1Thessalonians", chapters: 5 },
  { id: "2Thessalonians", chapters: 3 },
  { id: "1Timothy", chapters: 6 },
  { id: "2Timothy", chapters: 4 },
  { id: "Titus", chapters: 3 },
  { id: "Philemon", chapters: 1 },
  { id: "Hebrews", chapters: 13 },
  { id: "James", chapters: 5 },
  { id: "1Peter", chapters: 5 },
  { id: "2Peter", chapters: 3 },
  { id: "1John", chapters: 5 },
  { id: "2John", chapters: 1 },
  { id: "3John", chapters: 1 },
  { id: "Jude", chapters: 1 },
  { id: "Revelation", chapters: 22 }
];

function getNormalizedText(element) {
  return ((element && element.textContent) || '').replace(/\s+/g, ' ').trim();
}

function getElementDebugLabel(element) {
  if (!element) return 'unknown element';
  const aria = element.getAttribute('aria-label') || '';
  const text = getNormalizedText(element).slice(0, 80);
  const id = element.id ? `#${element.id}` : '';
  const className = typeof element.className === 'string' && element.className
    ? `.${element.className.trim().split(/\s+/).slice(0, 3).join('.')}`
    : '';
  return `${element.tagName.toLowerCase()}${id}${className}${aria ? ` aria="${aria}"` : ''}${text ? ` text="${text}"` : ''}`;
}

function getLanguageSelectCandidates() {
  const rawCandidates = Array.from(document.querySelectorAll(
    'mat-select, .mat-mdc-select-trigger, .mat-select-trigger, [role="combobox"]'
  ));
  const seen = new Set();

  return rawCandidates
    .map((element) => {
      const matSelect = element.closest('mat-select') || (element.matches('mat-select') ? element : null);
      const trigger = (matSelect && matSelect.querySelector('.mat-mdc-select-trigger, .mat-select-trigger, [role="combobox"]')) || element;
      const root = matSelect || trigger.closest('mat-form-field, .mat-mdc-form-field, .mat-form-field') || trigger;
      return { trigger, root };
    })
    .filter(({ trigger }) => {
      if (!trigger || seen.has(trigger)) return false;
      seen.add(trigger);
      return isVisible(trigger) && trigger.getAttribute('aria-disabled') !== 'true';
    })
    .map(({ trigger, root }) => {
      const valueEl = root.querySelector('.mat-mdc-select-value-text, .mat-select-value-text, .mat-mdc-select-min-line');
      const valueText = getNormalizedText(valueEl || trigger);
      const contextParts = [
        trigger.getAttribute('aria-label'),
        trigger.getAttribute('aria-labelledby'),
        trigger.getAttribute('placeholder'),
        trigger.getAttribute('data-placeholder'),
        trigger.getAttribute('title'),
        root.getAttribute('aria-label'),
        root.getAttribute('placeholder'),
        root.getAttribute('data-placeholder'),
        root.getAttribute('title'),
        getNormalizedText(root.closest('mat-form-field, .mat-mdc-form-field, .mat-form-field, label') || root)
      ].filter(Boolean);
      const context = contextParts.join(' ');
      let score = 0;

      if (/language|언어/i.test(context)) score += 100;
      if (LANGUAGE_CONTEXT_RE.test(valueText)) score += 50;
      if (LANGUAGE_CONTEXT_RE.test(context)) score += 30;
      if (trigger.getAttribute('aria-expanded') === 'true') score += 20;
      if (trigger.closest('mat-dialog-container, .mat-mdc-dialog-container, [role="dialog"]')) score += 10;
      if ((trigger.getAttribute('aria-haspopup') || '').includes('listbox')) score += 5;

      return { trigger, root, valueText, score };
    })
    .sort((a, b) => b.score - a.score);
}

function findEnglishSelectedLanguageCandidate() {
  return getLanguageSelectCandidates().find(candidate => LANGUAGE_TEXT_RE.test(candidate.valueText));
}

function findEnglishLanguageOption() {
  const optionSelectors = [
    '.cdk-overlay-pane .mat-mdc-option',
    '.cdk-overlay-pane mat-option',
    '.cdk-overlay-pane [role="option"]',
    '.mat-mdc-option',
    'mat-option',
    '[role="option"]'
  ].join(', ');

  const options = Array.from(document.querySelectorAll(optionSelectors))
    .filter(option => isVisible(option) && option.getAttribute('aria-disabled') !== 'true');

  return options.find(option => LANGUAGE_TEXT_RE.test(getNormalizedText(option))) || null;
}

function closeMaterialOverlay() {
  try {
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(escapeEvent);
    document.body.dispatchEvent(escapeEvent);
  } catch (e) {
    console.log('[AI Pastor] Could not dispatch Escape to close overlay:', e);
  }
}

function findKawaiiStyleOption() {
  const image = Array.from(document.querySelectorAll('img'))
    .find(img => (img.getAttribute('src') || '').includes('kawaii_new.png'));

  let radioButton = image ? image.closest('mat-radio-button') : null;

  if (!radioButton) {
    radioButton = Array.from(document.querySelectorAll('mat-radio-button.carousel-radio-button, mat-radio-button'))
      .find(radio => /귀여움|kawaii|cute/i.test(getNormalizedText(radio)));
  }

  if (!radioButton) return null;

  return {
    radioButton,
    banner: radioButton.querySelector('label.mdc-label') ||
            radioButton.querySelector('.carousel-content') ||
            radioButton.querySelector('.mdc-label') ||
            radioButton
  };
}

function isMaterialRadioChecked(radioButton) {
  if (!radioButton) return false;
  const input = radioButton.querySelector('input[type="radio"]');
  return radioButton.classList.contains('mat-mdc-radio-checked') ||
         radioButton.getAttribute('aria-checked') === 'true' ||
         !!(input && (input.checked || input.getAttribute('aria-checked') === 'true'));
}

function isNotebookLMActionDisabled(button) {
  return !button ||
         button.disabled ||
         button.getAttribute('aria-disabled') === 'true' ||
         button.classList.contains('mat-mdc-button-disabled') ||
         button.classList.contains('mdc-button--disabled');
}

function getVideoOverviewArtifactCandidates() {
  const buttons = Array.from(document.querySelectorAll('button.artifact-stretched-button, button[aria-description], button[aria-labelledby]'));

  return buttons
    .map((button) => {
      const labelId = button.getAttribute('aria-labelledby');
      const labelText = labelId
        ? getNormalizedText(document.getElementById(labelId))
        : '';
      const container = button.closest('.artifact-button-content, .create-artifact-button-container') || button;
      const containerText = getNormalizedText(container);
      const ariaDescription = button.getAttribute('aria-description') || '';
      const combined = `${ariaDescription} ${labelText} ${containerText}`;
      const rect = container.getBoundingClientRect();
      const syncIcon = Array.from(container.querySelectorAll('mat-icon'))
        .some(icon => getNormalizedText(icon) === 'sync');
      const isGenerating = isNotebookLMActionDisabled(button) ||
        syncIcon ||
        /생성\s*중|generating|잠시\s*기다려/i.test(combined);

      return {
        button,
        container,
        text: combined,
        top: rect.top,
        isGenerating
      };
    })
    .filter(candidate => /동영상\s*개요|video\s*overview/i.test(candidate.text))
    .sort((a, b) => a.top - b.top);
}

function findTopVideoOverviewArtifactCandidate() {
  return getVideoOverviewArtifactCandidates()[0] || null;
}

function findGeneratingVideoOverviewArtifactCandidate() {
  return getVideoOverviewArtifactCandidates().find(candidate => candidate.isGenerating) || null;
}

function isVideoOverviewGenerating() {
  return !!findGeneratingVideoOverviewArtifactCandidate();
}

function findCompletedVideoOverviewButton() {
  const candidate = findTopVideoOverviewArtifactCandidate();
  if (!candidate || candidate.isGenerating || isNotebookLMActionDisabled(candidate.button)) {
    return null;
  }
  return candidate.button;
}

function getArtifactIdFromLabelledBy(element) {
  const labelledBy = element && element.getAttribute('aria-labelledby');
  const match = labelledBy && labelledBy.match(/artifact-labels-([a-f0-9-]+)/i);
  return match ? match[1] : '';
}

function getArtifactIdFromJslog(element) {
  const jslog = (element && element.getAttribute('jslog')) || '';
  const directMatch = jslog.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
  if (directMatch && directMatch.length) {
    return directMatch[directMatch.length - 1];
  }

  const encodedMatch = jslog.match(/0:([A-Za-z0-9+/=_-]+)/);
  if (!encodedMatch) return '';

  let decoded = '';
  try {
    decoded = atob(encodedMatch[1].replace(/-/g, '+').replace(/_/g, '/'));
  } catch (e) {
    return '';
  }

  const match = decoded.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
  return match && match.length ? match[match.length - 1] : '';
}

function isTargetArtifactViewerOpen(targetArtifactId) {
  if (!targetArtifactId) return true;

  const viewer = document.querySelector('artifact-viewer');
  if (!viewer) return false;

  const matchingElement = Array.from(viewer.querySelectorAll('[jslog], [aria-labelledby]'))
    .find(element => {
      const labelledId = getArtifactIdFromLabelledBy(element);
      const jslogId = getArtifactIdFromJslog(element);
      return labelledId === targetArtifactId || jslogId === targetArtifactId;
    });

  return !!matchingElement;
}

function findNotebookLMDownloadButton() {
  const icons = Array.from(document.querySelectorAll('mat-icon'));
  const downloadIcon = icons.find(icon => /^(save_alt|download)$/i.test(getNormalizedText(icon)));

  if (downloadIcon) {
    return downloadIcon.closest('button, [role="menuitem"], .mat-mdc-menu-item') || downloadIcon;
  }

  return Array.from(document.querySelectorAll('button, [role="menuitem"], .mat-mdc-menu-item'))
    .find(element => /다운로드|download/i.test(getNormalizedText(element)) && !isNotebookLMActionDisabled(element)) || null;
}

function findNotebookLMMoreOptionsButton() {
  const icons = Array.from(document.querySelectorAll('mat-icon'));
  const moreIcon = icons.find(icon => /^(more_vert|more_horiz)$/i.test(getNormalizedText(icon)));

  if (moreIcon) {
    return moreIcon.closest('button, [role="button"]') || moreIcon;
  }

  return Array.from(document.querySelectorAll('button, [role="button"]'))
    .find(element => /더보기|more options|more actions/i.test(
      `${element.getAttribute('aria-label') || ''} ${element.getAttribute('title') || ''} ${getNormalizedText(element)}`
    )) || null;
}

function buildNotebookLMSermonPrompt(book, chapter) {
  return `A male pastor is preaching to the children in a male voice, focusing on a specific chapter. The specific chapter is ${book} Chapter ${chapter}.`;
}

function findNotebookLMPromptTextarea() {
  const textareas = Array.from(document.querySelectorAll('textarea'))
    .filter(textarea => isVisible(textarea) && !textarea.disabled && textarea.getAttribute('aria-disabled') !== 'true');

  const scored = textareas
    .map((textarea) => {
      const label = textarea.getAttribute('aria-label') || '';
      const placeholder = textarea.getAttribute('placeholder') || '';
      const containerText = getNormalizedText(textarea.closest('mat-form-field, .mat-mdc-form-field, mat-dialog-content, [role="dialog"]') || textarea);
      const combined = `${label} ${placeholder} ${containerText}`;
      let score = 0;

      if (/만들려는\s*슬라이드\s*자료에\s*대한\s*설명|description.*slide|slides.*description/i.test(combined)) score += 120;
      if (/간략한\s*개요|청중|스타일|강조할\s*점|audience|style|emphasis|overview/i.test(combined)) score += 80;
      if (/집중|focus/i.test(combined)) score += 40;
      if (textarea.closest('mat-dialog-content, .mat-mdc-dialog-content, [role="dialog"]')) score += 20;
      if (textarea.value && /pastor|chapter|설교/i.test(textarea.value)) score += 10;

      return { textarea, score };
    })
    .sort((a, b) => b.score - a.score);

  return (scored[0] && scored[0].score > 0 ? scored[0].textarea : null) ||
    document.querySelector('mat-dialog-content textarea, .mat-mdc-dialog-content textarea');
}

function setNativeTextareaValue(textarea, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
  if (setter) {
    setter.call(textarea, value);
  } else {
    textarea.value = value;
  }

  textarea.focus();
  textarea.dispatchEvent(new InputEvent('input', {
    bubbles: true,
    composed: true,
    inputType: 'insertText',
    data: value
  }));
  textarea.dispatchEvent(new Event('change', { bubbles: true }));
}

function isNotebookLMPromptInserted(book, chapter) {
  const promptArea = findNotebookLMPromptTextarea();
  const promptVal = buildNotebookLMSermonPrompt(book, chapter);
  return !!(promptArea && promptArea.value === promptVal);
}

function isNotebookLMStartUrl() {
  return location.href.split(/[?#]/)[0] === NOTEBOOKLM_URL;
}

function findVideoOverviewEditButton() {
  const banner = Array.from(document.querySelectorAll('.create-artifact-button-container'))
    .find(el => {
      const label = el.getAttribute('aria-label') || '';
      return label === '동영상 개요' || el.textContent.includes('동영상 개요');
    });

  if (!banner) return null;

  const icon = banner.querySelector('.edit-icon, mat-icon');
  if (icon) {
    return icon.closest('button') || icon.closest('.option-icon') || icon;
  }

  return banner.querySelector('button');
}

function isNotebookLMStartScreenReady() {
  return !!findVideoOverviewEditButton() || getVideoOverviewArtifactCandidates().length > 0;
}

function reloadNotebookLMStartScreen(state, nextStep, reason) {
  const stepAfterReload = nextStep || 'wait_start_screen_loaded';
  state.step = stepAfterReload;
  state.startScreenReloadRequestedAt = Date.now();
  state.startScreenReloadReason = reason || '';
  chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
    console.log(`[AI Pastor] Reloading NotebookLM start screen: ${reason || stepAfterReload}`);
    if (isNotebookLMStartUrl()) {
      location.reload();
    } else {
      location.replace(NOTEBOOKLM_URL);
    }
  });
}

function getNextBibleTarget(bookId, chapter) {
  const currentBookIndex = NOTEBOOKLM_BIBLE_BOOKS.findIndex(book => book.id === bookId);
  const safeBookIndex = currentBookIndex >= 0 ? currentBookIndex : 0;
  const currentBook = NOTEBOOKLM_BIBLE_BOOKS[safeBookIndex];
  const currentChapter = Number(chapter) || 1;

  if (currentChapter < currentBook.chapters) {
    return {
      book: currentBook.id,
      chapter: currentChapter + 1,
      done: false
    };
  }

  const nextBook = NOTEBOOKLM_BIBLE_BOOKS[safeBookIndex + 1];
  if (!nextBook) {
    return {
      book: currentBook.id,
      chapter: currentChapter,
      done: true
    };
  }

  return {
    book: nextBook.id,
    chapter: 1,
    done: false
  };
}

function resetNotebookLMRunFields(state) {
  [
    'languageSelectCandidateIndex',
    'languageVerifyTicks',
    'languageDropdownOpenedAt',
    'styleClickAttempts',
    'promptInsertedAt',
    'promptVerifyTicks',
    'generateClickedAt',
    'generationStartTime',
    'sawGeneratingVideoOverview',
    'lastGeneratingArtifactSeenAt',
    'artifactOpenedAt',
    'targetArtifactId',
    'moreMenuOpenedAt',
    'downloadClickRequestedAt',
    'downloadWatchStartedAt',
    'downloadStartedAt',
    'downloadCompletedAt',
    'downloadedFileName',
    'advanceStartedAt',
    'startScreenReloadRequestedAt',
    'startScreenReloadReason',
    'lastGenerationStartScreenRefreshAt'
  ].forEach(key => delete state[key]);
}

function closeNotebookLMViewerIfOpen() {
  const closeButton = Array.from(document.querySelectorAll('button, [role="button"]'))
    .find(button => {
      const label = `${button.getAttribute('aria-label') || ''} ${button.getAttribute('title') || ''} ${getNormalizedText(button)}`;
      const iconText = getNormalizedText(button.querySelector && button.querySelector('mat-icon'));
      return /닫기|close/i.test(label) || /^(close|arrow_back)$/i.test(iconText);
    });

  if (closeButton && isVisible(closeButton)) {
    simulateSingleClick(closeButton);
    return true;
  }

  closeMaterialOverlay();
  return false;
}

function advanceToNextSermonTarget(state) {
  const previousBook = state.book;
  const previousChapter = state.chapter;
  const downloadedFileName = state.downloadedFileName;
  const nextTarget = getNextBibleTarget(previousBook, previousChapter);

  state.generatedCount = (state.generatedCount || 0) + 1;
  state.lastCompletedBook = previousBook;
  state.lastCompletedChapter = previousChapter;
  state.lastDownloadedFileName = downloadedFileName || state.lastDownloadedFileName || '';
  state.lastDownloadedAt = Date.now();

  resetNotebookLMRunFields(state);

  if (nextTarget.done) {
    state.status = 'completed';
    state.step = 'all_done';
    state.book = nextTarget.book;
    state.chapter = nextTarget.chapter;
    return state;
  }

  state.status = 'running';
  state.step = 'reload_start_screen';
  state.book = nextTarget.book;
  state.chapter = nextTarget.chapter;
  state.advanceStartedAt = Date.now();
  return state;
}

function checkAndExecuteNotebookLM() {
  try {
    chrome.storage.local.get(['ai_pastor_sermon_state'], (result) => {
      const state = result.ai_pastor_sermon_state;
      if (!state || state.status !== 'running') {
        return;
      }

      const book = state.book || '';
      const chapter = state.chapter || 1;
      const currentStep = state.step || 'init';

      logStep(`NotebookLM [${currentStep}] - ${book} ${chapter}장`);

      switch (currentStep) {
		        case 'init':
	          if (findVisibleElement('artifact-viewer')) {
	            console.log('[AI Pastor] Artifact viewer is open. Closing it before starting a new chapter.');
	            closeNotebookLMViewerIfOpen();
	            return;
	          }

	          // 1단계: chevron_forward mat-icon 버튼 클릭 (배너 열기)
	          // "동영상 개요" (aria-label="동영상 개요") 배너 내부의 chevron_forward 또는 edit-icon 클릭
	          const editBtn = findVideoOverviewEditButton();

          if (editBtn) {
            console.log('[AI Pastor] "Video Overview" (동영상 개요) edit button found. Clicking...');
            simulateClick(editBtn);
            state.step = 'select_language';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          } else {
            console.log('[AI Pastor] Video Overview edit button not found. Retrying...');
          }
          break;

        case 'select_language': {
          // 2단계: 언어선택 English/영어 mat-select
          const selectedEnglish = findEnglishSelectedLanguageCandidate();
          if (selectedEnglish) {
            console.log('[AI Pastor] Language is already English/영어. Transition to select_style.');
            delete state.languageSelectCandidateIndex;
            delete state.languageVerifyTicks;
            delete state.languageDropdownOpenedAt;
            state.step = 'select_style';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          const englishOption = findEnglishLanguageOption();
          if (englishOption) {
            console.log('[AI Pastor] English/영어 option found in open dropdown. Clicking...');
            simulateClick(englishOption);
            delete state.languageSelectCandidateIndex;
            delete state.languageDropdownOpenedAt;
            state.languageVerifyTicks = 0;
            state.step = 'wait_language_selected';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          if (state.languageDropdownOpenedAt && Date.now() - state.languageDropdownOpenedAt < 3500) {
            console.log('[AI Pastor] Waiting for language dropdown options to render...');
            return;
          }

          const candidates = getLanguageSelectCandidates();
          if (candidates.length === 0) {
            console.log('[AI Pastor] Language select element not found. Waiting for dialog controls...');
            return;
          }

          const candidateIndex = state.languageSelectCandidateIndex || 0;
          const candidate = candidates[candidateIndex % candidates.length];

          console.log(`[AI Pastor] Opening language dropdown candidate ${candidateIndex % candidates.length + 1}/${candidates.length}: ${getElementDebugLabel(candidate.trigger)}`);
          closeMaterialOverlay();
          simulateClick(candidate.trigger);
          state.languageSelectCandidateIndex = (candidateIndex + 1) % candidates.length;
          state.languageDropdownOpenedAt = Date.now();
          chrome.storage.local.set({ ai_pastor_sermon_state: state });
          break;

        }

        case 'wait_language_selected': {
          const selectedEnglish = findEnglishSelectedLanguageCandidate();
          if (selectedEnglish) {
            console.log('[AI Pastor] English/영어 language selection verified. Transition to select_style.');
            delete state.languageSelectCandidateIndex;
            delete state.languageVerifyTicks;
            delete state.languageDropdownOpenedAt;
            state.step = 'select_style';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          const englishOption = findEnglishLanguageOption();
          if (englishOption) {
            console.log('[AI Pastor] English/영어 option still visible. Clicking again...');
            simulateClick(englishOption);
            state.languageVerifyTicks = (state.languageVerifyTicks || 0) + 1;
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          if ((state.languageVerifyTicks || 0) < 4) {
            state.languageVerifyTicks = (state.languageVerifyTicks || 0) + 1;
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          } else {
            console.log('[AI Pastor] Language selection was not reflected. Retrying language dropdown search.');
            state.languageVerifyTicks = 0;
            state.step = 'select_language';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          }
          break;
        }

        case 'select_style':
          // 3단계: 시각적 스타일 귀여움(kawaii_new.png) 이미지 캐러셀 선택
          const kawaiiStyle = findKawaiiStyleOption();
          
          if (kawaiiStyle) {
            // 이미 체크되어 있다면 다음 단계(input_prompt)로 이동
            if (isMaterialRadioChecked(kawaiiStyle.radioButton)) {
              console.log('[AI Pastor] Kawaii style is checked. Transition to input_prompt.');
              delete state.styleClickAttempts;
              state.step = 'input_prompt';
              chrome.storage.local.set({ ai_pastor_sermon_state: state });
              return;
            }

            console.log('[AI Pastor] Kawaii style banner found. Clicking carousel banner content...');
            simulateSingleClick(kawaiiStyle.banner, { exactTarget: true });
            state.styleClickAttempts = (state.styleClickAttempts || 0) + 1;
            state.step = 'wait_style_selected';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          } else {
            console.log('[AI Pastor] Kawaii style item not found in carousel. Retrying...');
          }
          break;

        case 'wait_style_selected': {
          const kawaiiStyle = findKawaiiStyleOption();

          if (kawaiiStyle && isMaterialRadioChecked(kawaiiStyle.radioButton)) {
            console.log('[AI Pastor] Kawaii style selection verified. Transition to input_prompt.');
            delete state.styleClickAttempts;
            state.step = 'input_prompt';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          if (kawaiiStyle && (state.styleClickAttempts || 0) < 3) {
            console.log('[AI Pastor] Kawaii style is not checked yet. Clicking carousel banner again...');
            simulateSingleClick(kawaiiStyle.banner, { exactTarget: true });
            state.styleClickAttempts = (state.styleClickAttempts || 0) + 1;
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          } else {
            console.log('[AI Pastor] Kawaii style selection did not verify. Returning to select_style.');
            state.styleClickAttempts = 0;
            state.step = 'select_style';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
          }
          break;
        }

	        case 'input_prompt':
	          // 4단계: 프롬프트 입력창에 영어 문구 주입
	          const promptArea = findNotebookLMPromptTextarea();

	          if (promptArea) {
	            const promptVal = buildNotebookLMSermonPrompt(book, chapter);
	            
	            // 프롬프트 값이 이미 올바르게 들어가 있다면 검증 단계로 이동
	            if (promptArea.value === promptVal) {
	              console.log('[AI Pastor] Prompt matches target values. Verifying before generate.');
	              state.step = 'wait_prompt_inserted';
	              chrome.storage.local.set({ ai_pastor_sermon_state: state });
	              return;
	            }

	            console.log(`[AI Pastor] Injecting prompt: ${promptVal}`);
	            setNativeTextareaValue(promptArea, promptVal);
	            state.step = 'wait_prompt_inserted';
	            state.promptInsertedAt = Date.now();
	            state.promptVerifyTicks = 0;
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	          } else {
	            console.log('[AI Pastor] Prompt input textarea not found.');
	          }
	          break;

	        case 'wait_prompt_inserted': {
	          const promptArea = findNotebookLMPromptTextarea();
	          const promptVal = buildNotebookLMSermonPrompt(book, chapter);

	          if (promptArea && promptArea.value === promptVal) {
	            console.log('[AI Pastor] Prompt insertion verified. Transition to click_generate.');
	            delete state.promptVerifyTicks;
	            state.step = 'click_generate';
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          if (promptArea && (state.promptVerifyTicks || 0) < 5) {
	            console.log('[AI Pastor] Prompt value not reflected yet. Injecting again before generate.');
	            setNativeTextareaValue(promptArea, promptVal);
	            state.promptVerifyTicks = (state.promptVerifyTicks || 0) + 1;
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          console.log('[AI Pastor] Prompt verification failed. Returning to input_prompt.');
	          state.promptVerifyTicks = 0;
	          state.step = 'input_prompt';
	          chrome.storage.local.set({ ai_pastor_sermon_state: state });
	          break;
	        }

	        case 'click_generate':
	          // 5단계: 생성 버튼 클릭
	          if (!isNotebookLMPromptInserted(book, chapter)) {
	            console.log('[AI Pastor] Generate blocked because prompt is not inserted. Returning to input_prompt.');
	            state.step = 'input_prompt';
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          const actionsContainer = document.querySelector('mat-dialog-actions, .mat-mdc-dialog-actions');
          let generateBtn = null;

          if (actionsContainer) {
            generateBtn = Array.from(actionsContainer.querySelectorAll('button'))
              .find(b => b.textContent.includes('생성') || b.textContent.includes('Generate'));
          }

          if (!generateBtn) {
            generateBtn = Array.from(document.querySelectorAll('button'))
              .find(b => 
                (b.textContent.includes('생성') || b.textContent.includes('Generate')) && 
                (b.classList.contains('button-color--primary') || b.classList.contains('mdc-button--unelevated'))
              );
          }

          if (generateBtn && !isNotebookLMActionDisabled(generateBtn)) {
            if (state.generateClickedAt && Date.now() - state.generateClickedAt < 120000) {
              console.log('[AI Pastor] Generate was already clicked. Waiting for generation instead of clicking again.');
              state.step = 'wait_generation';
              chrome.storage.local.set({ ai_pastor_sermon_state: state });
              return;
            }

            console.log('[AI Pastor] Clicking "Generate" (생성) button once.');
            state.step = 'wait_generation';
            state.generationStartTime = Date.now();
            state.generateClickedAt = Date.now();
            chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
              simulateSingleClick(generateBtn);
            });
          } else {
            console.log('[AI Pastor] Generate button not found or disabled.');
          }
          break;

	        case 'wait_generation':
	          // 6단계: 생성 완료 대기
	          const generatingArtifact = findGeneratingVideoOverviewArtifactCandidate();
	          const generationStartedAt = state.generationStartTime || Date.now();
	          const elapsedSinceGenerate = Date.now() - generationStartedAt;
	          const completedArtifactButton = (state.sawGeneratingVideoOverview || elapsedSinceGenerate > 30000)
	            ? findCompletedVideoOverviewButton()
	            : null;
	          const lastRefreshAt = state.lastGenerationStartScreenRefreshAt || generationStartedAt;

	          if (generatingArtifact) {
	            const elapsed = Math.round((Date.now() - generationStartedAt) / 1000);
	            state.sawGeneratingVideoOverview = true;
	            state.lastGeneratingArtifactSeenAt = Date.now();
	            if (Date.now() - lastRefreshAt >= NOTEBOOKLM_GENERATION_REFRESH_MS) {
	              state.lastGenerationStartScreenRefreshAt = Date.now();
	              reloadNotebookLMStartScreen(state, 'wait_generation', '생성 중 상태 1분 주기 확인');
	              return;
	            }
	            console.log(`[AI Pastor] Top video overview is still generating... (Elapsed: ${elapsed}s)`);
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	          } else if (completedArtifactButton) {
            console.log('[AI Pastor] Newly generated top video overview is complete. Opening it.');
            delete state.sawGeneratingVideoOverview;
            delete state.lastGeneratingArtifactSeenAt;
            state.targetArtifactId = getArtifactIdFromLabelledBy(completedArtifactButton) || getArtifactIdFromJslog(completedArtifactButton);
            state.step = 'wait_artifact_opened';
            state.artifactOpenedAt = Date.now();
            chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
              simulateSingleClick(completedArtifactButton);
	            });
	          } else {
	            const elapsed = Math.round((Date.now() - generationStartedAt) / 1000);
	            if (Date.now() - lastRefreshAt >= NOTEBOOKLM_GENERATION_REFRESH_MS) {
	              state.lastGenerationStartScreenRefreshAt = Date.now();
	              reloadNotebookLMStartScreen(state, 'wait_generation', '생성 완료 감지 재시도');
	              return;
	            }
	            if (state.sawGeneratingVideoOverview) {
	              console.log(`[AI Pastor] Waiting for the new video overview artifact to become clickable... (Elapsed: ${elapsed}s)`);
	            } else {
              console.log(`[AI Pastor] Waiting for the new top loading video overview artifact... (Elapsed: ${elapsed}s)`);
            }
          }
          break;

	        case 'wait_artifact_opened': {
	          if (!isTargetArtifactViewerOpen(state.targetArtifactId)) {
	            if (state.artifactOpenedAt && Date.now() - state.artifactOpenedAt > NOTEBOOKLM_GENERATION_REFRESH_MS) {
	              console.log('[AI Pastor] Generated artifact viewer is stuck. Reloading start screen and checking the completed artifact again.');
	              state.step = 'wait_generation';
	              state.lastGenerationStartScreenRefreshAt = Date.now();
	              reloadNotebookLMStartScreen(state, 'wait_generation', '완료 영상 뷰어 무한 로딩 복구');
	              return;
	            }

	            if (state.artifactOpenedAt && Date.now() - state.artifactOpenedAt > 10000) {
	              const completedArtifactButton = findCompletedVideoOverviewButton();
	              if (completedArtifactButton) {
                console.log('[AI Pastor] Target artifact viewer is not open yet. Clicking completed artifact again.');
                state.targetArtifactId = getArtifactIdFromLabelledBy(completedArtifactButton) || getArtifactIdFromJslog(completedArtifactButton) || state.targetArtifactId;
                state.artifactOpenedAt = Date.now();
                chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
                  simulateSingleClick(completedArtifactButton);
                });
                return;
              }
            }

            console.log('[AI Pastor] Waiting for the newly generated artifact viewer, ignoring existing video download button...');
            break;
          }

          const downloadButton = findNotebookLMDownloadButton();

          if (downloadButton) {
            console.log('[AI Pastor] Generated video opened and download button is visible.');
            delete state.artifactOpenedAt;
            delete state.targetArtifactId;
            state.step = 'click_download';
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          const moreButton = findNotebookLMMoreOptionsButton();
          if (moreButton && !state.moreMenuOpenedAt) {
            console.log('[AI Pastor] Opening generated video options menu.');
            state.moreMenuOpenedAt = Date.now();
            chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
              simulateSingleClick(moreButton);
            });
            return;
          }

          if (state.moreMenuOpenedAt && Date.now() - state.moreMenuOpenedAt > 4000) {
            delete state.moreMenuOpenedAt;
            chrome.storage.local.set({ ai_pastor_sermon_state: state });
            return;
          }

          if (state.artifactOpenedAt && Date.now() - state.artifactOpenedAt > 10000) {
            const completedArtifactButton = findCompletedVideoOverviewButton();
            if (completedArtifactButton) {
              console.log('[AI Pastor] Generated video did not open yet. Clicking completed artifact again.');
              state.artifactOpenedAt = Date.now();
              chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
                simulateSingleClick(completedArtifactButton);
              });
              return;
            }
          }

          console.log('[AI Pastor] Waiting for generated video viewer / download controls...');
          break;
        }

	        case 'click_download':
	          // 다운로드 버튼 클릭
	          const downloadButton = findNotebookLMDownloadButton();

	          if (downloadButton) {
	            if (state.downloadClickRequestedAt && Date.now() - state.downloadClickRequestedAt < 30000) {
	              console.log('[AI Pastor] Download click was already requested. Waiting before advancing.');
	              state.step = 'wait_download_started';
	              chrome.storage.local.set({ ai_pastor_sermon_state: state });
	              return;
	            }

	            console.log('[AI Pastor] Starting download watcher and clicking download button with trusted browser input.');
	            state.step = 'wait_download_started';
	            state.downloadClickRequestedAt = Date.now();
	            state.downloadWatchStartedAt = Date.now();
	            chrome.storage.local.set({ ai_pastor_sermon_state: state }, () => {
	              requestSermonDownloadWatch(book, chapter, (watchResponse) => {
	                if (!watchResponse.ok) {
	                  chrome.storage.local.get(['ai_pastor_sermon_state'], (result) => {
	                    const currentState = result.ai_pastor_sermon_state;
	                    if (!currentState) return;
	                    currentState.status = 'failed';
	                    currentState.error = `다운로드 감시 시작 실패: ${watchResponse.error || 'unknown error'}`;
	                    chrome.storage.local.set({ ai_pastor_sermon_state: currentState });
	                  });
	                  return;
	                }

	                requestTrustedClick(downloadButton, (response) => {
	                  chrome.storage.local.get(['ai_pastor_sermon_state'], (result) => {
	                    const currentState = result.ai_pastor_sermon_state;
	                    if (!currentState) return;

	                    if (response.ok) {
	                      console.log('[AI Pastor] Trusted download click sent. Waiting for Chrome download completion.');
	                      currentState.status = 'running';
	                      currentState.step = 'download_waiting_complete';
	                      currentState.downloadStartedAt = Date.now();
	                      chrome.storage.local.set({ ai_pastor_sermon_state: currentState });
	                    } else {
	                      console.error('[AI Pastor] Trusted download click failed:', response.error);
	                      currentState.status = 'failed';
	                      currentState.error = `다운로드 클릭 실패: ${response.error || 'unknown error'}`;
	                      chrome.storage.local.set({ ai_pastor_sermon_state: currentState });
	                    }
	                  });
	                });
	              });
	            });
          } else {
            // 메뉴를 먼저 열어야 할 수도 있음
            const moreMenuBtn = findNotebookLMMoreOptionsButton();
            if (moreMenuBtn) {
              console.log('[AI Pastor] Opening options menu to locate download button.');
              simulateSingleClick(moreMenuBtn);
            } else {
              console.log('[AI Pastor] Download button not visible. Options menu not found.');
            }
          }
	          break;

	        case 'wait_download_started':
	          if (state.downloadClickRequestedAt && Date.now() - state.downloadClickRequestedAt > 10000) {
	            console.log('[AI Pastor] Download click callback is late. Waiting for Chrome download completion anyway.');
	            state.step = 'download_waiting_complete';
	            state.downloadStartedAt = Date.now();
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          console.log('[AI Pastor] Waiting for trusted download click callback before next chapter...');
	          break;

	        case 'download_waiting_complete':
	          if (state.downloadStartedAt && Date.now() - state.downloadStartedAt > 900000) {
	            state.status = 'failed';
	            state.step = 'failed';
	            state.error = '다운로드 완료 대기 시간이 초과되었습니다.';
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          console.log('[AI Pastor] Waiting for Chrome to finish downloading the generated video...');
	          break;

	        case 'download_completed':
	          console.log(`[AI Pastor] Download completed for ${book} ${chapter}. Advancing to next chapter.`);
	          advanceToNextSermonTarget(state);
	          if (state.status === 'running') {
	            chrome.storage.local.set({
	              ai_pastor_last_selection: { book: state.book, chapter: state.chapter }
	            }, () => {
	              reloadNotebookLMStartScreen(state, 'wait_start_screen_loaded', `다운로드 완료 후 다음 장 시작: ${state.book} ${state.chapter}`);
	            });
	          } else {
	            chrome.storage.local.set({
	              ai_pastor_sermon_state: state,
	              ai_pastor_last_selection: { book: state.book, chapter: state.chapter }
	            });
	          }
	          break;

	        case 'reload_start_screen':
	        case 'advance_chapter':
	          reloadNotebookLMStartScreen(state, 'wait_start_screen_loaded', `다음 장 시작 화면 로드: ${state.book} ${state.chapter}`);
	          break;

	        case 'wait_start_screen_loaded':
	          if (!state.startScreenReloadRequestedAt) {
	            state.startScreenReloadRequestedAt = Date.now();
	            chrome.storage.local.set({ ai_pastor_sermon_state: state });
	            return;
	          }

	          if (document.readyState === 'complete' && isNotebookLMStartScreenReady() && Date.now() - state.startScreenReloadRequestedAt > 2500) {
	            console.log(`[AI Pastor] NotebookLM start screen is ready. Starting prompt flow for ${book} ${chapter}.`);
	            delete state.startScreenReloadRequestedAt;
	            delete state.startScreenReloadReason;
	            state.step = 'init';
	            chrome.storage.local.set({
	              ai_pastor_sermon_state: state,
	              ai_pastor_last_selection: { book: state.book, chapter: state.chapter }
	            });
	            return;
	          }

	          if (Date.now() - state.startScreenReloadRequestedAt > NOTEBOOKLM_START_LOAD_TIMEOUT_MS) {
	            console.log('[AI Pastor] Start screen load timed out. Reloading NotebookLM again.');
	            reloadNotebookLMStartScreen(state, 'wait_start_screen_loaded', '시작 화면 로딩 타임아웃 재시도');
	            return;
	          }

	          console.log('[AI Pastor] Waiting for NotebookLM start screen to finish loading...');
	          break;

		      }
    });
  } catch (err) {
    if (err.message && err.message.includes('Extension context invalidated')) {
      console.log('[AI Pastor] Extension context invalidated. Cleaning NotebookLM loop.');
      if (notebookLMInterval) {
        clearInterval(notebookLMInterval);
        notebookLMInterval = null;
      }
    } else {
      console.error('[AI Pastor] Error in NotebookLM automation:', err);
    }
  }
}

// --- Initialize DOM/Interval Hook ---
if (location.hostname === 'notebooklm.google.com') {
  console.log('[AI Pastor] NotebookLM domain detected. Starting automation monitor.');
  if (notebookLMInterval) {
    clearInterval(notebookLMInterval);
  }
  notebookLMInterval = setInterval(checkAndExecuteNotebookLM, 2000);
}
