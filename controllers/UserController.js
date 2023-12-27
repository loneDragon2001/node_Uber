
const UserService = require("../services/UserService");
const userService = new UserService();


const UserController = {
  sendUserData: async (req, res) => {
    try {
      if (!req.body.userData) {
        throw new Error("userData is missing in the request body");
      }
      // const userData = req.body;
      const userData = JSON.parse(req.body.userData);
      const userPhotoBuffer = req.files["userPhoto"][0].buffer;
      const userPhotoBase64 = userPhotoBuffer.toString("base64");
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
};

module.exports = UserController;
