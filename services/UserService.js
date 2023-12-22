// UserService.js
const User = require("../models/User");
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'Mak';

class UserService{
    async userDetails(userData) {
        try {
          // Check if email or mobile already exists
          const existingUser = await User.findOne({
            $or: [
              { email: userData.email },
              { mobile: userData.mobile },
            ],
          });
    
          if (existingUser) {
            throw new Error('User already registered with this email or phone number');
          }
    
          // Create a new user using the User model
          const newUser = new User(userData);
    
          // Save the new user to the database
          const savedUser = await newUser.save();
    
          return { message: 'Data inserted successfully', insertedId: savedUser._id };
        } catch (error) {
          console.error(error);
          throw new Error('Internal Server Error');
        }
      }

      async getAllUsers() {
        try {
          const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
          await client.connect();
    
          const db = client.db(dbName);
          const collection = db.collection('user_registration'); // Change this to your collection name
          const users = await collection.find().toArray();
    
          await client.close();
    
          if (!users || users.length === 0) {
            throw new Error('User not found');
          }
    
          return users;
        } catch (error) {
          console.error(error);
          throw new Error('Internal Server Error');
        }
      }
}

module.exports = UserService;
