const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/emailSender');

const emailBody = (message) => `
  <div style="padding: 20px; font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9;">
    <div style="background-color: #FFFFFF; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px;">${message}</p>
    </div>
  </div>
`;

exports.sendEmails = async (req, res) => {
    const { subject, message } = req.body;

    try {
        const subscribers = await Subscriber.find();
        const emailList = subscribers.map(sub => sub.email);
        await sendEmail(emailBody(message), emailList, subject);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send emails' });
    }
};