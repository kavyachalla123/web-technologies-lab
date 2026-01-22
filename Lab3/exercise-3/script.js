// Survey Question Structure
const questions = [
    {
        id: 1,
        text: "What is your name?",
        type: "text",
        required: true,
        maxLength: 20
    },
    {
        id: 2,
        text: "Select your gender",
        type: "radio",
        required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        id: 3,
        text: "Select your skills",
        type: "checkbox",
        required: true,
        minSelect: 1,
        maxSelect: 3,
        options: ["HTML", "CSS", "JavaScript", "Python"]
    }
];

const surveyFields = document.getElementById("surveyFields");

// Generate survey dynamically
questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    const label = document.createElement("label");
    label.innerText = q.text;
    div.appendChild(label);

    // Text field
    if (q.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `q${q.id}`;
        div.appendChild(input);
    }

    // Radio buttons
    if (q.type === "radio") {
        q.options.forEach(opt => {
            const wrapper = document.createElement("div");
            wrapper.className = "options";

            wrapper.innerHTML = `
                <input type="radio" name="q${q.id}" value="${opt}">
                ${opt}
            `;
            div.appendChild(wrapper);
        });
    }

    // Checkboxes
    if (q.type === "checkbox") {
        q.options.forEach(opt => {
            const wrapper = document.createElement("div");
            wrapper.className = "options";

            wrapper.innerHTML = `
                <input type="checkbox" name="q${q.id}" value="${opt}">
                ${opt}
            `;
            div.appendChild(wrapper);
        });
    }

    const error = document.createElement("div");
    error.className = "error";
    error.id = `error${q.id}`;
    div.appendChild(error);

    surveyFields.appendChild(div);
});

// Validation function
function validateSurvey() {
    let valid = true;

    questions.forEach(q => {
        const error = document.getElementById(`error${q.id}`);
        error.style.display = "none";

        // Text validation
        if (q.type === "text") {
            const input = document.getElementById(`q${q.id}`);
            if (q.required && input.value.trim() === "") {
                error.innerText = "This field is required";
                error.style.display = "block";
                valid = false;
            } else if (input.value.length > q.maxLength) {
                error.innerText = `Maximum ${q.maxLength} characters allowed`;
                error.style.display = "block";
                valid = false;
            }
        }

        // Radio validation
        if (q.type === "radio") {
            const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (q.required && !selected) {
                error.innerText = "Please select one option";
                error.style.display = "block";
                valid = false;
            }
        }

        // Checkbox validation
        if (q.type === "checkbox") {
            const selected = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
            if (selected.length < q.minSelect || selected.length > q.maxSelect) {
                error.innerText =
                    `Select between ${q.minSelect} and ${q.maxSelect} options`;
                error.style.display = "block";
                valid = false;
            }
        }
    });

    return valid;
}

// Form submission
document.getElementById("surveyForm").addEventListener("submit", e => {
    e.preventDefault();

    if (validateSurvey()) {
        document.getElementById("successMsg").innerText =
            "✅ Survey submitted successfully!";
    }
});
