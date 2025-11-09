// Array of inspirational quotes
const quotes = [
    "You were ready the moment you had a desire.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "In the middle of difficulty lies opportunity.",
    "You are never too old to set another goal or to dream a new dream.",
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "You learn more from failure than from success.",
    "If you are working on something that you really care about, you don't have to be pushed.",
    "People who are crazy enough to think they can change the world, are the ones who do.",
    "Optimism is the one quality more associated with success and happiness than any other.",
    "The only person you are destined to become is the person you decide to be.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Life is what happens to you while you're busy making other plans.",
    "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    "The two most important days in your life are the day you are born and the day you find out why.",
    "Whether you think you can or you think you can't, you're right.",
    "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    "The person who says it cannot be done should not interrupt the person who is doing it.",
    "It's not whether you get knocked down, it's whether you get up.",
    "People often say that motivation doesn't last. Well, neither does bathing. That's why we recommend it daily.",
    "If you want to lift yourself up, lift up someone else.",
    "The only way of finding the limits of the possible is by going beyond them into the impossible.",
    "It always seems impossible until it's done.",
    "The secret of getting ahead is getting started."
];

let currentQuoteIndex = 0;

// Function to get a random quote
function getRandomQuote() {
    let newIndex;
    // Ensure we don't show the same quote twice in a row
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    
    currentQuoteIndex = newIndex;
    return quotes[currentQuoteIndex];
}

// Function to display a new quote with fade animation
function displayNewQuote() {
    const quoteText = document.getElementById('quoteText');
    quoteText.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = getRandomQuote();
        quoteText.style.opacity = '1';
    }, 300);
}

// Event listener for quote button
document.getElementById('quoteButton').addEventListener('click', displayNewQuote);

// Event listener for New Entry button
document.getElementById('newEntryButton').addEventListener('click', function() {
    const entryArea = document.getElementById('entryArea');
    entryArea.value = '';
    entryArea.focus();
});

// Display a random quote on page load
window.addEventListener('DOMContentLoaded', function() {
    // Set initial quote randomly
    currentQuoteIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteText').textContent = quotes[currentQuoteIndex];
});

// Logo rotation is handled by CSS animation
// The image will continuously rotate automatically



// --- storage key
const ENTRIES_KEY = 'dearcapy.entries.v1';

// --- helpers
function loadEntries() {
  try { return JSON.parse(localStorage.getItem(ENTRIES_KEY)) || []; }
  catch { return []; }
}
function saveEntries(arr) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(arr));
}
function getSelectedRating() {
  const checked = document.querySelector('input[name="rating"]:checked');
  return checked ? Number(checked.value) : 0;
}
function clearRating() {
  const checked = document.querySelector('input[name="rating"]:checked');
  if (checked) checked.checked = false;
}
function stars(n) {
  const full = '★'.repeat(n);
  const empty = '☆'.repeat(5 - n);
  return full + empty;
}

function renderEntries() {
  const list = document.getElementById('entriesList');
  const entries = loadEntries();
  list.innerHTML = '';

  entries.forEach((e, index) => {
    const card = document.createElement('div');
    card.className = 'entry-card';

    // 🖼 keep the thumbnail/picture (not deleted from disk, just displayed)
    // If you have a real image per entry, set e.thumbSrc; otherwise keep the placeholder.
    const thumb = document.createElement('img');
    thumb.className = 'entry-thumb';
    thumb.alt = '';
    thumb.src = e.thumbSrc || 'thumb-placeholder.png'; // <-- your picture here
    // If you used a styled <div> before, you can keep that instead of <img>.

    const text = document.createElement('div');
    text.className = 'entry-text';
    text.textContent = e.text;

    const meta = document.createElement('div');
    meta.className = 'entry-meta';

    const dateRow = document.createElement('div');
    dateRow.className = 'meta-row';
    dateRow.innerHTML = `<span class="meta-label">Date:</span> ${new Date(e.date).toLocaleDateString()}`;

    const moodRow = document.createElement('div');
    moodRow.className = 'meta-row';
    moodRow.innerHTML = `<span class="meta-label">Mood:</span> <span class="meta-stars">${stars(e.rating || 0)}</span>`;

    meta.appendChild(dateRow);
    meta.appendChild(moodRow);

    // 🗑 delete button
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.title = 'Delete entry';
    del.setAttribute('aria-label', 'Delete entry');
    del.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2h-1l-1 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 7H3V5h4V4a1 1 0 0 1 1-1zm2 0v1h2V3h-2zM7 7l1 12h8l1-12H7z"/>
      </svg>
    `;
    del.addEventListener('click', () => deleteEntry(index, card));

    // assemble card
    card.appendChild(thumb);
    card.appendChild(text);
    card.appendChild(meta);
    card.appendChild(del);
    list.appendChild(card);
  });
}

function deleteEntry(index, cardEl) {
  const entries = loadEntries();
  if (!entries[index]) return;
  if (!confirm('Delete this journal entry?')) return;

  // small fade-out before removing
  cardEl.classList.add('removing');
  setTimeout(() => {
    entries.splice(index, 1);
    saveEntries(entries);
    renderEntries();
  }, 180);
}



const images = [
    "Dearcapy (2).png",
    "capy.png",
    "capy (1).png",
    "capy (5).png",
    "capy (6).png"
]

let currentImageIndex = 0;
function getRandomImage() {
    let imageIndex;
    // Ensure we don't show the same quote twice in a row
    do {
        imageIndex = Math.floor(Math.random() * images.length);
    } while (imageIndex === currentImageIndex && images.length > 1);
  
    currentImageIndex = imageIndex;
    return images[currentImageIndex];
}

// --- save button
window.saveText = function saveText() {
  const box = document.getElementById('entryArea');
  const text = box.value.trim();
  const rating = getSelectedRating();

  if (!text) return; // ignore empty

  const entries = loadEntries();
  entries.unshift({
    text,
    rating,
    date: new Date().toISOString(),
    image: getRandomImage()
  });
  saveEntries(entries);

  box.value = '';
  clearRating();
  renderEntries();
};

// initial render
renderEntries();
