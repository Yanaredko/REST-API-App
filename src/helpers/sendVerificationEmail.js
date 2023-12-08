const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://your_domain.com/users/verify/${verificationToken}`;

  const msg = {
    to: email,
    from: 'yanastad@meta.ua', 
    subject: 'Email Verification',
    text: `Please click on the following link to verify your email: ${verificationLink}`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
    throw new Error('Error sending email');
  }
};

module.exports = sendVerificationEmail;
