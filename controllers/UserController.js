
const UserService = require("../services/UserService");
const userService = new UserService();
const jwt = require("jsonwebtoken");
const config = require('../config'); // Make sure to adjust the path based on your project structure


const UserController = {
  sendUserData: async (req, res) => {
    try {
      if (!req.body.userData) {
        throw new Error("userData is missing in the request body");
      }
      // const userData = req.body;
      const userData = JSON.parse(req.body.userData);
      const userPhotoBase64 = req.files["userPhoto"];
      const result = await userService.userDetails(userData,userPhotoBase64);

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; 
      const decodedToken = jwt.verify(token, config.jwtSecret); 
    
      const userEmail = decodedToken.email; 

      const user = await userService.getUserByEmail(userEmail);

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;
