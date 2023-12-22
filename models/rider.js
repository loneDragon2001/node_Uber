const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/Mak';

const connection = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const riderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  Vehiclemodel: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  vehicleofType: {
    type: String,
    required: true,
  },
 
  ChasisNo: {
    type: Number,
    required: true,
  },
  
  EngineNo: {
    type: String,
    required: true,
  },
  rcPhoto: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  proofOfIdentity: {
    type: String,
    required: true,
  },
  proofOfAddress: {
    type: String,
    required: true,
  },
  drivingLicenseNumber: {
    type: String,
    required: true,
  },
  issuingAuthority: {
    type: String,
    required: true,
  },
  bankAccountDetails: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  others: {
    type: String,
    required: true,
  }
});

const Rider = connection.model('Rider', riderSchema,'rider_registration');

module.exports = Rider;
