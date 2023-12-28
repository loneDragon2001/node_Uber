const RiderService = require("../services/RiderService");
const riderService = new RiderService();

const RiderController = {
  sendRiderData: async (req, res) => {
    try {
      if (!req.body.userData) {
        return res
          .status(400)
          .json({ error: "Invalid request. Missing userData." });
      }

      // Assuming req.body contains the user data
      const userData = JSON.parse(req.body.userData); // Parse the JSON string

      // Access file buffers from req.files
      const rcPhotoBase64 = req.files["rcPhoto"];
      const proofOfIdentityBase64 = req.files["proofOfIdentity"];
      const proofOfAddressBase64 = req.files["proofOfAddress"];

      // Call the service function
      const result = await riderService.postRiderData(
        userData,
        rcPhotoBase64,
        proofOfIdentityBase64,
        proofOfAddressBase64
      );

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      if (error.status && error.message) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  getAllData: async (req, res) => {
    try {
      // Call the service function to get all riders
      const allRiders = await riderService.getAllRiders();

      res.status(200).json(allRiders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = RiderController;
