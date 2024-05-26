require('dotenv').config();
const nodemailer = require('nodemailer');

const emailHeader = `
  <div style="background-color:#084c53; padding: 15px; text-align: center;">
    <h1 style="color: #fff; margin: 0;">Airdrop Info</h1>
  </div>
`;

const emailFooter = `
  <div style="background-color:#084c53; padding: 15px; text-align: center;">
    <p style="color: #fff; margin: 0;">&copy; 2024 Airdrop Info. All rights reserved.</p>
    <p style="margin: 0;"><a href="https://airdropinfo.netlify.app" style="color: #FFD700;">Visit our website</a></p>
  </div>
`;

const generateEmailHtml = (bodyObject) => `
  <div style="background-color:#fff; border: 1px solid #ddd; max-width: 600px; margin: auto;">
    ${emailHeader}
    <div style="padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: center;">
      ${bodyObject}
    </div>
    ${emailFooter}
  </div>
`;

async function sendEmail(bodyObject, emailList, subject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    bcc: emailList,
    subject: subject,
    html: generateEmailHtml(bodyObject),
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
