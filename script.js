/***********************************************
 *  Tab Switching + Draggable Light/Dark Toggle
 ***********************************************/
document.addEventListener("DOMContentLoaded", () => {
  // TAB SWITCHING
  const tabButtons = document.querySelectorAll(".tab-button");
  const cardContents = document.querySelectorAll(".card-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // remove active from all
      tabButtons.forEach(b => b.classList.remove("active"));
      cardContents.forEach(c => c.classList.remove("active"));

      // add active to the clicked tab & matching section
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // DRAGGABLE THEME TOGGLE
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  const themeToggle = document.getElementById("toggleTheme");

  themeToggle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      themeToggle.style.left = (e.pageX - offsetX) + "px";
      themeToggle.style.top = (e.pageY - offsetY) + "px";
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // LIGHT/DARK MODE TOGGLE
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});

/***********************************************
 *  Copy-to-Clipboard Helper (updated version)
 ***********************************************/
function copyResult(resultId) {
  // Example text might be: "Lot Size: 0.002"
  const fullText = document.getElementById(resultId).textContent;

  // Remove everything up to the first colon + space, leaving just the number
  // e.g. "Lot Size: 0.002" → "0.002"
  const numericValue = fullText.replace(/^[^:]+:\s*/, '');

  // Copy only the numeric part to clipboard
  navigator.clipboard.writeText(numericValue).then(() => {
    alert(`Copied to clipboard: ${numericValue}`);
  });
}