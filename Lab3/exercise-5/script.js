let currentStage = 0;
const stages = document.querySelectorAll(".stage");
const progress = document.getElementById("progress");

// Temporary storage
const formData = {
    name: "",
    age: "",
    email: "",
    password: "",
    preferences: []
};

// Show stage
function showStage(index) {
    stages.forEach(stage => stage.classList.remove("active"));
    stages[index].classList.add("active");
    progress.style.width = ((index + 1) / stages.length) * 100 + "%";
}

// Validation per stage
function validateStage() {
    const error = stages[currentStage].querySelector(".error");
    error.innerText = "";

    if (currentStage === 0) {
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value;
        if (!name || age < 18) {
            error.innerText = "Enter valid name and age (18+)";
            return false;
        }
        formData.name = name;
        formData.age = age;
    }

    if (currentStage === 1) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (!email.includes("@") || password.length < 6) {
            error.innerText = "Valid email and 6+ character password required";
            return false;
        }
        formData.email = email;
        formData.password = password;
    }

    if (currentStage === 2) {
        const selected = document.querySelectorAll("input[type='checkbox']:checked");
        if (selected.length === 0) {
            error.innerText = "Select at least one preference";
            return false;
        }
        formData.preferences = [...selected].map(cb => cb.value);
    }

    if (currentStage === 3) {
        document.getElementById("review").innerHTML = `
            <p><b>Name:</b> ${formData.name}</p>
            <p><b>Age:</b> ${formData.age}</p>
            <p><b>Email:</b> ${formData.email}</p>
            <p><b>Preferences:</b> ${formData.preferences.join(", ")}</p>
        `;
    }

    return true;
}

// Navigation
function nextStage() {
    if (validateStage()) {
        currentStage++;
        showStage(currentStage);
    }
}

function prevStage() {
    currentStage--;
    showStage(currentStage);
}

// Submit
document.getElementById("multiForm").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("successMsg").innerText =
        "✅ Form submitted successfully!";
});

// Initial
showStage(currentStage);
