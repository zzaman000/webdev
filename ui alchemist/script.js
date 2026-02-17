// DOM Selection
const body = document.body;
const preview = document.querySelector("#preview");
const list = document.querySelector("#details");
const status = document.querySelector("#status");

const darkBtn = document.querySelector("#darkToggle");
const decBtn = document.querySelector("#decrease");
const incBtn = document.querySelector("#increase");
const highlightBtn = document.querySelector("#highlight");
const toggleListBtn = document.querySelector("#toggleList");
const resetBtn = document.querySelector("#reset");

// State Tracking
let fontSize = 16;

// Status Helper
function setStatus(msg){
    status.textContent = "Status: " + msg;
}

// Controls

// Dark Mode
darkBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    setStatus(`Dark Mode: ${body.classList.contains("dark") ? "ON" : "OFF"}`);
});


// Font Size +
incBtn.addEventListener("click", () => {
    fontSize += 2;
    preview.style.fontSize = fontSize + "px";
    setStatus(`Font Size: ${fontSize}px`);
});


// Font Size -
decBtn.addEventListener("click", () => {
    fontSize -= 2;
    preview.style.fontSize = fontSize + "px";
    setStatus(`Font Size: ${fontSize}px`);
});


// Highlight Toggle
highlightBtn.addEventListener("click", () => {
    preview.classList.toggle("highlight");
    setStatus(`Highlight: ${preview.classList.contains("highlight") ? "ACTIVE" : "OFF"}`);
});


// Show/Hide List
toggleListBtn.addEventListener("click", () => {
    list.classList.toggle("hidden");
    setStatus(`Details: ${list.classList.contains("hidden") ? "Hidden" : "Visible"}`);
});


// Reset Button
resetBtn.addEventListener("click", () => {

    // reset state
    fontSize = 16;

    // remove classes
    body.classList.remove("dark");
    preview.classList.remove("highlight");
    list.classList.remove("hidden");

    // reset styles
    preview.style.fontSize = "16px";

    setStatus("Reset to default state.");
});
