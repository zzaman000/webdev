const form = document.getElementById("regform");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    let isValid = true;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmField = document.getElementById("confirmPassword");
    const phoneField = document.getElementById("tel");

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value;
    const confirmPassword = confirmField.value;
    const phone = phoneField.value.trim();

    // Clear previous messages
    document.querySelectorAll("small").forEach(el => el.innerText = "");

    // Name Validation
    if (name.length < 3) {
        document.getElementById("nameError").innerText =
            "Name must be at least 3 characters. Please re-enter.";
        nameField.value = "";
        nameField.focus();
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        document.getElementById("emailError").innerText =
            "Invalid email format. Please re-enter.";
        emailField.value = "";
        if (isValid) emailField.focus();
        isValid = false;
    }

    // Password Validation
    if (password.length < 6) {
        document.getElementById("passwordError").innerText =
            "Password must be at least 6 characters.";
        passwordField.value = "";
        if (isValid) passwordField.focus();
        isValid = false;
    }

    // Confirm Password
    if (password !== confirmPassword) {
        document.getElementById("confirmError").innerText =
            "Passwords do not match. Re-enter.";
        confirmField.value = "";
        if (isValid) confirmField.focus();
        isValid = false;
    }

    // Phone Validation
    const phonePattern = /^[0-9]{10}$/;
    if (!phone.match(phonePattern)) {
        document.getElementById("phoneError").innerText =
            "Phone number must be exactly 10 digits.";
        phoneField.value = "";
        if (isValid) phoneField.focus();
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful.");
        form.reset();
    }

});
