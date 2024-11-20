document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form default submission

    const email = document.getElementById('email').value;
    if (!email) {
        alert('Please enter a valid email');
        return;
    }

    fetch('/emailconfirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(`Network response was not OK: ${errorData.message || response.statusText}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        alert(data.message); // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    });
});
