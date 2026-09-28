// ===== CONFIG — edit these for your store =====
const PLACE_ID = "ChIJ_wvuvBCayzsRfo-Z2VY0UMQ";
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=" + PLACE_ID;

// WhatsApp Channel link
const WHATSAPP_URL = "https://whatsapp.com/channel/0029Vb4OPElInlqU1Cqxrr2R";

// ===== Chip tags + phrase variants =====
const chipTags = [
    { tag: "quality", label: "Quality fabric" },
    { tag: "variety", label: "Wide variety" },
    { tag: "pricing", label: "Fair pricing" },
    { tag: "staff", label: "Helpful staff" },
    { tag: "fitting", label: "Great fitting advice" },
    { tag: "ambience", label: "Well organised store" },
    { tag: "return", label: "Coming back again" }
];

const phrases = {
    quality: [
        "the fabric quality is genuinely excellent",
        "the material quality really stood out to me",
        "every garment feels premium and well-crafted",
        "the cloth quality is top-notch",
        "you can really feel the rich quality of the fabrics",
        "superb fabric and durable tailoring",
        "excellent stitching and high-grade material",
        "high quality clothes that look and feel great",
        "impressive fabric finish and luxury feel",
        "the clothing quality is absolutely worth it"
    ],
    variety: [
        "they have an incredible variety to choose from",
        "a massive selection of options on display",
        "so many stylish options to pick from",
        "great collection for every occasion and preference",
        "an extensive range of clothes in all sizes",
        "lots of fresh designs and trendy collections available",
        "impressive variety across every section",
        "huge range of choices under one roof"
    ],
    pricing: [
        "the pricing is surprisingly fair for the quality",
        "extremely reasonable prices for such premium items",
        "offers complete value for money",
        "very budget-friendly considering the high quality",
        "pricing is honest and competitive",
        "great prices without compromising on material quality",
        "affordable rates for great fashion"
    ],
    staff: [
        "the staff members were extremely helpful and polite",
        "courteous and attentive team throughout my visit",
        "staff guided me patiently with all my choices",
        "wonderful customer service from the store team",
        "the sales staff was warm, welcoming and attentive",
        "store staff made shopping effortless and pleasant",
        "super friendly staff who truly listen to what you need"
    ],
    fitting: [
        "they gave fantastic advice on fitting and sizing",
        "got excellent suggestions regarding fit",
        "the clothes fit perfectly right off the rack",
        "great guidance on finding the ideal size",
        "they really understand proper fitting and styling",
        "tailored feel with perfect fitting recommendations"
    ],
    ambience: [
        "the store is clean, neat, and beautifully organized",
        "well-arranged store where it's easy to browse",
        "spacious and well-maintained shopping environment",
        "neatly displayed items making shopping a breeze",
        "loved how clean and well laid out everything is"
    ],
    return: [
        "I'll definitely be coming back for more",
        "already planning my next shopping visit here",
        "this has become my go-to clothing store in Secunderabad",
        "will certainly be shopping here again for sure",
        "looking forward to visiting Dressing Sense again soon"
    ]
};

const openers = [
    "Visited Dressing Sense in Swapnalok Complex ",
    "Shopped at Dressing Sense, Swapnalok Complex ",
    "Went to Dressing Sense at Swapnalok Complex and",
    "Stopped by Dressing Sense in Swapnalok Complex ",
    "Had a wonderful experience at Dressing Sense, Swapnalok Complex.",
    "Just visited Dressing Sense in Secunderabad!",
    "Shopping at Dressing Sense in Swapnalok Complex was a pleasure.",
    "Checked out Dressing Sense today at Swapnalok Complex ",
    "Always enjoy visiting Dressing Sense in Swapnalok Complex."
];

const closers = [
    "Highly recommend!",
    "Would definitely recommend visiting.",
    "Worth a visit for sure.",
    "Really happy with the experience.",
    "Definite 5-star experience!",
    "A must-visit store in Secunderabad.",
    "Overall, a fantastic shopping experience.",
    "10/10 recommended!"
];

const transitionWords = [
    "Also,",
    "Plus,",
    "In addition,",
    "Moreover,",
    "Furthermore,"
];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

let selectedTags = [];
let userEditedReview = false;

// ===== Dynamic Unique Review Builder =====
function buildSentence(tags) {
    if (tags.length === 0) return "";

    // Randomize tag order for unique structure every time
    const shuffledTags = shuffleArray(tags);
    const selectedPhrases = shuffledTags.map(t => pick(phrases[t]));
    const opener = pick(openers);
    const closer = pick(closers);

    const structureType = Math.floor(Math.random() * 4);
    let result = "";

    if (selectedPhrases.length === 1) {
        if (structureType % 2 === 0) {
            result = `${opener} ${selectedPhrases[0]}. ${closer}`;
        } else {
            result = `${selectedPhrases[0].charAt(0).toUpperCase() + selectedPhrases[0].slice(1)} at Dressing Sense, Swapnalok Complex! ${closer}`;
        }
    } else if (selectedPhrases.length === 2) {
        if (structureType === 0) {
            result = `${opener} ${selectedPhrases[0]} and ${selectedPhrases[1]}. ${closer}`;
        } else if (structureType === 1) {
            result = `${opener} ${selectedPhrases[0]}. ${selectedPhrases[1].charAt(0).toUpperCase() + selectedPhrases[1].slice(1)}. ${closer}`;
        } else if (structureType === 2) {
            const trans = pick(transitionWords);
            result = `${selectedPhrases[0].charAt(0).toUpperCase() + selectedPhrases[0].slice(1)} at Dressing Sense! ${trans} ${selectedPhrases[1]}. ${closer}`;
        } else {
            result = `${opener} ${selectedPhrases[0]}, plus ${selectedPhrases[1]}. ${closer}`;
        }
    } else {
        const head = selectedPhrases.slice(0, -1).join(", ");
        const tail = selectedPhrases[selectedPhrases.length - 1];

        if (structureType === 0) {
            result = `${opener} ${head}, and ${tail}. ${closer}`;
        } else if (structureType === 1) {
            const trans = pick(transitionWords);
            result = `${opener} ${head}. ${trans} ${tail}. ${closer}`;
        } else if (structureType === 2) {
            const remaining = selectedPhrases.slice(1);
            result = `${selectedPhrases[0].charAt(0).toUpperCase() + selectedPhrases[0].slice(1)} at Dressing Sense. ${remaining.join(' and ')}. ${closer}`;
        } else {
            const remaining = selectedPhrases.slice(2);
            result = `${opener} ${selectedPhrases[0]} and ${selectedPhrases[1]}. ${remaining.join(', ')}. ${closer}`;
        }
    }

    result = result.replace(/\s+/g, ' ').replace(/\s+\./g, '.').replace(/\.\./g, '.').trim();
    return result;
}

function buildChips() {
    const row = document.getElementById('chip-row');
    row.innerHTML = '';
    chipTags.forEach(({ tag, label }) => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.type = 'button';
        chip.dataset.tag = tag;
        chip.textContent = label;
        chip.addEventListener('click', () => {
            chip.classList.toggle('selected');
            selectedTags = selectedTags.includes(tag)
                ? selectedTags.filter(t => t !== tag)
                : [...selectedTags, tag];
            userEditedReview = false;
            refreshReviewText();
        });
        row.appendChild(chip);
    });
}

function refreshReviewText(forceRebuild = false) {
    const textEl = document.getElementById('review-text');
    const copyBtn = document.getElementById('copy-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');

    if (userEditedReview && !forceRebuild) return;

    if (selectedTags.length === 0) {
        textEl.textContent = "Select a few words above to build your note...";
        textEl.classList.add('placeholder');
        copyBtn.disabled = true;
        if (shuffleBtn) shuffleBtn.style.display = 'none';
    } else {
        textEl.textContent = buildSentence(selectedTags);
        textEl.classList.remove('placeholder');
        copyBtn.disabled = false;
        if (shuffleBtn) shuffleBtn.style.display = 'inline-block';
    }
}

function initReviewBuilder() {
    selectedTags = [];
    userEditedReview = false;
    buildChips();
    refreshReviewText();

    const textEl = document.getElementById('review-text');
    const copyBtn = document.getElementById('copy-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');

    if (shuffleBtn) {
        shuffleBtn.onclick = () => {
            userEditedReview = false;
            refreshReviewText(true);
        };
    }

    textEl.oninput = () => {
        userEditedReview = true;
        textEl.classList.remove('placeholder');
        copyBtn.disabled = textEl.textContent.trim().length === 0;
    };

    copyBtn.onclick = () => {
        const text = textEl.textContent.trim();
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copied ✓';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = 'Copy this note';
                copyBtn.classList.remove('copied');
            }, 2000);

            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        });
    };

    document.getElementById('google-post-btn').href = GOOGLE_REVIEW_URL;

    const waBtn = document.getElementById('whatsapp-btn');
    if (waBtn) waBtn.href = WHATSAPP_URL;
}

// ===== Init on load — review builder is now the only/landing screen =====
document.addEventListener('DOMContentLoaded', initReviewBuilder);