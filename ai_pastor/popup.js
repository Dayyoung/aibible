document.addEventListener('DOMContentLoaded', () => {
  // --- Tab Switch Elements ---
  const tabBtnScript = document.getElementById('tab-btn-script');
  const tabBtnSermon = document.getElementById('tab-btn-sermon');
  const scriptTab = document.getElementById('script-tab');
  const sermonTab = document.getElementById('sermon-tab');

  // --- Tab 1 Elements (Script Splitter) ---
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const textInput = document.getElementById('text-input');
  const avatarSelect = document.getElementById('avatar-select');
  const avatarIdInput = document.getElementById('avatar-id-input');
  const promptInput = document.getElementById('prompt-input');
  const statusText = document.getElementById('status-text');
  const progressText = document.getElementById('progress-text');
  const progressIndicator = document.getElementById('progress-indicator');
  const sentencesList = document.getElementById('sentences-list');
  const btnStart = document.getElementById('btn-start');
  const btnReset = document.getElementById('btn-reset');

  // --- Tab 2 Elements (Sermon Generator) ---
  const sermonBookSelect = document.getElementById('sermon-book-select');
  const sermonChapterSelect = document.getElementById('sermon-chapter-select');
  const sermonStatusText = document.getElementById('sermon-status-text');
  const sermonProgressRow = document.getElementById('sermon-progress-row');
  const sermonProgressText = document.getElementById('sermon-progress-text');
  const btnSermonStart = document.getElementById('btn-sermon-start');
  const btnSermonReset = document.getElementById('btn-sermon-reset');
  const btnManualMerge = document.getElementById('btn-manual-merge');
  const manualVideoInput = document.getElementById('manual-video-input');

  // --- Bible 66 Books Metadata ---
  const BIBLE_BOOKS = [
    { id: "Genesis", name: "창세기", chapters: 50 },
    { id: "Exodus", name: "출애굽기", chapters: 40 },
    { id: "Leviticus", name: "레위기", chapters: 27 },
    { id: "Numbers", name: "민수기", chapters: 36 },
    { id: "Deuteronomy", name: "신명기", chapters: 34 },
    { id: "Joshua", name: "여호수아", chapters: 24 },
    { id: "Judges", name: "사사기", chapters: 21 },
    { id: "Ruth", name: "룻기", chapters: 4 },
    { id: "1Samuel", name: "사무엘상", chapters: 31 },
    { id: "2Samuel", name: "사무엘하", chapters: 24 },
    { id: "1Kings", name: "열왕기상", chapters: 22 },
    { id: "2Kings", name: "열왕기하", chapters: 25 },
    { id: "1Chronicles", name: "역대기상", chapters: 29 },
    { id: "2Chronicles", name: "역대기하", chapters: 36 },
    { id: "Ezra", name: "에스라", chapters: 10 },
    { id: "Nehemiah", name: "느헤미야", chapters: 13 },
    { id: "Esther", name: "에스더", chapters: 10 },
    { id: "Job", name: "욥기", chapters: 42 },
    { id: "Psalms", name: "시편", chapters: 150 },
    { id: "Proverbs", name: "잠언", chapters: 31 },
    { id: "Ecclesiastes", name: "전도서", chapters: 12 },
    { id: "SongofSolomon", name: "아가", chapters: 8 },
    { id: "Isaiah", name: "이사야", chapters: 66 },
    { id: "Jeremiah", name: "예레미야", chapters: 52 },
    { id: "Lamentations", name: "예레미야 애가", chapters: 5 },
    { id: "Ezekiel", name: "에스겔", chapters: 48 },
    { id: "Daniel", name: "다니엘", chapters: 12 },
    { id: "Hosea", name: "호세아", chapters: 14 },
    { id: "Joel", name: "요엘", chapters: 3 },
    { id: "Amos", name: "아모스", chapters: 9 },
    { id: "Obadiah", name: "오바디야", chapters: 1 },
    { id: "Jonah", name: "요나", chapters: 4 },
    { id: "Micah", name: "미가", chapters: 7 },
    { id: "Nahum", name: "나훔", chapters: 3 },
    { id: "Habakkuk", name: "하박국", chapters: 3 },
    { id: "Zephaniah", name: "스바냐", chapters: 3 },
    { id: "Haggai", name: "학개", chapters: 2 },
    { id: "Zechariah", name: "스가랴", chapters: 14 },
    { id: "Malachi", name: "말라기", chapters: 4 },
    { id: "Matthew", name: "마태복음", chapters: 28 },
    { id: "Mark", name: "마가복음", chapters: 16 },
    { id: "Luke", name: "누가복음", chapters: 24 },
    { id: "John", name: "요한복음", chapters: 21 },
    { id: "Acts", name: "사도행전", chapters: 28 },
    { id: "Romans", name: "로마서", chapters: 16 },
    { id: "1Corinthians", name: "고린도전서", chapters: 16 },
    { id: "2Corinthians", name: "고린도후서", chapters: 13 },
    { id: "Galatians", name: "갈라디아서", chapters: 6 },
    { id: "Ephesians", name: "에베소서", chapters: 6 },
    { id: "Philippians", name: "빌립보서", chapters: 4 },
    { id: "Colossians", name: "골로새서", chapters: 4 },
    { id: "1Thessalonians", name: "데살로니가전서", chapters: 5 },
    { id: "2Thessalonians", name: "데살로니가후서", chapters: 3 },
    { id: "1Timothy", name: "디모데전서", chapters: 6 },
    { id: "2Timothy", name: "디모데후서", chapters: 4 },
    { id: "Titus", name: "디도서", chapters: 3 },
    { id: "Philemon", name: "빌레몬서", chapters: 1 },
    { id: "Hebrews", name: "히브리서", chapters: 13 },
    { id: "James", name: "야고보서", chapters: 5 },
    { id: "1Peter", name: "베드로전서", chapters: 5 },
    { id: "2Peter", name: "베드로후서", chapters: 3 },
    { id: "1John", name: "요한일서", chapters: 5 },
    { id: "2John", name: "요한이서", chapters: 1 },
    { id: "3John", name: "요한삼서", chapters: 1 },
    { id: "Jude", name: "유다서", chapters: 1 },
    { id: "Revelation", name: "요한계시록", chapters: 22 }
  ];

  // --- Initialize Sermon Tab UI ---
  function initSermonForm() {
    sermonBookSelect.innerHTML = '';
    BIBLE_BOOKS.forEach(book => {
      const opt = document.createElement('option');
      opt.value = book.id;
      opt.textContent = `${book.name} (${book.id})`;
      sermonBookSelect.appendChild(opt);
    });

    sermonBookSelect.addEventListener('change', () => {
      populateChapters(sermonBookSelect.value);
      saveLastSelection();
    });

    sermonChapterSelect.addEventListener('change', () => {
      saveLastSelection();
    });

    // Default: Genesis
    populateChapters(BIBLE_BOOKS[0].id);
  }

  function saveLastSelection() {
    const book = sermonBookSelect.value;
    const chapter = parseInt(sermonChapterSelect.value, 10);
    chrome.storage.local.set({
      ai_pastor_last_selection: { book, chapter }
    });
  }

  function populateChapters(bookId) {
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    sermonChapterSelect.innerHTML = '';
    if (!book) return;

    for (let i = 1; i <= book.chapters; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${i}장`;
      sermonChapterSelect.appendChild(opt);
    }
  }

  initSermonForm();

  // --- Tab Switch Logic ---
  const tabButtons = [tabBtnScript, tabBtnSermon];
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'script-tab') {
        scriptTab.style.display = 'flex';
        sermonTab.style.display = 'none';
      } else {
        scriptTab.style.display = 'none';
        sermonTab.style.display = 'flex';
      }
    });
  });

  // --- Tab 1 State Variables & Logic ---
  let sentences = [];
  let currentIndex = 0;
  let automationStatus = 'idle';
  let step = 'init';
  let sourceText = '';
  let selectedAvatar = {
    mode: 'id',
    id: 'actor30',
    name: 'Benjamin',
    category: '3D 만화'
  };
  let promptText = '';
  let avatarSetupDone = false;
  let manualMergePollTimer = null;

  // Load Tab 1 and Tab 2 State from local storage
  chrome.storage.local.get(['ai_minister_state', 'ai_pastor_sermon_state', 'ai_pastor_last_selection'], (result) => {
    // Tab 1 state loading
    if (result.ai_minister_state) {
      const state = result.ai_minister_state;
      sentences = state.sentences || [];
      currentIndex = state.currentIndex || 0;
      automationStatus = state.status || 'idle';
      step = state.step || 'init';
      sourceText = state.sourceText || '';
      selectedAvatar = normalizeAvatar(state.selectedAvatar);
      promptText = state.promptText || '';
      avatarSetupDone = !!state.avatarSetupDone;
      textInput.value = sourceText;
      promptInput.value = promptText;
      hydrateAvatarControls();
      updateUI();
    }

    // Tab 2 (Sermon) last selection restore
    if (result.ai_pastor_last_selection) {
      const lastSel = result.ai_pastor_last_selection;
      sermonBookSelect.value = lastSel.book;
      populateChapters(lastSel.book);
      sermonChapterSelect.value = lastSel.chapter;
    }

    // Tab 2 (Sermon) state loading
    if (result.ai_pastor_sermon_state) {
      updateSermonUI(result.ai_pastor_sermon_state);
      if (result.ai_pastor_sermon_state.status === 'manual_merging' && result.ai_pastor_sermon_state.jobId) {
        pollManualMergeJob(result.ai_pastor_sermon_state);
      }
    }
  });

  // Listen to Storage Changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
      if (changes.ai_minister_state) {
        const state = changes.ai_minister_state.newValue;
        if (state) {
          sentences = state.sentences || [];
          currentIndex = state.currentIndex || 0;
          automationStatus = state.status || 'idle';
          step = state.step || 'init';
          sourceText = state.sourceText !== undefined ? state.sourceText : sourceText;
          selectedAvatar = normalizeAvatar(state.selectedAvatar);
          promptText = state.promptText || '';
          avatarSetupDone = !!state.avatarSetupDone;
          if (document.activeElement !== textInput) textInput.value = sourceText;
          if (document.activeElement !== promptInput) promptInput.value = promptText;
          if (document.activeElement !== avatarSelect && document.activeElement !== avatarIdInput) {
            hydrateAvatarControls();
          }
          updateUI();
        }
      }
      if (changes.ai_pastor_sermon_state) {
        updateSermonUI(changes.ai_pastor_sermon_state.newValue);
      }
      if (changes.ai_pastor_last_selection && changes.ai_pastor_last_selection.newValue) {
        const nextSelection = changes.ai_pastor_last_selection.newValue;
        if (nextSelection.book && sermonBookSelect.value !== nextSelection.book) {
          sermonBookSelect.value = nextSelection.book;
          populateChapters(nextSelection.book);
        }
        if (nextSelection.chapter) {
          sermonChapterSelect.value = String(nextSelection.chapter);
        }
      }
    }
  });

  // Tab 1 (Script splitter) File events
  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--primary)';
    dropZone.style.background = 'rgba(99, 102, 241, 0.1)';
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border)';
    dropZone.style.background = 'var(--card-bg)';
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border)';
    dropZone.style.background = 'var(--card-bg)';
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });
  textInput.addEventListener('input', () => {
    const text = textInput.value;
    sourceText = text;
    if (text.trim().length > 0) {
      processText(text);
    } else {
      sentences = [];
      currentIndex = 0;
      automationStatus = 'idle';
      step = 'init';
      avatarSetupDone = false;
      saveState();
      updateUI();
    }
  });
  avatarSelect.addEventListener('change', () => {
    selectedAvatar = readAvatarControls();
    hydrateAvatarControls();
    saveState();
  });
  avatarIdInput.addEventListener('input', () => {
    selectedAvatar = readAvatarControls();
    saveState();
  });
  promptInput.addEventListener('input', () => {
    promptText = promptInput.value;
    saveState();
  });

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      textInput.value = text;
      processText(text);
    };
    reader.readAsText(file);
  }

  function processText(text) {
    sentences = text
      .split(/(?<=[.!?])\s+|\n+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    currentIndex = 0;
    automationStatus = 'idle';
    step = 'init';
    avatarSetupDone = false;
    sourceText = text;
    saveState();
    updateUI();
  }

  function saveState() {
    selectedAvatar = readAvatarControls();
    promptText = promptInput.value;
    chrome.storage.local.set({
      ai_minister_state: {
        status: automationStatus,
        sentences: sentences,
        currentIndex: currentIndex,
        step: step,
        sourceText: sourceText,
        selectedAvatar: selectedAvatar,
        promptText: promptText,
        avatarSetupDone: avatarSetupDone
      }
    });
  }

  function normalizeAvatar(avatar) {
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

  function hydrateAvatarControls() {
    if (selectedAvatar.mode === 'first') {
      avatarSelect.value = 'first';
      avatarIdInput.value = '';
      avatarIdInput.disabled = true;
      return;
    }
    if (selectedAvatar.id === 'actor30') {
      avatarSelect.value = 'actor30';
      avatarIdInput.value = 'actor30';
      avatarIdInput.disabled = true;
      return;
    }
    avatarSelect.value = 'custom';
    avatarIdInput.disabled = false;
    avatarIdInput.value = selectedAvatar.id || '';
  }

  function readAvatarControls() {
    const selected = avatarSelect.value;
    if (selected === 'first') {
      return { mode: 'first', id: '', name: '첫 번째 보이는 아바타', category: '' };
    }
    if (selected === 'custom') {
      return { mode: 'id', id: avatarIdInput.value.trim(), name: avatarIdInput.value.trim(), category: '' };
    }
    return { mode: 'id', id: 'actor30', name: 'Benjamin', category: '3D 만화' };
  }

  function updateUI() {
    if (automationStatus === 'idle') {
      statusText.textContent = '대기 중';
      statusText.style.color = 'var(--text-sub)';
      btnStart.textContent = '비디오 생성 시작';
      btnStart.disabled = sentences.length === 0;
      btnReset.disabled = sentences.length === 0;
    } else if (automationStatus === 'running') {
      statusText.textContent = '자동화 진행 중';
      statusText.style.color = 'var(--accent)';
      btnStart.textContent = '일시정지';
      btnStart.disabled = false;
      btnReset.disabled = false;
    } else if (automationStatus === 'paused') {
      statusText.textContent = '일시정지됨';
      statusText.style.color = 'var(--danger)';
      btnStart.textContent = '이어하기';
      btnStart.disabled = false;
      btnReset.disabled = false;
    } else if (automationStatus === 'completed') {
      statusText.textContent = '생성 완료!';
      statusText.style.color = 'var(--accent)';
      btnStart.textContent = '완료됨';
      btnStart.disabled = true;
      btnReset.disabled = false;
    }

    const total = sentences.length;
    const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;
    progressText.textContent = `${currentIndex} / ${total} 문장 (${progress}%)`;
    progressIndicator.style.width = `${progress}%`;

    sentencesList.innerHTML = '';
    if (total === 0) {
      sentencesList.innerHTML = `<div style="text-align: center; color: var(--text-sub); margin-top: 50px; font-size: 12px;">로딩된 문장이 없습니다.</div>`;
      return;
    }

    sentences.forEach((sentence, index) => {
      const item = document.createElement('div');
      item.className = 'sentence-item';
      if (index === currentIndex && automationStatus !== 'completed') {
        item.classList.add('active');
      } else if (index < currentIndex || automationStatus === 'completed') {
        item.classList.add('completed');
      }

      const textSpan = document.createElement('span');
      textSpan.className = 'sentence-text';
      textSpan.textContent = sentence;

      const badge = document.createElement('span');
      badge.className = 'sentence-badge';
      if (index < currentIndex || automationStatus === 'completed') {
        badge.textContent = '완료';
      } else if (index === currentIndex && automationStatus !== 'completed') {
        badge.textContent = '진행중';
      } else {
        badge.textContent = `대기 [${index + 1}]`;
      }

      item.appendChild(textSpan);
      item.appendChild(badge);
      sentencesList.appendChild(item);
      if (index === currentIndex && automationStatus !== 'completed') {
        setTimeout(() => {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  }

  btnStart.addEventListener('click', () => {
    if (automationStatus === 'idle' || automationStatus === 'paused') {
      const wasIdle = automationStatus === 'idle';
      const wasPaused = automationStatus === 'paused';
      automationStatus = 'running';
      if (wasIdle || !step) {
        step = 'init';
        avatarSetupDone = false;
      } else if (wasPaused) {
        step = 'input_text';
      }
      saveState();
      updateUI();
      chrome.runtime.sendMessage({ action: 'START_AUTOMATION' });
    } else if (automationStatus === 'running') {
      automationStatus = 'paused';
      saveState();
      updateUI();
      chrome.runtime.sendMessage({ action: 'PAUSE_AUTOMATION' });
    }
  });

  btnReset.addEventListener('click', () => {
    automationStatus = 'idle';
    sentences = [];
    currentIndex = 0;
    step = 'init';
    sourceText = '';
    promptText = '';
    avatarSetupDone = false;
    textInput.value = '';
    promptInput.value = '';
    fileInput.value = '';
    selectedAvatar = normalizeAvatar();
    hydrateAvatarControls();
    saveState();
    updateUI();
    chrome.runtime.sendMessage({ action: 'RESET_AUTOMATION' });
  });

  // --- Tab 2 (Sermon Generation) Control & Logic ---
  btnSermonStart.addEventListener('click', () => {
    const book = sermonBookSelect.value;
    const chapter = parseInt(sermonChapterSelect.value, 10);

    const sermonState = {
      status: 'running',
      book: book,
      chapter: chapter,
      step: 'init',
      generatedCount: 0,
      startedAt: Date.now()
    };

    chrome.storage.local.set({ ai_pastor_sermon_state: sermonState }, () => {
      // 1. Open NotebookLM target workspace tab
      chrome.tabs.create({
        url: "https://notebooklm.google.com/notebook/ecd77ff6-d7f6-49fe-9493-84abb1d9a39c"
      });
      updateSermonUI(sermonState);
    });
  });

  btnSermonReset.addEventListener('click', () => {
    chrome.storage.local.set({ ai_pastor_sermon_state: null }, () => {
      console.log('[AI Pastor] Sermon automation state reset.');
      chrome.storage.local.remove('ai_pastor_download_watch');
      chrome.runtime.sendMessage({ action: 'clear_sermon_download_watch' });
      updateSermonUI(null);
    });
  });

  btnManualMerge.addEventListener('click', () => {
    manualVideoInput.value = '';
    manualVideoInput.click();
  });

  manualVideoInput.addEventListener('change', () => {
    const files = Array.from(manualVideoInput.files || []);
    if (files.length === 0) return;
    startManualMerge(files);
  });

  function startManualMerge(files) {
    const inferredSelection = inferBibleSelectionFromFileName(files[0].name);
    if (inferredSelection.book && BIBLE_BOOKS.some(book => book.id === inferredSelection.book)) {
      sermonBookSelect.value = inferredSelection.book;
      populateChapters(inferredSelection.book);
    }

    if (inferredSelection.chapter && sermonChapterSelect.querySelector(`option[value="${inferredSelection.chapter}"]`)) {
      sermonChapterSelect.value = String(inferredSelection.chapter);
      saveLastSelection();
    }

    const book = sermonBookSelect.value;
    const chapter = inferredSelection.chapter || parseInt(sermonChapterSelect.value, 10);
    const manualState = {
      status: 'manual_merging',
      book,
      chapter,
      step: 'uploading',
      fileName: files.length === 1 ? files[0].name : `${files[0].name} 외 ${files.length - 1}개`,
      fileCount: files.length
    };

    chrome.storage.local.set({ ai_pastor_sermon_state: manualState }, () => {
      updateSermonUI(manualState);
    });

    const query = new URLSearchParams({
      book,
      chapter: String(chapter),
      filename: files[0].name,
      count: String(files.length)
    });

    readFilesAsBase64(files)
      .then(encodedFiles => fetch(`http://localhost:8888/api/manual_merge_video?${query.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files: encodedFiles })
      }))
      .then(res => res.json())
      .then(data => {
        if (!data.success || !data.jobId) {
          throw new Error(data.error || '수동 병합 작업 생성 실패');
        }

        const nextState = {
          ...manualState,
          status: 'manual_merging',
          step: 'processing',
          jobId: data.jobId
        };
        chrome.storage.local.set({ ai_pastor_sermon_state: nextState }, () => {
          updateSermonUI(nextState);
          pollManualMergeJob(nextState);
        });
      })
      .catch(err => {
        const failedState = {
          ...manualState,
          status: 'failed',
          step: 'failed',
          error: `수동 병합 서버 통신 오류: ${err.message}`
        };
        chrome.storage.local.set({ ai_pastor_sermon_state: failedState }, () => {
          updateSermonUI(failedState);
        });
      });
  }

  function readFilesAsBase64(files) {
    return Promise.all(files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result || '');
          const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
          const inferred = inferBibleSelectionFromFileName(file.name);
          resolve({
            name: file.name,
            type: file.type || 'video/mp4',
            index,
            book: inferred.book || sermonBookSelect.value,
            chapter: inferred.chapter || parseInt(sermonChapterSelect.value, 10),
            data: base64
          });
        };
        reader.onerror = () => reject(reader.error || new Error(`파일 읽기 실패: ${file.name}`));
        reader.readAsDataURL(file);
      });
    }));
  }

  function inferBibleSelectionFromFileName(fileName) {
    const normalized = String(fileName || '').toLowerCase();
    const sortedBooks = [...BIBLE_BOOKS].sort((a, b) => b.id.length - a.id.length);

    for (const bookMeta of sortedBooks) {
      const aliases = [
        bookMeta.id,
        bookMeta.id.replace(/([0-9])([A-Z])/g, '$1 $2'),
        bookMeta.name
      ]
        .map(alias => String(alias).toLowerCase().replace(/[^a-z0-9가-힣]/g, ''))
        .filter(Boolean);

      const compactName = normalized.replace(/[^a-z0-9가-힣]/g, '');

      for (const alias of aliases) {
        const aliasIndex = compactName.indexOf(alias);
        if (aliasIndex === -1) continue;

        const afterAlias = compactName.slice(aliasIndex + alias.length);
        const chapterMatch = afterAlias.match(/^(\d{1,3})/);
        if (!chapterMatch) continue;

        const chapter = Number(chapterMatch[1]);
        if (Number.isInteger(chapter) && chapter >= 1 && chapter <= bookMeta.chapters) {
          return { book: bookMeta.id, chapter };
        }
      }
    }

    const fallbackChapter = normalized.match(/(?:chapter|ch)[^0-9]{0,8}(\d{1,3})/i);
    if (fallbackChapter) {
      const chapter = Number(fallbackChapter[1]);
      if (Number.isInteger(chapter) && chapter > 0 && chapter < 200) {
        return { book: '', chapter };
      }
    }

    return { book: '', chapter: null };
  }

  function pollManualMergeJob(state) {
    if (!state || !state.jobId) return;
    if (manualMergePollTimer) clearTimeout(manualMergePollTimer);

    fetch(`http://localhost:8888/api/manual_merge_status?job_id=${encodeURIComponent(state.jobId)}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success || !data.job) {
          throw new Error(data.error || '수동 병합 상태 확인 실패');
        }

        const job = data.job;
        const nextState = {
          ...state,
          status: job.status === 'completed' ? 'completed' : (job.status === 'failed' ? 'failed' : 'manual_merging'),
          step: job.status,
          error: job.error || '',
          message: job.message || state.message || '',
          currentFile: job.currentFile || '',
          currentIndex: job.currentIndex || state.currentIndex || 0,
          total: job.total || state.total || state.fileCount || 1,
          completedCount: job.completedCount || 0,
          outputPath: job.outputPath || state.outputPath,
          outputPaths: job.outputPaths || state.outputPaths || [],
          plannedOutputPaths: job.plannedOutputPaths || state.plannedOutputPaths || []
        };

        chrome.storage.local.set({ ai_pastor_sermon_state: nextState }, () => {
          updateSermonUI(nextState);
          if (nextState.status === 'manual_merging') {
            manualMergePollTimer = setTimeout(() => pollManualMergeJob(nextState), 2000);
          }
        });
      })
      .catch(err => {
        const failedState = {
          ...state,
          status: 'failed',
          step: 'failed',
          error: `수동 병합 상태 확인 오류: ${err.message}`
        };
        chrome.storage.local.set({ ai_pastor_sermon_state: failedState }, () => {
          updateSermonUI(failedState);
        });
      });
  }

  function updateSermonUI(state) {
    if (!state || state.status === 'idle') {
      sermonStatusText.textContent = '대기 중';
      sermonStatusText.style.color = 'var(--text-sub)';
      sermonProgressRow.style.display = 'none';
      btnSermonStart.disabled = false;
      btnManualMerge.disabled = false;
      btnSermonStart.textContent = '설교 비디오 연속 생성 시작';
      btnSermonReset.disabled = true;
      return;
    }

    btnSermonReset.disabled = false;
    btnManualMerge.disabled = false;

    if (state.status === 'running') {
      sermonStatusText.textContent = '자동화 진행 중';
      sermonStatusText.style.color = 'var(--accent)';
      sermonProgressRow.style.display = 'flex';
      const generated = state.generatedCount || 0;
      const lastDone = state.lastCompletedBook ? ` 최근 완료: ${state.lastCompletedBook} ${state.lastCompletedChapter}장.` : '';
      const stepLabels = {
        wait_generation: '생성 완료 대기',
        wait_artifact_opened: '완료 영상 열기',
        wait_prompt_inserted: '프롬프트 입력 확인',
        download_waiting_complete: '다운로드 완료 대기',
        download_completed: '다운로드 완료',
        reload_start_screen: '시작 화면 새로고침',
        wait_start_screen_loaded: '시작 화면 로딩 대기',
        advance_chapter: '다음 장 준비'
      };
      const stepLabel = stepLabels[state.step] || state.step || 'init';
      sermonProgressText.textContent = `연속 생성 중: ${state.book} ${state.chapter}장 [단계: ${stepLabel}] 완료 ${generated}개.${lastDone}`;
      btnSermonStart.disabled = true;
      btnManualMerge.disabled = true;
      btnSermonStart.textContent = '진행 중...';
    } else if (state.status === 'downloading') {
      sermonStatusText.textContent = '다운로드 대기 중';
      sermonStatusText.style.color = 'var(--accent)';
      sermonProgressRow.style.display = 'flex';
      sermonProgressText.textContent = `비디오 생성 완료. 로컬 저장 대기 중...`;
      btnSermonStart.disabled = true;
      btnManualMerge.disabled = true;
    } else if (state.status === 'merging') {
      sermonStatusText.textContent = '영상 병합 진행 중';
      sermonStatusText.style.color = 'var(--primary)';
      sermonProgressRow.style.display = 'flex';
      sermonProgressText.textContent = `로컬 백엔드 서버에서 AI_Pastor_intro.mp4 와 병합 처리 중...`;
      btnSermonStart.disabled = true;
      btnManualMerge.disabled = true;
    } else if (state.status === 'manual_merging') {
      sermonStatusText.textContent = '수동 병합 진행 중';
      sermonStatusText.style.color = 'var(--primary)';
      sermonProgressRow.style.display = 'flex';
      const total = state.total || state.fileCount || 1;
      const completed = state.completedCount || 0;
      const currentFile = state.currentFile ? ` 현재: ${state.currentFile}` : '';
      const progressLabel = total > 1 ? ` (${completed}/${total}개 완료)` : '';
      sermonProgressText.textContent = `${state.fileName || '선택한 파일'} 업로드 후 각 파일 앞에 AI_Pastor_intro.mp4 를 붙이는 중...${progressLabel}${currentFile}`;
      btnSermonStart.disabled = true;
      btnManualMerge.disabled = true;
    } else if (state.status === 'completed') {
      sermonStatusText.textContent = '최종 생성 완료!';
      sermonStatusText.style.color = 'var(--accent)';
      sermonProgressRow.style.display = 'flex';
      if (state.outputPaths && state.outputPaths.length > 1) {
        sermonProgressText.textContent = `수동 병합 완료: ${state.outputPaths.length}개 파일이 각각 intro와 병합되어 Downloads 에 저장되었습니다.`;
      } else if (state.step === 'all_done') {
        sermonProgressText.textContent = `연속 생성 완료: ${state.generatedCount || 0}개 장 다운로드가 끝났습니다.`;
      } else {
        sermonProgressText.textContent = `병합 완료: AI_Pastor_${state.book}_${state.chapter}.mp4 가 Downloads 에 저장되었습니다.`;
      }
      btnSermonStart.disabled = false;
      btnManualMerge.disabled = false;
      btnSermonStart.textContent = '설교 비디오 연속 생성 시작';
    } else if (state.status === 'failed') {
      sermonStatusText.textContent = '에러 발생';
      sermonStatusText.style.color = 'var(--danger)';
      sermonProgressRow.style.display = 'flex';
      sermonProgressText.textContent = `오류: ${state.error || '알 수 없는 오류'}`;
      btnSermonStart.disabled = false;
      btnManualMerge.disabled = false;
      btnSermonStart.textContent = '설교 비디오 연속 생성 재시도';
    }
  }
});
