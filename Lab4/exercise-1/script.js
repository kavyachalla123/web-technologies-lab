const usernameInput = document.getElementById("username");
const message = document.getElementById("message");
const loader = document.getElementById("loader");
const form = document.getElementById("registerForm");

let isAvailable = false;

// Real-time check
usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim().toLowerCase();

    if (username.length < 3) {
        message.textContent = "Username must be at least 3 characters";
        message.className = "taken";
        isAvailable = false;
        return;
    }

    loader.classList.remove("hidden");
    message.textContent = "";

    // Simulate delay like real server
    setTimeout(() => {
        fetch("users.json")
            .then(response => response.json())
            .then(data => {
                loader.classList.add("hidden");

                if (data.usernames.includes(username)) {
                    message.textContent = "❌ Username already taken";
                    message.className = "taken";
                    isAvailable = false;
                } else {
                    message.textContent = "✅ Username available";
                    message.className = "available";
                    isAvailable = true;
                }
            })
            .catch(error => {
                loader.classList.add("hidden");
                message.textContent = "Error checking username";
                message.className = "taken";
                isAvailable = false;
            });
    }, 800); // delay for better UI
});

// Prevent submission if unavailable
form.addEventListener("submit", (e) => {
    if (!isAvailable) {
        e.preventDefault();
        alert("Please choose an available username before submitting.");
    } else {
        alert("Registration Successful!");
    }
});
