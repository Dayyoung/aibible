document.addEventListener('DOMContentLoaded', () => {
  // State Management
  let manifestData = [];
  let storybookData = {};
  
  let currentBookId = 'Genesis';
  let currentChapter = 1;
  let currentChapterPages = [];
  let pageIndex = 0; // 0 means Book Cover Mode, 1..N means story pages

  let isReadingTTS = false;
  let isAutoplay = false;
  let ttsUtterance = null;

  const themes = ['theme-cream', 'theme-pink', 'theme-blue', 'theme-night'];
  let currentThemeIndex = 0;

  const fontSizes = [
    { label: '보통', size: '22px' },
    { label: '크게', size: '26px' },
    { label: '아주크게', size: '30px' }
  ];
  let currentFontSizeIndex = 0;

  // DOM Elements
  const bookSpread = document.getElementById('book-spread');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  const btnToc = document.getElementById('btn-toc');
  const tocModal = document.getElementById('toc-modal');
  const btnCloseToc = document.getElementById('btn-close-toc');
  const tabOt = document.getElementById('tab-ot');
  const tabNt = document.getElementById('tab-nt');
  const booksGrid = document.getElementById('books-grid');
  const tocContent = document.getElementById('toc-content');

  const btnTts = document.getElementById('btn-tts');
  const ttsLabel = document.getElementById('tts-label');
  const ttsIcon = document.getElementById('tts-icon');
  
  const btnAutoplay = document.getElementById('btn-autoplay');
  const autoplayLabel = document.getElementById('autoplay-label');

  const btnFontSize = document.getElementById('btn-font-size');
  const fontSizeLabel = document.getElementById('font-size-label');

  const btnTheme = document.getElementById('btn-theme');
  const btnBookmark = document.getElementById('btn-bookmark');
  const logoBtn = document.getElementById('logo-btn');

  // Load Storybook Data
  async function initData() {
    try {
      const [manifestRes, dataRes] = await Promise.all([
        fetch('data/manifest.json'),
        fetch('data/kidbible_storybook.json')
      ]);

      manifestData = await manifestRes.json();
      storybookData = await dataRes.json();

      // Load Bookmark if exists
      const savedBookmark = localStorage.getItem('kidbible_bookmark');
      if (savedBookmark) {
        try {
          const bm = JSON.parse(savedBookmark);
          currentBookId = bm.bookId || 'Genesis';
          currentChapter = bm.chapter || 1;
          pageIndex = bm.pageIndex || 0;
        } catch (e) {
          pageIndex = 0;
        }
      }

      updateChapterData();
      renderBook();
      renderTocBooks('OT');
    } catch (err) {
      console.error('Failed to load KidBible data:', err);
      bookSpread.innerHTML = `
        <div class="cover-mode">
          <div class="cover-content">
            <h2>⚠️ 데이터를 불러오는데 실패했어요.</h2>
            <p>페이지를 새로고침해 주세요.</p>
          </div>
        </div>
      `;
    }
  }

  function updateChapterData() {
    if (storybookData[currentBookId] && storybookData[currentBookId].chapters[currentChapter]) {
      currentChapterPages = storybookData[currentBookId].chapters[currentChapter];
    } else {
      currentChapterPages = [];
    }
  }

  function isDesktopView() {
    return window.innerWidth >= 1024;
  }

  // Render Storybook Pages
  function renderBook() {
    stopTTS();

    // 1) Cover Page Mode (pageIndex === 0)
    if (pageIndex === 0) {
      bookSpread.innerHTML = `
        <div class="cover-mode">
          <div class="cover-content">
            <img src="assets/cover.jpg" alt="어린이 성경 동화책 표지" class="cover-img">
            <h2 class="cover-title">어린이 성경 동화책</h2>
            <p class="cover-subtitle">하나님의 만드심부터 사랑의 이야기까지</p>
            <button class="btn-icon active" id="btn-start-reading" style="font-size:22px; padding: 12px 30px; margin-top: 10px;">
              ✨ 이야기 시작하기
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-start-reading').addEventListener('click', () => {
        pageIndex = 1;
        renderBook();
      });

      saveBookmark();
      return;
    }

    const currentBookInfo = manifestData.find(b => b.id === currentBookId) || { name: '성경', icon: '📖' };
    const totalPages = currentChapterPages.length;

    // Desktop Spread (2 Pages side by side) vs Mobile (1 Page)
    if (isDesktopView()) {
      // Ensure pageIndex is aligned to odd/even pair if needed, or 2 pages
      const p1Index = pageIndex;
      const p2Index = pageIndex + 1;

      const page1 = currentChapterPages[p1Index - 1];
      const page2 = p2Index <= totalPages ? currentChapterPages[p2Index - 1] : null;

      bookSpread.innerHTML = `
        <!-- Left Page -->
        <div class="page page-left">
          ${renderPageContent(currentBookInfo, page1, p1Index, totalPages)}
        </div>
        
        <!-- Right Page -->
        <div class="page page-right">
          ${page2 ? renderPageContent(currentBookInfo, page2, p2Index, totalPages) : renderEmptyPage(currentBookInfo)}
        </div>
      `;
    } else {
      // Mobile Single Page
      const page1 = currentChapterPages[pageIndex - 1];
      bookSpread.innerHTML = `
        <div class="page page-left">
          ${renderPageContent(currentBookInfo, page1, pageIndex, totalPages)}
        </div>
      `;
    }

    saveBookmark();
  }

  function renderPageContent(bookInfo, pageData, pNum, totalPages) {
    if (!pageData) return renderEmptyPage(bookInfo);

    const versesHtml = pageData.verses.map(v => `
      <div class="verse-block" data-verse="${v.verse}">
        <span class="verse-num">${v.verse}절</span>
        <span>${v.text}</span>
      </div>
    `).join('');

    return `
      <div class="page-header-info">
        <span>${bookInfo.icon} ${bookInfo.name} ${currentChapter}장</span>
        <span>${pNum} / ${totalPages} 페이지</span>
      </div>
      <div class="story-content">
        ${versesHtml}
      </div>
      <div class="page-footer">
        <span>어린이 성경 이야기</span>
        <span>📖 KidBible</span>
      </div>
    `;
  }

  function renderEmptyPage(bookInfo) {
    return `
      <div class="page-header-info">
        <span>${bookInfo.icon} ${bookInfo.name} ${currentChapter}장</span>
        <span>끝</span>
      </div>
      <div class="story-content" style="align-items:center; text-align:center;">
        <p style="font-size: 26px; color: var(--primary-color);">🌟 이 장의 이야기가 끝났어요!</p>
        <p style="font-size: 20px; color: var(--text-sub);">다음 버튼을 누르면 다음 이야기로 넘어가요.</p>
      </div>
      <div class="page-footer">
        <span>어린이 성경 이야기</span>
        <span>📖 KidBible</span>
      </div>
    `;
  }

  // Navigation Logic
  function nextPage() {
    const totalPages = currentChapterPages.length;
    const step = isDesktopView() ? 2 : 1;

    if (pageIndex === 0) {
      pageIndex = 1;
    } else if (pageIndex + step <= totalPages) {
      pageIndex += step;
    } else {
      // Go to next Chapter
      const bookInfo = manifestData.find(b => b.id === currentBookId);
      if (currentChapter < bookInfo.available_chapters) {
        currentChapter++;
        pageIndex = 1;
        updateChapterData();
      } else {
        // Go to next Book
        const bIdx = manifestData.findIndex(b => b.id === currentBookId);
        if (bIdx < manifestData.length - 1) {
          currentBookId = manifestData[bIdx + 1].id;
          currentChapter = 1;
          pageIndex = 1;
          updateChapterData();
        }
      }
    }
    renderBook();
  }

  function prevPage() {
    const step = isDesktopView() ? 2 : 1;

    if (pageIndex > 1) {
      pageIndex = Math.max(1, pageIndex - step);
    } else if (pageIndex === 1) {
      pageIndex = 0; // Go to cover
    } else if (pageIndex === 0) {
      // Go to previous chapter end page if possible
      if (currentChapter > 1) {
        currentChapter--;
        updateChapterData();
        pageIndex = Math.max(1, currentChapterPages.length - (step - 1));
      }
    }
    renderBook();
  }

  btnNext.addEventListener('click', nextPage);
  btnPrev.addEventListener('click', prevPage);

  // Table of Contents (TOC) Modal Logic
  btnToc.addEventListener('click', () => {
    tocModal.classList.add('open');
  });

  btnCloseToc.addEventListener('click', () => {
    tocModal.classList.remove('open');
  });

  logoBtn.addEventListener('click', () => {
    pageIndex = 0;
    renderBook();
  });

  tabOt.addEventListener('click', () => {
    tabOt.classList.add('active');
    tabNt.classList.remove('active');
    renderTocBooks('OT');
  });

  tabNt.addEventListener('click', () => {
    tabNt.classList.add('active');
    tabOt.classList.remove('active');
    renderTocBooks('NT');
  });

  function renderTocBooks(testament) {
    const books = manifestData.filter(b => b.testament === testament);
    booksGrid.innerHTML = books.map(b => `
      <div class="book-card" data-id="${b.id}">
        <span class="book-card-icon">${b.icon}</span>
        <span class="book-card-name">${b.name}</span>
        <span class="book-card-count">${b.available_chapters}개 이야기</span>
      </div>
    `).join('');

    document.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('click', () => {
        const bId = card.getAttribute('data-id');
        openChapterPicker(bId);
      });
    });
  }

  function openChapterPicker(bId) {
    const bookInfo = manifestData.find(b => b.id === bId);
    let chaptersHtml = '';
    for (let c = 1; c <= bookInfo.available_chapters; c++) {
      chaptersHtml += `<button class="chapter-btn" data-chapter="${c}">${c}장</button>`;
    }

    tocContent.innerHTML = `
      <div class="chapter-picker">
        <div class="chapter-picker-header">
          <button class="btn-back" id="btn-toc-back">❮ 성경 목록으로</button>
          <h3 style="font-size:24px; color:var(--primary-color);">${bookInfo.icon} ${bookInfo.name} 이야기 선택</h3>
        </div>
        <div class="chapters-grid">
          ${chaptersHtml}
        </div>
      </div>
    `;

    document.getElementById('btn-toc-back').addEventListener('click', () => {
      tocContent.innerHTML = `<div class="books-grid" id="books-grid"></div>`;
      const currentTab = tabOt.classList.contains('active') ? 'OT' : 'NT';
      booksGrid = document.getElementById('books-grid');
      renderTocBooks(currentTab);
    });

    document.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentBookId = bId;
        currentChapter = parseInt(btn.getAttribute('data-chapter'));
        pageIndex = 1;
        updateChapterData();
        renderBook();
        tocModal.classList.remove('open');
      });
    });
  }

  // TTS (Text to Speech) Reading Feature
  function toggleTTS() {
    if (isReadingTTS) {
      stopTTS();
    } else {
      startTTS();
    }
  }

  function startTTS() {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 들려주기를 지원하지 않아요.');
      return;
    }

    stopTTS();

    const storyContentEl = document.querySelector('.story-content');
    if (!storyContentEl) return;

    const textToRead = storyContentEl.textContent.trim();
    if (!textToRead) return;

    ttsUtterance = new SpeechSynthesisUtterance(textToRead);
    ttsUtterance.lang = 'ko-KR';
    ttsUtterance.rate = 0.9; // Slightly slower for kids

    ttsUtterance.onstart = () => {
      isReadingTTS = true;
      btnTts.classList.add('active');
      ttsLabel.textContent = '읽는 중...';
      ttsIcon.textContent = '🔊';
    };

    ttsUtterance.onend = () => {
      stopTTS();
      if (isAutoplay) {
        setTimeout(() => {
          nextPage();
          startTTS();
        }, 1200);
      }
    };

    ttsUtterance.onerror = () => {
      stopTTS();
    };

    window.speechSynthesis.speak(ttsUtterance);
  }

  function stopTTS() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isReadingTTS = false;
    btnTts.classList.remove('active');
    ttsLabel.textContent = '읽어주기';
    ttsIcon.textContent = '🎧';
  }

  btnTts.addEventListener('click', toggleTTS);

  // Autoplay toggle
  btnAutoplay.addEventListener('click', () => {
    isAutoplay = !isAutoplay;
    if (isAutoplay) {
      btnAutoplay.classList.add('active');
      autoplayLabel.textContent = '자동넘김 켬';
      if (!isReadingTTS) startTTS();
    } else {
      btnAutoplay.classList.remove('active');
      autoplayLabel.textContent = '자동넘김 끔';
    }
  });

  // Font Size Toggle
  btnFontSize.addEventListener('click', () => {
    currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizes.length;
    const fontObj = fontSizes[currentFontSizeIndex];
    document.documentElement.style.setProperty('--base-font-size', fontObj.size);
    fontSizeLabel.textContent = fontObj.label;
  });

  // Theme Toggle
  btnTheme.addEventListener('click', () => {
    document.body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.classList.add(themes[currentThemeIndex]);
  });

  // Bookmark Feature
  function saveBookmark() {
    localStorage.setItem('kidbible_bookmark', JSON.stringify({
      bookId: currentBookId,
      chapter: currentChapter,
      pageIndex: pageIndex
    }));
  }

  btnBookmark.addEventListener('click', () => {
    const savedBookmark = localStorage.getItem('kidbible_bookmark');
    if (savedBookmark) {
      const bm = JSON.parse(savedBookmark);
      currentBookId = bm.bookId || 'Genesis';
      currentChapter = bm.chapter || 1;
      pageIndex = bm.pageIndex || 0;
      updateChapterData();
      renderBook();
      alert(`🔖 ${manifestData.find(b => b.id === currentBookId)?.name || ''} ${currentChapter}장 마지막 읽던 위치로 이동했어요!`);
    } else {
      alert('아직 저장된 북마크가 없어요.');
    }
  });

  // Handle Window Resize for 1P / 2P Switch
  window.addEventListener('resize', () => {
    renderBook();
  });

  // Keyboard Arrow Key Navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  });

  // Initialize
  initData();
});
