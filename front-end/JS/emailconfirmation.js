// emailconfirmation.js
document.getElementById("validateCodeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputCode = document.getElementById("verificationCode").value;

    const response = await fetch('/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputCode })
    });

    const data = await response.json();
    document.getElementById("code-validation").textContent = data.message;

    if (data.success) {
        window.location.href = "dashboard.html"; // Redirect on success
    }
});
