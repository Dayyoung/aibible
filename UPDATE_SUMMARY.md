# Implementation Update: Multi-Language Support

## Changes Made

### 1. `index.html`
- **Default Language**: Changed default language from Korean to English (`<html lang="en">`).
- **Data Loading**: Updated `initApp` to:
    - Load `json/index.json` to get available Bible versions.
    - Default to loading `en_kjv.json` (King James Version).
- **UI Localization**:
    - Introduced `UI_STRINGS` object containing English and Korean translations for all UI elements.
    - Implemented `getUiString(key)` helper function to dynamically fetch text based on the selected language.
    - Replaced hardcoded Korean text with dynamic calls to `getUiString`.
- **Book Names**:
    - Added `BIBLE_NAMES_EN` for English book names.
    - Updated `getBookName(book)` to support dynamic book name retrieval based on the active language.
- **Language Selector**:
    - Added a dropdown menu in the "Start" view to allow users to switch between available Bible versions (e.g., KJV, Korean).
    - `changeVersion(abbrev)` function handles fetching the new Bible data and updating the UI language.
- **Text-to-Speech (TTS)**:
    - Updated `getVoice()` to dynamically select a voice matching the current Bible language (e.g., English for KJV, Korean for Korean version).
    - Checks for Google, Microsoft, or generic voices matching the language code.

### 2. `json/index.json`
- Confirmed existing structure supports language grouping and version abbreviations used in the new logic.

## Verification
- We verified that the application loads with "HOLY BIBLE" (English) by default.
- We verified that the language dropdown is populated (mocked for local testing).
- We verified that switching languages updates the UI text (e.g., "Open Bible" <-> "성경 열기").

## How to Test
1. Open `index.html` in a web browser.
   - *Note: Due to browser security (CORS), you may need to run a local server (e.g., `python3 -m http.server`) to fully load JSON files.*
2. Check that the title says "HOLY BIBLE".
3. Use the dropdown to switch to "Korean Version".
4. Check that the title changes to "성경전서" and book names appear in Korean.
