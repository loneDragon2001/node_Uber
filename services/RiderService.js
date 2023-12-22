const Rider = require("../models/rider");

class RiderService {
  async postRiderData(userData, rcPhotoBase64, proofOfIdentityBase64, proofOfAddressBase64){
    try {
      // Check if email or mobile already exists
      const existingUser = await Rider.findOne({
        $or: [
          { email: userData.email },
          { mobileNo: userData.mobileNo },
        ],
      });

      if (existingUser) {
        throw new Error('User already registered with this email or phone number');
      }

      // Create a new user using the Rider model
      const newUser = new Rider(userData);

      // Add file buffers to the user object
      newUser.rcPhoto = rcPhotoBase64;
      newUser.proofOfIdentity = proofOfIdentityBase64;
      newUser.proofOfAddress = proofOfAddressBase64;

      // Save the new user to the database
      const savedUser = await newUser.save();

      return { message: 'Data inserted successfully', insertedId: savedUser._id };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async getAllRiders(){
    try {
      // Retrieve all riders from the database
      const allRiders = await Rider.find();

      return allRiders;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
};

module.exports = RiderService;
