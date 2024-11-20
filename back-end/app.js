const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/sdb'); // Import database connection
const path = require('path'); // To handle file paths
const { sendEmailConfirmation } = require('./controllers/emailController'); // Import email controller
const app = express();

const generatedCodeMap = new Map(); // Store codes temporarily for each email

// Serve static files from the front-end
app.use(express.static(path.join(__dirname, '../front-end/style')));
app.use(express.static(path.join(__dirname, '../front-end/JS')));

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Needed for JSON data parsing

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/html/login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM teachers WHERE email = ? AND password = ?`;

    db.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendFile(path.join(__dirname, '../front-end/html/dashboard.html'));
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Handle signup form submission (to send confirmation email)
app.post('/signup', (req, res) => {
    const { email } = req.body;

    // Generate a verification code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    generatedCodeMap.set(email, { code: generatedCode, expiry: Date.now() + 5 * 60 * 1000 });

    // Send confirmation email with the generated code
    sendEmailConfirmation(email, generatedCode);
    res.json({ message: 'Signup successful, confirmation email sent.' });
});

// Handle preferences saving
app.post('/save-preferences', (req, res) => {
    const { preferred_times } = req.body;
    const teacher_id = 1; // Placeholder; use session or actual teacher ID in a real app
    const query = `UPDATE teachers SET preferred_times = ? WHERE teacher_id = ?`;

    db.query(query, [preferred_times, teacher_id], (err) => {
        if (err) throw err;
        res.send('Preferences saved');
    });
});

// Handle email confirmation code validation
app.post('/validate-code', (req, res) => {
    const { email, inputCode } = req.body;
    const storedData = generatedCodeMap.get(email);

    if (storedData && storedData.code === inputCode) {
        if (Date.now() < storedData.expiry) {
            generatedCodeMap.delete(email); // Remove the code once validated
            res.json({ success: true, message: 'Code validated successfully!' });
        } else {
            res.json({ success: false, message: 'Code expired. Please request a new code.' });
        }
    } else {
        res.json({ success: false, message: 'Invalid code. Please try again.' });
    }
});

// Handle forgot password request to send a verification code
app.post('/emailconfirmation', (req, res) => {
    const { email } = req.body;

    // Generate a new verification code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    generatedCodeMap.set(email, { code: generatedCode, expiry: Date.now() + 5 * 60 * 1000 });

    // Send email with the verification code
    sendEmailConfirmation(email, generatedCode);
    res.json({ message: 'Verification code sent to your email.' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
