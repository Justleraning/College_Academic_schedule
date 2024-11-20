document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        event.preventDefault();
    }
});
