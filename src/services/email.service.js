
function transporter() {
  console.log('Email transporter initialized');
}

const sendEmail = async (to, subject, text, html) => {
  console.log(`Email sent to: ${to}, Subject: ${subject}`);
};

async function sendRegistrationEmail(userEmail, userName) {
    const subject = 'Welcome to Ledger App!';
    const text = `Hi ${userName},\n\nThank you for registering with our service! We're excited to have you on board.\n\nBest regards,\nThe Ledger App Team`;
    const html = `<p>Hi ${userName},</p><p>Thank you for registering with our service! We're excited to have you on board.</p><p>Best regards,<br>The Ledger App Team</p>`;    
    console.log(`Sending registration email to: ${userEmail}, \nSubject: ${subject}, \nText: ${text}, \nHTML: ${html}\n`);

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendRegistrationEmail
};  