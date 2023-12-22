
const UserService = require("../services/UserService");
const userService = new UserService();


const UserController = {
  sendUserData: async (req, res) => {
    try {
      const userData = req.body;
      const result = await userService.userDetails(userData);

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
