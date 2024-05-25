// routes/subscriptionRoutes.js
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const {subscribeNow, sendEmails} = require('../controllers/subscriptionController');
const {sendOtp, verifyOtp} = require('../controllers/otpController');
const router = express.Router();

// Send email to all subscribers
router.post('/sendEmails', authMiddleware, sendEmails);

router.post('/sendOtp', sendOtp);

router.post('/verifyOtp', verifyOtp);

module.exports = router;
