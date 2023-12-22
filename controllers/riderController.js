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
      const rcPhotoBuffer = req.files["rcPhoto"][0].buffer;
      const proofOfIdentityBuffer = req.files["proofOfIdentity"][0].buffer;
      const proofOfAddressBuffer = req.files["proofOfAddress"][0].buffer;

      const rcPhotoBase64 = rcPhotoBuffer.toString("base64");
      const proofOfIdentityBase64 = proofOfIdentityBuffer.toString("base64");
      const proofOfAddressBase64 = proofOfAddressBuffer.toString("base64");

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
      res.status(500).json({ error: "Internal Server Error" });
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
