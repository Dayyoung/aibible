// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const characterBtn = document.getElementById("character-btn");
  const screenBtn = document.getElementById("screen-btn");
  const stopBtn = document.getElementById("stop-btn");
  const imageFolderInput = document.getElementById("image-folder-input");
  const folderSelectBtn = document.getElementById("folder-select-btn");
  const imageFolderLabel = document.getElementById("image-folder-label");
  const statusDesc = document.getElementById("status-desc");
  const statusCounter = document.getElementById("status-counter");
  const progressIndicator = document.getElementById("progress-indicator");

  function setStorageLocal(items) {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, resolve);
    });
  }

  function getStorageLocal(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, resolve);
    });
  }

  function updateUI() {
    chrome.storage.local.get(
      ["active_state", "current_count", "total_count", "pipeline_status"],
      (data) => {
        const activeState = data.active_state || "stopped";
        const currentCount = data.current_count || 0;
        const totalCount = data.total_count || 0;
        const pipelineStatus = data.pipeline_status || "대기 중...";

        statusDesc.innerText = pipelineStatus;

        if (activeState === "running") {
          characterBtn.disabled = true;
          screenBtn.disabled = true;
          stopBtn.style.display = "block";
          statusCounter.innerText = `진행도: ${currentCount} / ${totalCount}`;
          progressIndicator.style.width = `${totalCount > 0 ? (currentCount / totalCount) * 100 : 0}%`;
        } else {
          characterBtn.disabled = false;
          screenBtn.disabled = false;
          stopBtn.style.display = "none";
          statusCounter.innerText = `진행도: ${currentCount} / ${totalCount}`;
          progressIndicator.style.width = `${totalCount > 0 ? (currentCount / totalCount) * 100 : 0}%`;
        }
      }
    );
  }

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  async function ensureContentScriptInjected(tabId) {
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
    } catch (e) {
      console.log("Content script not loaded. Injecting programmatically...");
      await new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content_bible.js"]
        }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      });
      await sleep(250);
    }
  }

  // Trigger character generation
  characterBtn.addEventListener("click", async () => {
    let targetTab = null;
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const activeTab = tabs.find(t => t.active);
    if (activeTab && activeTab.url && (activeTab.url.includes("localhost:8888") || activeTab.url.includes("bibleforai.com"))) {
      targetTab = activeTab;
    } else {
      targetTab = tabs.find(t => t.url && (t.url.includes("localhost:8888") || t.url.includes("bibleforai.com")));
    }

    if (!targetTab || !targetTab.id) {
      await setStorageLocal({
        active_state: "stopped",
        pipeline_status: "성경 읽기 페이지(localhost:8888 등)를 찾을 수 없습니다."
      });
      updateUI();
      return;
    }

    try {
      await setStorageLocal({ pipeline_status: "성경 연결성 확인 중..." });
      updateUI();
      await ensureContentScriptInjected(targetTab.id);
    } catch (err) {
      await setStorageLocal({
        active_state: "stopped",
        pipeline_status: `스크립트 주입 실패: ${err.message}`
      });
      updateUI();
      return;
    }

    await setStorageLocal({ pipeline_status: "성경 본문에서 등장인물 추출 중..." });
    updateUI();

    chrome.tabs.sendMessage(targetTab.id, { action: "extract_characters" }, async (response) => {
      if (chrome.runtime.lastError || !response || !response.ok) {
        const errMsg = response && response.error
          ? `등장인물 추출 실패: ${response.error}`
          : "등장인물 추출 실패: 성경 페이지에서 실행 중인지 확인하세요.";
        await setStorageLocal({
          active_state: "stopped",
          pipeline_status: errMsg
        });
        updateUI();
        return;
      }

      const { characters, bookTitle, chapterNum } = response;
      if (!characters || !characters.length) {
        await setStorageLocal({
          active_state: "stopped",
          pipeline_status: "성경 본문에서 추출된 등장인물이 없습니다."
        });
        updateUI();
        return;
      }

      let characterDb = {};
      try {
        const res = await fetch("character_prompts.json");
        characterDb = await res.json();
      } catch (err) {
        console.warn("Failed to load character_prompts.json", err);
      }

      // Build character prompts
      const prompts = characters.map((name) => {
        const cleanName = name.replace(/^character_/i, "").trim();
        const desc = characterDb[cleanName];
        const basePrompt = desc ? `Biblical figure ${cleanName} (${desc})` : `Biblical figure ${cleanName}`;
        return {
          type: "character",
          characterName: name,
          imagePrompt: `${basePrompt}, Chibi bible 2D Style. --no text`,
          bookTitle,
          chapterNum
        };
      });

      await setStorageLocal({
        active_state: "running",
        current_count: 0,
        total_count: prompts.length,
        pipeline_status: `${characters.length}명의 인물 감지됨. Flow로 이동 중...`,
        generation_mode: "character",
        bible_prompts: prompts,
        current_book: bookTitle,
        current_chapter: chapterNum
      });

      updateUI();
      chrome.runtime.sendMessage({ action: "start_bible_pipeline" });
    });
  });

  // Trigger screen (verse) generation
  screenBtn.addEventListener("click", async () => {
    let targetTab = null;
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const activeTab = tabs.find(t => t.active);
    if (activeTab && activeTab.url && (activeTab.url.includes("localhost:8888") || activeTab.url.includes("bibleforai.com"))) {
      targetTab = activeTab;
    } else {
      targetTab = tabs.find(t => t.url && (t.url.includes("localhost:8888") || t.url.includes("bibleforai.com")));
    }

    if (!targetTab || !targetTab.id) {
      await setStorageLocal({
        active_state: "stopped",
        pipeline_status: "성경 읽기 페이지(localhost:8888 등)를 찾을 수 없습니다."
      });
      updateUI();
      return;
    }

    try {
      await setStorageLocal({ pipeline_status: "성경 연결성 확인 중..." });
      updateUI();
      await ensureContentScriptInjected(targetTab.id);
    } catch (err) {
      await setStorageLocal({
        active_state: "stopped",
        pipeline_status: `스크립트 주입 실패: ${err.message}`
      });
      updateUI();
      return;
    }

    await setStorageLocal({ pipeline_status: "성경 본문에서 구절 추출 중..." });
    updateUI();

    chrome.tabs.sendMessage(targetTab.id, { action: "extract_screens" }, async (response) => {
      if (chrome.runtime.lastError || !response || !response.ok) {
        const errMsg = response && response.error
          ? `구절 추출 실패: ${response.error}`
          : "구절 추출 실패: 성경 페이지에서 실행 중인지 확인하세요.";
        await setStorageLocal({
          active_state: "stopped",
          pipeline_status: errMsg
        });
        updateUI();
        return;
      }

      const { info } = response;
      const { bookTitle, chapterNum, screens } = info;
      if (!screens || !screens.length) {
        await setStorageLocal({
          active_state: "stopped",
          pipeline_status: "성경 본문에서 추출된 구절이 없습니다."
        });
        updateUI();
        return;
      }

      let characterDb = {};
      try {
        const res = await fetch("character_prompts.json");
        characterDb = await res.json();
      } catch (err) {
        console.warn("Failed to load character_prompts.json", err);
      }

      // Build screen prompts
      const prompts = screens.map((screen) => {
        const characterNames = Array.isArray(screen.characters) ? screen.characters : [];
        const descParts = [];
        characterNames.forEach((name) => {
          const cleanName = name.replace(/^character_/i, "").trim();
          const desc = characterDb[cleanName];
          if (desc) {
            descParts.push(`${cleanName}: ${desc}`);
          }
        });

        let promptText = screen.text;
        if (descParts.length > 0) {
          promptText += `, ${descParts.join(", ")}`;
        }

        return {
          type: "screen",
          verseNumber: screen.verseNumber,
          verseText: screen.text,
          characterNames,
          imagePrompt: `${promptText}, Chibi bible 2D Style. --no text`,
          bookTitle,
          chapterNum
        };
      });

      await setStorageLocal({
        active_state: "running",
        current_count: 0,
        total_count: prompts.length,
        pipeline_status: `${screens.length}개 구절 감지됨. Flow로 이동 중...`,
        generation_mode: "screen",
        bible_prompts: prompts,
        current_book: bookTitle,
        current_chapter: chapterNum
      });

      updateUI();
      chrome.runtime.sendMessage({ action: "start_bible_pipeline" });
    });
  });

  // Stop pipeline
  stopBtn.addEventListener("click", async () => {
    await setStorageLocal({
      active_state: "stopped",
      current_count: 0,
      total_count: 0,
      pipeline_status: "대기 중...",
      bible_prompts: [],
      generation_mode: null,
      current_book: null,
      current_chapter: null
    });
    updateUI();
    chrome.runtime.sendMessage({ action: "stop_bible_pipeline" });
  });

  // Handle folder upload for manual files mapping
  folderSelectBtn.addEventListener("click", () => {
    imageFolderInput.value = "";
    imageFolderInput.click();
  });

  imageFolderInput.addEventListener("change", async () => {
    const files = Array.from(imageFolderInput.files || []);
    const imageFiles = files.filter(f => f.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(f.name));
    
    if (!imageFiles.length) {
      imageFolderLabel.innerText = "선택된 폴더에 이미지가 없습니다.";
      return;
    }

    imageFolderLabel.innerText = `${imageFiles.length}개 이미지 읽는 중...`;
    
    // Read and cache files
    const characterCache = {};
    for (const file of imageFiles) {
      try {
        const fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

        // Try to match file name as character name
        // e.g. "character_Joseph.png" or "Joseph.png"
        const nameMatch = file.name.match(/(?:character_)?([A-Za-z0-9\s_\-]+)\.(?:png|jpe?g|webp)/i);
        if (nameMatch) {
          const characterName = nameMatch[1].trim();
          characterCache[characterName] = fileContent;
        }
      } catch (err) {
        console.error("Failed to read file", file.name, err);
      }
    }

    const currentCached = await getStorageLocal("character_images_cache");
    const mergedCache = { ...currentCached.character_images_cache, ...characterCache };
    await setStorageLocal({ character_images_cache: mergedCache });

    imageFolderLabel.innerText = `로컬 이미지 캐시 완료 (${Object.keys(mergedCache).length}개 인물 등록됨)`;
  });

  updateUI();
  const pollInterval = setInterval(updateUI, 1000);

  window.addEventListener("unload", () => {
    clearInterval(pollInterval);
  });
});
