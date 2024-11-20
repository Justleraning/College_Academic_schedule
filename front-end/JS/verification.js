document.getElementById('verificationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const code = document.getElementById('verificationCode').value;

    fetch('/verify-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: sessionStorage.getItem('userEmail'), code }) // Assuming email is stored on submission
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Code verified. Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Invalid or expired code');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('resendButton').addEventListener('click', function() {
    fetch('/send-email-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: sessionStorage.getItem('userEmail') })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Verification code resent to your email.');
        } else {
            alert('Failed to resend verification code.');
        }
    })
    .catch(error => console.error('Error:', error));
});
