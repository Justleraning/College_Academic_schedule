function validateForm() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("password-validation");
    
    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var numberRegex = /[0-9]/;
    var specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;

    passwordError.style.display = 'block'; // Show the validation message

    // Validate password
    if (!uppercaseRegex.test(password)) {
        passwordError.textContent = "Password must contain at least one uppercase letter.";
        return false;
    } else if (!lowercaseRegex.test(password)) {
        passwordError.textContent = "Password must contain at least one lowercase letter.";
        return false;
    } else if (!numberRegex.test(password)) {
        passwordError.textContent = "Password must contain at least one number.";
        return false;
    } else if (!specialCharRegex.test(password)) {
        passwordError.textContent = "Password must contain at least one special character.";
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        return false;
    } else {
        passwordError.textContent = "";
        passwordError.className = "valid"; // Optional: set valid class if needed
        // Redirect to email confirmation page
        window.location.href = "emailConfirmation.html";
        return false; // Prevent form submission
    }
}
