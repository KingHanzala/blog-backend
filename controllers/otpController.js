// controllers/subscriptionController.js
const Otp = require('../models/Otp');
const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/emailSender');

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    return res.status(400).send('Subscriber already exists');
  }
  try {
    await Otp.create({ email, otp });

    const bodyObject = `<p>Your OTP is: <strong>${otp}</strong></p>`;
    await sendEmail(bodyObject, [email], 'Your OTP for Airdrop Info Subscription');
    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP.' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    await Subscriber.create({ email });
    const bodyObject = `<p>Your subscription is successful. Exciting days ahead!</strong></p>`;
    await sendEmail(bodyObject, [email], 'Airdrop Info: Subscribed Successfully');
    await Otp.deleteMany({ email }); // Clear OTPs for the email after successful verification

    res.status(200).json({ success: true, message: 'Subscription successful.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP.' });
  }
};
