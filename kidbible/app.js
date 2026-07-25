document.addEventListener('DOMContentLoaded', () => {
  // State Management
  let manifestData = [];
  let storybookData = {};
  
  let currentBookId = 'Genesis';
  let currentChapter = 1;
  let currentChapterData = { pages: [] };
  let pageIndex = 0; // 0 = Chapter Cover + Verse 1 Spread Mode

  let isReadingTTS = false;
  let isAutoplay = false;
  let ttsUtterance = null;
  let isAnimating = false;

  // Touch & Mouse Gesture State
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  const themes = ['theme-cream', 'theme-pink', 'theme-blue', 'theme-night'];
  let currentThemeIndex = 0;

  const fontSizes = [
    { label: '보통', size: '28px' },
    { label: '크게', size: '32px' },
    { label: '아주크게', size: '36px' }
  ];
  let currentFontSizeIndex = 0;

  // Smart Keyword Illustration Mapping Engine
  const keywordIllustMap = [
    { keywords: ['빛', '해', '밝은', '반짝', '낮', '하늘', '별'], icon: '✨', title: '빛과 하늘 이야기' },
    { keywords: ['물', '바다', '강', '배', '방주', '물고기', '비', '홍수'], icon: '🌊', title: '신비로운 기적과 바다 이야기' },
    { keywords: ['풀', '나무', '열매', '땅', '동산', '동물', '사자', '양', '꽃'], icon: '🌿', title: '푸른 자연과 생명 이야기' },
    { keywords: ['사랑', '마음', '기쁨', '축복', '예수', '하나님', '아이', '은혜'], icon: '💖', title: '예수님의 사랑 이야기' },
    { keywords: ['왕', '성전', '집', '금', '보물', '지혜', '말씀'], icon: '🏰', title: '지혜로운 성경 이야기' },
    { keywords: ['기도', '찬양', '노래', '감사', '평안', '꿈', '밤'], icon: '🕊️', title: '따스한 별빛과 기도 이야기' }
  ];

  // DOM Elements
  const bookWrapper = document.getElementById('book-wrapper');
  const bookSpread = document.getElementById('book-spread');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  const btnToc = document.getElementById('btn-toc');
  const tocModal = document.getElementById('toc-modal');
  const btnCloseToc = document.getElementById('btn-close-toc');
  const tabOt = document.getElementById('tab-ot');
  const tabNt = document.getElementById('tab-nt');
  let booksGrid = document.getElementById('books-grid');
  const tocContent = document.getElementById('toc-content');

  const btnTts = document.getElementById('btn-tts');
  const ttsLabel = document.getElementById('tts-label');
  const ttsIcon = document.getElementById('tts-icon');
  
  const btnAutoplay = document.getElementById('btn-autoplay');
  const autoplayLabel = document.getElementById('autoplay-label');

  const btnBgIllust = document.getElementById('btn-bg-illust');
  const bgIllustLabel = document.getElementById('bg-illust-label');

  const btnFontSize = document.getElementById('btn-font-size');
  const fontSizeLabel = document.getElementById('font-size-label');

  const btnTheme = document.getElementById('btn-theme');
  const btnBookmark = document.getElementById('btn-bookmark');
  const logoBtn = document.getElementById('logo-btn');

  // Load Data
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
      initTouchAndGestureEvents();
    } catch (err) {
      console.error('Failed to load KidBible data:', err);
      bookSpread.innerHTML = `
        <div class="chapter-cover-mode">
          <div class="chapter-cover-card">
            <h2>⚠️ 데이터를 불러오는데 실패했어요.</h2>
            <p>페이지를 새로고침해 주세요.</p>
          </div>
        </div>
      `;
    }
  }

  function updateChapterData() {
    if (storybookData[currentBookId] && storybookData[currentBookId].chapters[currentChapter]) {
      currentChapterData = storybookData[currentBookId].chapters[currentChapter];
    } else {
      currentChapterData = { pages: [] };
    }
    applyBackgroundIllustration();
  }

  function isDesktopView() {
    return window.innerWidth >= 1024;
  }

  // 🌟 66 BIBLE BOOKS UNIQUE STORYBOOK ILLUSTRATION ENGINE 🌟
  function applyBackgroundIllustration() {
    const bookInfo = manifestData.find(b => b.id === currentBookId) || { name: '성경', illust: 'assets/cover.jpg' };
    const bookIllustPath = bookInfo.illust || `assets/books/${currentBookId}.jpg`;

    if (bookWrapper) {
      // 66 Book Unique Watercolor Illustration with Safe Fallback!
      bookWrapper.style.backgroundImage = `url('${bookIllustPath}'), url('assets/cover.jpg')`;
    }

    if (bgIllustLabel) {
      bgIllustLabel.textContent = `${bookInfo.name} 동화`;
    }
  }

  function detectVerseIllustration(text) {
    for (const item of keywordIllustMap) {
      if (item.keywords.some(kw => text.includes(kw))) {
        return item;
      }
    }
    return { icon: '✨', title: '사랑스런 성경 이야기' };
  }

  function updateProgressIndicator() {
    const progressText = document.getElementById('progress-text');
    const progressMiniFill = document.getElementById('progress-mini-fill');
    if (!progressText || !progressMiniFill) return;

    const bookData = storybookData[currentBookId];
    if (!bookData || !bookData.chapters) return;

    // 1. Calculate total pages/verses of current Book (e.g. Genesis = 1,533 pages)
    let totalBookVerses = 0;
    const chapterKeys = Object.keys(bookData.chapters).map(Number).sort((a, b) => a - b);
    chapterKeys.forEach(ch => {
      totalBookVerses += (bookData.chapters[ch].pages || []).length;
    });

    if (totalBookVerses === 0) {
      progressText.textContent = '0 / 0 페이지 (0%)';
      progressMiniFill.style.width = '0%';
      return;
    }

    // 2. Calculate cumulative current page up to currentChapter and pageIndex
    let cumulativePage = 0;
    for (const ch of chapterKeys) {
      if (ch < currentChapter) {
        cumulativePage += (bookData.chapters[ch].pages || []).length;
      } else if (ch === currentChapter) {
        const chPages = (bookData.chapters[ch].pages || []).length;
        if (pageIndex === 0) {
          cumulativePage += 0;
        } else if (isDesktopView()) {
          cumulativePage += Math.min(pageIndex + 1, chPages);
        } else {
          cumulativePage += Math.min(pageIndex, chPages);
        }
        break;
      }
    }

    const pct = Math.min(100, Math.round((cumulativePage / totalBookVerses) * 100));
    const currentBookInfo = manifestData.find(b => b.id === currentBookId) || { name: '성경' };

    progressText.textContent = `${currentBookInfo.name} ${cumulativePage.toLocaleString()} / ${totalBookVerses.toLocaleString()} 페이지 (${pct}%)`;
    progressMiniFill.style.width = `${pct}%`;
  }

  // Render Storybook Pages
  function renderBook() {
    stopTTS();
    applyBackgroundIllustration();
    updateProgressIndicator();

    const currentBookInfo = manifestData.find(b => b.id === currentBookId) || { name: '성경', icon: '📖', story: '어린이 성경 이야기' };
    const pagesList = currentChapterData.pages || [];
    const totalPages = pagesList.length;
    const bookIllustPath = currentBookInfo.illust || `assets/books/${currentBookId}.jpg`;

    // 1) CHAPTER START SPREAD MODE (pageIndex === 0)
    if (pageIndex === 0) {
      const page1 = pagesList.length > 0 ? pagesList[0] : null;

      const coverHtml = `
        <div class="chapter-cover-mode">
          <div class="chapter-cover-card">
            <span class="chapter-cover-badge">${currentBookInfo.icon} ${currentBookInfo.name}</span>
            <h2 class="chapter-cover-title">${currentBookInfo.name} ${currentChapter}장 이야기</h2>
            
            <!-- 66 Book Unique Storybook Art Frame -->
            <div style="margin: 6px 0;">
              <img src="${bookIllustPath}" 
                   onerror="this.onerror=null; this.src='assets/cover.jpg';" 
                   alt="${currentBookInfo.name} ${currentChapter}장 동화 일러스트" 
                   class="cover-img">
            </div>

            <p style="font-size: 20px; color: var(--text-sub); font-weight:700;">${currentBookInfo.story || '하나님의 따스한 사랑 이야기가 시작됩니다.'}</p>
            <button class="btn-icon active" id="btn-start-chapter" style="font-size:20px; padding: 10px 24px; margin-top:4px;">
              ✨ ${currentChapter}장 이야기 시작
            </button>
          </div>
        </div>
      `;

      if (isDesktopView()) {
        bookSpread.innerHTML = `
          <div class="page page-left" data-action="prev">
            ${coverHtml}
          </div>
          <div class="page page-right" data-action="next">
            ${page1 ? renderSingleVersePageContent(currentBookInfo, page1, 1, totalPages) : renderChapterFinishedPrompt(currentBookInfo)}
          </div>
        `;
      } else {
        bookSpread.innerHTML = `
          <div class="page page-left" data-action="next">
            ${coverHtml}
          </div>
        `;
      }

      const btnStart = document.getElementById('btn-start-chapter');
      if (btnStart) {
        btnStart.addEventListener('click', (e) => {
          e.stopPropagation();
          nextPage();
        });
      }

      saveBookmark();
      return;
    }

    // 2) REGULAR SPREAD MODE (pageIndex >= 1)
    if (isDesktopView()) {
      let p1Index = pageIndex;
      if (p1Index % 2 === 1 && p1Index > 1) {
        p1Index -= 1;
      }

      const p2Index = p1Index + 1;

      const page1 = pagesList[p1Index - 1];
      const page2 = p2Index <= totalPages ? pagesList[p2Index - 1] : null;

      bookSpread.innerHTML = `
        <div class="page page-left" data-action="prev">
          ${renderSingleVersePageContent(currentBookInfo, page1, p1Index, totalPages)}
        </div>
        <div class="page page-right" data-action="next">
          ${page2 ? renderSingleVersePageContent(currentBookInfo, page2, p2Index, totalPages) : renderChapterFinishedPrompt(currentBookInfo)}
        </div>
      `;
    } else {
      const page1 = pagesList[pageIndex - 1];
      bookSpread.innerHTML = `
        <div class="page page-left" data-action="next">
          ${renderSingleVersePageContent(currentBookInfo, page1, pageIndex, totalPages)}
        </div>
      `;
    }

    saveBookmark();
  }

  function renderSingleVersePageContent(bookInfo, pageData, pNum, totalPages) {
    if (!pageData) return renderChapterFinishedPrompt(bookInfo);

    const illustInfo = detectVerseIllustration(pageData.text);

    return `
      <div class="page-header-info">
        <span>${bookInfo.icon} ${bookInfo.name} ${currentChapter}장</span>
        <span>${pNum} / ${totalPages} 절</span>
      </div>
      
      <div class="verse-single-wrapper">
        <div class="verse-card-box">
          <div class="verse-badge">${pageData.verse}절</div>
          <p class="verse-single-text">${pageData.text}</p>
          
          <div class="verse-illust-box">
            <span style="font-size: 24px;">${illustInfo.icon}</span>
            <span>${illustInfo.title}</span>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>어린이 성경 동화책</span>
        <span>📖 KidBible</span>
      </div>
    `;
  }

  function renderChapterFinishedPrompt(bookInfo) {
    return `
      <div class="page-header-info">
        <span>${bookInfo.icon} ${bookInfo.name} ${currentChapter}장</span>
        <span>이야기 끝</span>
      </div>
      <div class="verse-single-wrapper">
        <div class="verse-card-box" style="border-color: var(--secondary-color);">
          <div style="font-size: 55px;">🌟</div>
          <h3 style="font-size: 28px; color: var(--primary-color); font-weight: 700;">${currentChapter}장의 모든 이야기를 읽었어요!</h3>
          <p style="font-size: 20px; color: var(--text-sub);">오른쪽 [ ❯ ] 버튼이나 우측을 터치하면 다음 장 표지로 이동해요.</p>
        </div>
      </div>
      <div class="page-footer">
        <span>어린이 성경 동화책</span>
        <span>📖 KidBible</span>
      </div>
    `;
  }

  // 🌟 DYNAMIC 3D LEAF FLIPPER ENGINE (PC 50% vs Mobile 100%) 🌟
  function triggerLeafFlip(direction, callback) {
    if (isAnimating) return;
    isAnimating = true;

    const isPC = isDesktopView();
    const leaf = document.createElement('div');
    const leafTypeClass = isPC ? 'pc-leaf' : 'mobile-leaf';
    leaf.className = `flipping-leaf ${leafTypeClass} ${direction === 'next' ? 'flip-next-leaf' : 'flip-prev-leaf'}`;

    const currentSpreadContent = bookSpread.innerHTML;

    leaf.innerHTML = `
      <div class="leaf-face leaf-face-front">
        <div style="width:100%; height:100%; position:relative;">
          ${currentSpreadContent}
        </div>
      </div>
      <div class="leaf-face leaf-face-back">
        <div style="width:100%; height:100%; position:relative;">
          ${currentSpreadContent}
        </div>
      </div>
    `;

    bookWrapper.appendChild(leaf);

    setTimeout(() => {
      callback();
    }, 250);

    setTimeout(() => {
      if (leaf.parentNode) {
        leaf.parentNode.removeChild(leaf);
      }
      isAnimating = false;
    }, 550);
  }

  function nextPage() {
    triggerLeafFlip('next', () => {
      const pagesList = currentChapterData.pages || [];
      const totalPages = pagesList.length;

      if (pageIndex === 0) {
        pageIndex = isDesktopView() ? 2 : 1;
      } else if (isDesktopView()) {
        let currentRightIndex = (pageIndex % 2 === 1 && pageIndex > 1) ? pageIndex : pageIndex + 1;
        if (currentRightIndex < totalPages) {
          pageIndex = currentRightIndex + 1;
        } else {
          goToNextChapter();
        }
      } else {
        if (pageIndex < totalPages) {
          pageIndex++;
        } else {
          goToNextChapter();
        }
      }
      renderBook();
    });
  }

  function prevPage() {
    triggerLeafFlip('prev', () => {
      if (pageIndex > 2 && isDesktopView()) {
        pageIndex -= 2;
      } else if (pageIndex > 1) {
        pageIndex -= 1;
      } else if (pageIndex === 1) {
        pageIndex = 0;
      } else if (pageIndex === 0) {
        if (currentChapter > 1) {
          currentChapter--;
          updateChapterData();
          const prevPages = currentChapterData.pages || [];
          pageIndex = Math.max(0, prevPages.length - 1);
        }
      }
      renderBook();
    });
  }

  function goToNextChapter() {
    const bookInfo = manifestData.find(b => b.id === currentBookId);
    if (currentChapter < bookInfo.available_chapters) {
      currentChapter++;
      pageIndex = 0;
      updateChapterData();
    } else {
      const bIdx = manifestData.findIndex(b => b.id === currentBookId);
      if (bIdx < manifestData.length - 1) {
        currentBookId = manifestData[bIdx + 1].id;
        currentChapter = 1;
        pageIndex = 0;
        updateChapterData();
      }
    }
  }

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextPage();
  });
  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevPage();
  });

  // Touch, Mouse Gesture & Touch Area Handler Setup
  function initTouchAndGestureEvents() {
    if (!bookWrapper) return;

    const handleStart = (clientX, clientY) => {
      startX = clientX;
      startY = clientY;
      startTime = Date.now();
    };

    const handleEnd = (clientX, clientY, targetEl) => {
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const deltaTime = Date.now() - startTime;

      if (targetEl && (targetEl.closest('.btn-icon') || targetEl.closest('.toc-modal') || targetEl.closest('.floating-toolbar'))) {
        return;
      }

      // 1. SWIPE GESTURE
      if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 100 && deltaTime < 800) {
        if (deltaX < 0) {
          nextPage();
        } else {
          prevPage();
        }
        return;
      }

      // 2. TOUCH / CLICK BY PAGE HALF AREA
      if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) {
        const rect = bookWrapper.getBoundingClientRect();
        const clickXRel = clientX - rect.left;

        if (clickXRel < rect.width / 2) {
          prevPage();
        } else {
          nextPage();
        }
      }
    };

    bookWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    bookWrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY, e.target);
      }
    });

    let isMouseDown = false;
    bookWrapper.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      handleStart(e.clientX, e.clientY);
    });

    bookWrapper.addEventListener('mouseup', (e) => {
      if (isMouseDown) {
        isMouseDown = false;
        handleEnd(e.clientX, e.clientY, e.target);
      }
    });
  }

  // Table of Contents (TOC) Modal Logic
  btnToc.addEventListener('click', (e) => {
    e.stopPropagation();
    tocModal.classList.add('open');
  });

  btnCloseToc.addEventListener('click', (e) => {
    e.stopPropagation();
    tocModal.classList.remove('open');
  });

  logoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
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
      card.addEventListener('click', (e) => {
        e.stopPropagation();
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

    document.getElementById('btn-toc-back').addEventListener('click', (e) => {
      e.stopPropagation();
      tocContent.innerHTML = `<div class="books-grid" id="books-grid"></div>`;
      const currentTab = tabOt.classList.contains('active') ? 'OT' : 'NT';
      booksGrid = document.getElementById('books-grid');
      renderTocBooks(currentTab);
    });

    document.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentBookId = bId;
        currentChapter = parseInt(btn.getAttribute('data-chapter'));
        pageIndex = 0;
        updateChapterData();
        renderBook();
        tocModal.classList.remove('open');
      });
    });
  }

  // TTS Reading Feature
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

    const verseTexts = document.querySelectorAll('.verse-single-text');
    if (!verseTexts || verseTexts.length === 0) return;

    let fullText = '';
    verseTexts.forEach(el => {
      fullText += ' ' + el.textContent.trim();
    });

    if (!fullText.trim()) return;

    ttsUtterance = new SpeechSynthesisUtterance(fullText);
    ttsUtterance.lang = 'ko-KR';
    ttsUtterance.rate = 0.9;

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

  btnTts.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTTS();
  });

  btnAutoplay.addEventListener('click', (e) => {
    e.stopPropagation();
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

  btnBgIllust.addEventListener('click', (e) => {
    e.stopPropagation();
    // Toggle manual fallback illustrations if desired
    renderBook();
  });

  btnFontSize.addEventListener('click', (e) => {
    e.stopPropagation();
    currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizes.length;
    const fontObj = fontSizes[currentFontSizeIndex];
    document.documentElement.style.setProperty('--base-font-size', fontObj.size);
    fontSizeLabel.textContent = fontObj.label;
  });

  btnTheme.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.remove(themes[currentThemeIndex]);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.classList.add(themes[currentThemeIndex]);
  });

  function saveBookmark() {
    localStorage.setItem('kidbible_bookmark', JSON.stringify({
      bookId: currentBookId,
      chapter: currentChapter,
      pageIndex: pageIndex
    }));
  }

  btnBookmark.addEventListener('click', (e) => {
    e.stopPropagation();
    const savedBookmark = localStorage.getItem('kidbible_bookmark');
    if (savedBookmark) {
      const bm = JSON.parse(savedBookmark);
      currentBookId = bm.bookId || 'Genesis';
      currentChapter = bm.chapter || 1;
      pageIndex = bm.pageIndex || 0;
      updateChapterData();
      renderBook();
      alert(`🔖 ${manifestData.find(b => b.id === currentBookId)?.name || ''} ${currentChapter}장 읽던 위치로 이동했어요!`);
    } else {
      alert('아직 저장된 북마크가 없어요.');
    }
  });

  window.addEventListener('resize', () => {
    renderBook();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  });

  // Initialize
  initData();
});
