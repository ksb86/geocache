// Simple mapping: tag ID -> clue data
// You can change these strings anytime without touching the NFC tags.
const CLUES = {
  "04:AC:99:87:73:00:00": {
    title: "Riverside Riddle",
    text: "Stand where the water runs fastest. Count 15 paces downstream and look for a stone that does not match the others.",
  },
  "04:B5:83:87:73:00:00": {
    title: "Watching Pines",
    text: "Find the three tallest pines in a row. The cache is hidden at the base of the one that leans the most.",
  },
  // Add more tags here as you go:
  // c3: { title: "...", text: "..." },
};

// Helper: get query parameter value by name
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(name);
  return value ? value.trim() : null;
}

function renderClue() {
  const statusEl = document.getElementById("status");
  const titleEl = document.getElementById("clue-title");
  const textEl = document.getElementById("clue-text");
  const metaEl = document.getElementById("tag-meta");

  const tagId = getQueryParam("tag");

  if (!tagId) {
    statusEl.textContent =
      "No tag ID was detected. Make sure you accessed this page by scanning the NFC tag.";
    metaEl.textContent = "";
    return;
  }

  const normalizedTag = tagId.toLowerCase();
  const clue = CLUES[normalizedTag];

  if (!clue) {
    statusEl.textContent =
      "This tag is not recognized yet. The cache owner may not have assigned a clue to it.";
    metaEl.textContent = `Tag ID: "${tagId}"`;
    return;
  }

  // We have a valid clue
  statusEl.textContent = "";
  titleEl.textContent = clue.title;
  textEl.textContent = clue.text;

  titleEl.classList.remove("hidden");
  textEl.classList.remove("hidden");

  metaEl.textContent = `Tag ID: "${tagId}"`;
}

document.addEventListener("DOMContentLoaded", renderClue);
