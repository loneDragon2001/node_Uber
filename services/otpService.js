// Fast2SMSService.js
const axios = require('axios');

class OtpService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
  }

  async sendOtp(otp, phoneNumber) {
    try {
      const route = 'otp';

      const requestBody = {
        route,
        variables_values: otp.toString(),
        numbers: phoneNumber.toString()
      };

      const headers = {
        Authorization: this.apiKey,
        'Content-Type': 'application/json'
      };

      const response = await axios.post(this.apiUrl, requestBody, { headers });

      return response.data;
    } catch (error) {
      throw new Error(`Error sending OTP: ${error.message}`);
    }
  }
}

module.exports = OtpService;
