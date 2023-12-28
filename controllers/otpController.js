// otpController.js
const OtpService = require('../services/otpService');
const randomstring = require('randomstring');

const apiKey = 'OejJKtH6bYRTXMnnDXM7NtrHFJUNd176MngjRw6lPpctDly4x7L5oz1Tebvn'; // Replace with your actual fast2sms API key
const otpService = new OtpService(apiKey);

const generateOtp = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
};

const storedOtps = {}; // To store OTPs temporarily, you might want to use a database in a real application

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOtp();
    const response = await otpService.sendOtp(otp, phoneNumber);
    storedOtps[phoneNumber] = otp;
    res.json({ success: true, message: 'OTP sent successfully', response });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = (req, res) => {
  try {
    const { phoneNumber, enteredOtp } = req.body;
    const storedOtp = storedOtps[phoneNumber];

    if (storedOtp && enteredOtp === storedOtp) {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

module.exports = { sendOtp, verifyOtp };
