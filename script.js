// ===== CONFIG — edit these for your store =====
const PLACE_ID = "ChIJ_wvuvBCayzsRfo-Z2VY0UMQ";
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=" + PLACE_ID;

// ===== Chip tags + phrase variants =====
// Each tag has several worded variants — a random one is picked each time,
// so two customers tapping the same chips still get differently-phrased text.
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
    quality: ["the fabric quality is genuinely excellent", "the material quality really stood out", "everything is made from solid, good quality fabric"],
    variety: ["they have a wide variety to choose from", "the range of options on display is great", "so many styles to pick from"],
    pricing: ["the pricing is fair for the quality", "prices are quite reasonable", "good value for what you're paying"],
    staff: ["the staff were really helpful throughout", "the team was friendly and patient with all my questions", "staff went out of their way to help me pick"],
    fitting: ["they gave great advice on fitting", "the fitting suggestions were spot on", "staff helped me find exactly the right size"],
    ambience: ["the store is well organised and easy to browse", "everything was neatly arranged", "clean, well laid out store"],
    return: ["I'll definitely be coming back", "will be shopping here again for sure", "already planning my next visit"]
};

const openers = [
    "Visited Dressing Sense in Swapnalok Complex ",
    "Shopped at Dressing Sense, Swapnalok Complex ",
    "Went to Dressing Sense at Swapnalok Complex and",
    "Stopped by Dressing Sense in Swapnalok Complex "
];
const closers = ["Highly recommend.", "Would definitely recommend it.", "Worth a visit.", "Really happy with the experience."];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

let selectedTags = [];
let userEditedReview = false;

// ===== Star rating setup =====
const starLabels = ["1", "2", "3", "4", "5"];
const starRow = document.getElementById('rating-row');

starLabels.forEach((n) => {
    const btn = document.createElement('button');
    btn.className = 'star-btn';
    btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.5l2.9 6.26 6.6.63-5 4.65 1.5 6.96L12 17.9 6 21l1.5-6.96-5-4.65 6.6-.63L12 2.5z"
        fill="#D8C9A8" stroke="#B8892B" stroke-width="1"/>
    </svg>
    <span class="num">${n}</span>
  `;
    btn.addEventListener('click', () => handleRating(parseInt(n)));
    starRow.appendChild(btn);
});

function handleRating(n) {
    if (n >= 4) {
        initReviewBuilder();
        goTo('screen-high');
    } else {
        initFeedbackForm(n);
        goTo('screen-low');
    }
}

// ===== Screen 2: chip-based review builder =====
function buildSentence(tags) {
    if (tags.length === 0) return "";
    const parts = tags.map(t => pick(phrases[t]));
    const joined = parts.length === 1
        ? parts[0]
        : parts.length === 2
            ? parts[0] + " and " + parts[1]
            : parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];
    const sentence = pick(openers) + " " + joined + ". " + pick(closers);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
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
            refreshReviewText();
        });
        row.appendChild(chip);
    });
}

function refreshReviewText() {
    const textEl = document.getElementById('review-text');
    const copyBtn = document.getElementById('copy-btn');
    if (userEditedReview) return;
    if (selectedTags.length === 0) {
        textEl.textContent = "Select a few words above to build your note...";
        textEl.classList.add('placeholder');
        copyBtn.disabled = true;
    } else {
        textEl.textContent = buildSentence(selectedTags);
        textEl.classList.remove('placeholder');
        copyBtn.disabled = false;
    }
}

function initReviewBuilder() {
    selectedTags = [];
    userEditedReview = false;
    buildChips();
    refreshReviewText();

    const textEl = document.getElementById('review-text');
    const copyBtn = document.getElementById('copy-btn');

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

            // show the paste-reminder toast
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        });
    };

    document.getElementById('google-post-btn').href = GOOGLE_REVIEW_URL;
}

// ===== Screen 3: low rating -> dummy submit -> thank you =====
// NOTE: this is a dummy submit — nothing is actually sent anywhere yet.
// Swap the inside of submitBtn.onclick later for a real backend call
// (Google Form, email API, database, etc.) so feedback isn't lost.
function initFeedbackForm(stars) {
    const nameInput = document.getElementById('fb-name');
    const phoneInput = document.getElementById('fb-phone');
    const feedbackInput = document.getElementById('feedback-input');
    const submitBtn = document.getElementById('feedback-submit-btn');

    submitBtn.onclick = () => {
        // dummy collection point — values are read here but not sent anywhere yet
        const feedbackData = {
            stars: stars,
            name: nameInput.value,
            phone: phoneInput.value,
            message: feedbackInput.value
        };
        console.log('Feedback captured (dummy):', feedbackData);

        nameInput.value = '';
        phoneInput.value = '';
        feedbackInput.value = '';
        goTo('screen-thankyou');
    };
}

// ===== Screen navigation =====
function goTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}