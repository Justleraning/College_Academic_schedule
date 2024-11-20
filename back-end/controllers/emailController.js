const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating the verification code

// Store codes temporarily (in production, store in a secure database)
const verificationCodes = new Map();

const sendEmailConfirmation = (req, res) => {
    const { email } = req.body;
    const verificationCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit code
    const expirationTime = Date.now() + 5 * 60 * 1000; // Code valid for 5 minutes

    // Save verification code and expiration time
    verificationCodes.set(email, { code: verificationCode, expires: expirationTime });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your password reset verification code is: ${verificationCode}. This code is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
};

// Verification route to check the code entered by the user
const verifyCode = (req, res) => {
    const { email, code } = req.body;
    const storedData = verificationCodes.get(email);

    if (storedData && storedData.code === code) {
        if (Date.now() < storedData.expires) {
            verificationCodes.delete(email); // Clear code after successful verification
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Code expired' });
        }
    } else {
        res.json({ success: false, message: 'Invalid code' });
    }
};

module.exports = { sendEmailConfirmation, verifyCode };
