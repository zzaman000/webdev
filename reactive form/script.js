// DOM Selection
const form = document.querySelector("#form");

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const userMsg = document.querySelector("#userMsg");
const emailMsg = document.querySelector("#emailMsg");
const passMsg = document.querySelector("#passMsg");

const summary = document.querySelector("#summary");
const submitBtn = document.querySelector("#submitBtn");

// Validation Functions

function validateUsername(){
    const val = username.value.trim();

    if(val.length < 3){
        setError(username, userMsg, "Username must be at least 3 characters.");
        return false;
    }

    setSuccess(username, userMsg, "Looks good.");
    return true;
}

function validateEmail(){
    const val = email.value.trim();

    if(val === "" || !val.includes("@") || !val.includes(".")){
        setError(email, emailMsg, "Enter a valid email.");
        return false;
    }

    setSuccess(email, emailMsg, "Valid email.");
    return true;
}

function validatePassword(){
    const val = password.value.trim();

    if(val.length < 8 || !/\d/.test(val)){
        setError(password, passMsg, "Password must be 8+ characters and include a number.");
        return false;
    }

    setSuccess(password, passMsg, "Strong password.");
    return true;
}

// UI Helpers

function setError(input, msgEl, message){
    msgEl.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
}

function setSuccess(input, msgEl, message){
    msgEl.textContent = message;
    input.classList.add("success");
    input.classList.remove("error");
}

function checkFormValidity(){
    const valid =
        validateUsername() &&
        validateEmail() &&
        validatePassword();

    submitBtn.disabled = !valid;
}

// Live Validation Events

username.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
password.addEventListener("input", checkFormValidity);

// Submit Event

form.addEventListener("submit", e => {
    e.preventDefault();

    if(submitBtn.disabled){
        summary.textContent = "Fix the errors before submitting.";
        summary.className = "errorText";
        return;
    }

    summary.textContent = "Form submitted successfully!";
    summary.className = "successText";

    form.reset();
    submitBtn.disabled = true;

    document.querySelectorAll(".msg").forEach(m=>m.textContent="");
    document.querySelectorAll("input").forEach(i=>i.classList.remove("success"));
});
