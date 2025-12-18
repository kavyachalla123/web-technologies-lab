document.getElementById("registerForm").addEventListener("submit", function (e) {
    let termsChecked = document.getElementById("terms").checked;

    if (!termsChecked) {
        alert("Please accept the Terms & Conditions");
        e.preventDefault();
    } else {
        alert("Registration Successful!");
    }
});
