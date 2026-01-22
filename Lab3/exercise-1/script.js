const form = document.getElementById("registerForm");
const role = document.getElementById("role");
const skillsField = document.getElementById("skillsField");

// Hide skills initially
skillsField.style.display = "none";

// Show/Hide skills dynamically
role.addEventListener("change", () => {
    skillsField.style.display = role.value === "student" ? "none" : "block";
});

// Utility Functions
function setError(input, message) {
    const field = input.parentElement;
    field.className = "field error";
    field.querySelector("small").innerText = message;
}

function setSuccess(input) {
    const field = input.parentElement;
    field.className = "field success";
}

// Email validation
function validateEmail(email) {
    const allowedDomains = ["gmail.com", "yahoo.com", "edu"];
    return allowedDomains.some(domain => email.endsWith(domain));
}

// Password validation
function validatePassword(password, role) {
    if (password.length < 6) return false;

    if (role === "admin") {
        return /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password);
    }
    return true;
}

// Real-time validation
form.addEventListener("input", () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");
    const age = document.getElementById("age");

    name.value ? setSuccess(name) : setError(name, "Name required");

    validateEmail(email.value)
        ? setSuccess(email)
        : setError(email, "Invalid email domain");

    validatePassword(password.value, role.value)
        ? setSuccess(password)
        : setError(password, "Weak password");

    password.value === confirm.value && confirm.value
        ? setSuccess(confirm)
        : setError(confirm, "Passwords do not match");

    age.value >= 18
        ? setSuccess(age)
        : setError(age, "Minimum age is 18");
});

// Submit Handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("successMsg").innerText =
        "🎉 Registration Successful!";
});
