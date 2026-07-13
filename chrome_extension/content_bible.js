// content_bible.js

// List of words that are NOT character names
const blacklist = new Set([
    "The", "And", "Now", "But", "He", "She", "They", "Then", "So", "For", "In", "On", "At", "By", "To", "From",
    "As", "With", "If", "When", "While", "Thus", "Therefore", "Here", "There", "Who", "What", "Which", "Why",
    "How", "This", "That", "These", "Those", "You", "Your", "His", "Her", "Their", "Our", "My", "I", "Me", "Him",
    "Them", "Us", "We", "Behold", "Be", "Is", "Are", "Was", "Were", "Been", "Have", "Has", "Had", "Do", "Does", "Did",
    "Will", "Would", "Shall", "Should", "Can", "Could", "May", "Might", "Must", "O", "Oh", "Ah", "Alas", "Amen",
    "God", "Lord", "Yahweh", "Father", "Son", "Spirit", "Holy", "Christ", "Jesus", "Angel", "Man", "Woman",
    "King", "Priest", "Prophet", "Day", "Night", "Heaven", "Earth", "Sea", "Land", "Water", "Fire", "Wind",
    "House", "City", "Town", "Temple", "Tabernacle", "Altar", "Covenant", "Law", "Grace", "Faith", "Love", "Hope",
    "Life", "Death", "Sin", "Righteousness", "Truth", "Mercy", "Peace", "Glory", "Name", "Word", "Voice",
    "Book", "Scroll", "Gold", "Silver", "Brass", "Iron", "Stone", "Wood", "Tree", "Fruit", "Bread", "Wine",
    "Oil", "Sheep", "Ox", "Ass", "Camel", "Horse", "Lion", "Bear", "Wolf", "Dog", "Bird", "Eagle", "Dove",
    "Fish", "Serpent", "Dragon", "Beast", "Devil", "Satan", "Angels", "Demons", "Gentiles", "Jews",
    // Grammatical / Sentence-starting words
    "Again", "Am", "Its", "Let", "Where", "Whoever", "Whosoever", "Any", "Anyone", "Anything", "All", "Another", 
    "Each", "Every", "Everyone", "Everything", "Some", "Someone", "Something", "Many", "Few", "Several", "Both", 
    "Either", "Neither", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "First", 
    "Second", "Third", "Last", "Or", "Nor", "No", "Not", "Only", "Also", "Even", "Indeed", "Truly", "Verily", 
    "Blessed", "Cursed", "Woe", "Because", "Until", "Till", "Unless", "Lest", "Except", "Though", "Although", 
    "Yet", "Still", "Otherwise", "Else", "Furthermore", "Moreover", "Besides", "Instead", "Likewise", "Similarly", "Namely",
    "About", "Above", "Accept", "According", "Across", "After", "Against", "Along", "Among", "Around", "Before", 
    "Behind", "Below", "Beneath", "Beside", "Between", "Beyond", "During", "Inside", "Into", "Like", "Near", "Off", 
    "Onto", "Outside", "Over", "Past", "Through", "Throughout", "Under", "Underneath", "Upon", "Within", "Without", 
    "Add", "Bring", "Come", "Do", "Done", "Go", "Gone", "Have", "Keep", "Make", "Put", "Say", "See", "Send", "Take", "Tell", "Think", "Write",
    // Places
    "Egypt", "Babylon", "Jerusalem", "Nazareth", "Galilee", "Sodom", "Gomorrah", "Canaan", "Jordan", "Sinai", "Eden", "Nineveh", "Bethel", "Ai", "Nod",
    // Books
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "Samuel", "Kings", "Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Thessalonians", "Timothy", "Titus", "Philemon", "Hebrews", "James", "Peter", "Jude", "Revelation"
]);

const abbrevToEnglishName = {
    "gn": "Genesis", "ex": "Exodus", "lv": "Leviticus", "nm": "Numbers", "dt": "Deuteronomy",
    "js": "Joshua", "jud": "Judges", "rt": "Ruth", "1sm": "1Samuel", "2sm": "2Samuel",
    "1kgs": "1Kings", "2kgs": "2Kings", "1ch": "1Chronicles", "2ch": "2Chronicles",
    "ezr": "Ezra", "ne": "Nehemiah", "et": "Esther", "job": "Job", "ps": "Psalms",
    "prv": "Proverbs", "ec": "Ecclesiastes", "so": "SongofSolomon", "is": "Isaiah",
    "jr": "Jeremiah", "lm": "Lamentations", "ez": "Ezekiel", "dn": "Daniel", "ho": "Hosea",
    "jl": "Joel", "am": "Amos", "ob": "Obadiah", "jn": "Jonah", "mi": "Micah",
    "na": "Nahum", "hk": "Habakkuk", "zp": "Zephaniah", "hg": "Haggai", "zc": "Zechariah",
    "ml": "Malachi", "mt": "Matthew", "mk": "Mark", "lk": "Luke", "jo": "John",
    "act": "Acts", "rm": "Romans", "1co": "1Corinthians", "2co": "2Corinthians",
    "gl": "Galatians", "eph": "Ephesians", "ph": "Philippians", "cl": "Colossians",
    "1ts": "1Thessalonians", "2ts": "2Thessalonians", "1tm": "1Timothy", "2tm": "2Timothy",
    "tt": "Titus", "phm": "Philemon", "hb": "Hebrews", "jm": "James", "1pe": "1Peter",
    "2pe": "2Peter", "1jo": "1John", "2jo": "2John", "3jo": "3John", "jd": "Jude", "re": "Revelation"
};

async function getCharactersAndScreens() {
    try {
        let targetAbbrev = null;
        let targetChapterNum = null;
        let bibleData = null;

        // 1. Parse book and chapter from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const chapterParam = urlParams.get('chapter') || urlParams.get('chapter_number');
        const numberParam = urlParams.get('number') || urlParams.get('chapter_number');
        
        const fetchBookData = async (abbrev) => {
            const englishName = abbrevToEnglishName[abbrev.toLowerCase()];
            if (!englishName) {
                console.error("[Extension] No english name mapping for abbrev:", abbrev);
                return null;
            }
            const fileName = englishName.toLowerCase() + ".json";
            const jsonUrl = chrome.runtime.getURL(`json/${fileName}`);
            try {
                const response = await fetch(jsonUrl);
                if (response.ok) {
                    return await response.json();
                }
            } catch (e) {
                console.error(`[Extension] Failed to fetch book data for ${fileName}`, e);
            }
            return null;
        };

        if (chapterParam && numberParam) {
            targetAbbrev = chapterParam.toLowerCase().trim();
            targetChapterNum = parseInt(numberParam);
        } else {
            // 2. Fallback to localStorage saved bookmark
            try {
                const savedStr = localStorage.getItem('bible_saved_position');
                if (savedStr) {
                    const saved = JSON.parse(savedStr);
                    if (saved && typeof saved.bookIndex === 'number' && typeof saved.chapterIndex === 'number') {
                        const abbrevList = Object.keys(abbrevToEnglishName);
                        const abbrev = abbrevList[saved.bookIndex];
                        if (abbrev) {
                            targetAbbrev = abbrev;
                            targetChapterNum = saved.chapterIndex + 1;
                        }
                    }
                }
            } catch (e) {
                console.warn("[Extension] LocalStorage position read failed:", e);
            }
        }

        // 3. Absolute fallback to Genesis 1 if still not found
        if (!targetAbbrev || !targetChapterNum || isNaN(targetChapterNum)) {
            console.log("[Extension] No query param or bookmark found, defaulting to Genesis 1");
            targetAbbrev = "gn";
            targetChapterNum = 1;
        }

        // 4. Fetch Book JSON
        const bookData = await fetchBookData(targetAbbrev);
        if (!bookData) return null;
        
        // 5. Extract verses for the target chapter, merging "paragraph text" and "line text" fragments by verseNumber
        const chapterItems = bookData.filter(item => 
            (item.type === "paragraph text" || item.type === "line text") && 
            item.chapterNumber === targetChapterNum
        );

        if (chapterItems.length === 0) {
            console.error("[Extension] Chapter not found in book data:", targetChapterNum);
            return null;
        }

        // Group fragments by verseNumber
        const verseMap = new Map();
        chapterItems.forEach(item => {
            const vNum = item.verseNumber;
            if (typeof vNum !== "number") return;
            const currentVal = item.value || "";
            if (!verseMap.has(vNum)) {
                verseMap.set(vNum, []);
            }
            verseMap.get(vNum).push(currentVal);
        });

        // Merge fragments and sort by verse number
        const sortedVerses = Array.from(verseMap.keys()).sort((a, b) => a - b);
        const verses = sortedVerses.map(vNum => {
            const fragments = verseMap.get(vNum);
            return fragments.join(" ").replace(/\s+/g, " ").trim();
        });

        if (verses.length === 0) {
            console.error("[Extension] No valid verses extracted after merging");
            return null;
        }
        
        const bookTitle = abbrevToEnglishName[targetAbbrev] || targetAbbrev;
        
        // 5. Extract characters
        const text = verses.join(" ");
        const regex = /\b[A-Z][a-z']+\b/g;
        const matches = text.match(regex) || [];
        
        const characters = new Set();
        matches.forEach(word => {
            if (!blacklist.has(word)) {
                characters.add(word);
            }
        });
        
        const characterList = Array.from(characters);

        // 6. Extract screens (verses)
        const screens = verses.map((vText, idx) => ({
            verseNumber: String(idx + 1),
            text: vText,
            characters: characterList.filter(name => {
                const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                return new RegExp(`\\b${escapedName}\\b`, "i").test(vText);
            })
        }));
        
        return {
            bookTitle,
            chapterNum: String(targetChapterNum),
            characters: characterList,
            screens
        };
    } catch (err) {
        console.error("[Extension] getCharactersAndScreens error:", err);
        return null;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "ping") {
        sendResponse({ ok: true, status: "pong" });
    } else if (request.action === "extract_characters") {
        getCharactersAndScreens().then(data => {
            if (data) {
                sendResponse({
                    ok: true,
                    characters: data.characters,
                    bookTitle: data.bookTitle,
                    chapterNum: data.chapterNum
                });
            } else {
                sendResponse({ ok: false, error: "데이터를 읽을 수 없습니다." });
            }
        });
        return true;
    } else if (request.action === "extract_screens") {
        getCharactersAndScreens().then(data => {
            if (data) {
                sendResponse({
                    ok: true,
                    info: {
                        bookTitle: data.bookTitle,
                        chapterNum: data.chapterNum,
                        characters: data.characters,
                        screens: data.screens
                    }
                });
            } else {
                sendResponse({ ok: false, error: "데이터를 읽을 수 없습니다." });
            }
        });
        return true;
    }
});
