const express = require('express');
const loginMiddleware = require('./middleware/authenticateJWT');
const UserController = require('./controllers/UserController');
const RiderController = require('./controllers/riderController');
const otpController = require('./controllers/otpController')
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage ,limits: { fileSize: 1024 * 1024 }});


router.get('/api/users', UserController.getAllUsers);

router.get('/api/user', UserController.getUserByEmail);

router.post('/api/sendUserData', upload.fields([{ name: 'userPhoto' }]), UserController.sendUserData);


router.post('/api/sendRiderData', upload.fields([{ name: 'rcPhoto' }, { name: 'proofOfIdentity' }, { name: 'proofOfAddress' }]), RiderController.sendRiderData);

router.get('/api/getRiderData', RiderController.getAllData);


router.post('/api/login', loginMiddleware, (req, res) => {
    res.json({ token: req.token });
  });

router.post('/api/sendOtp', otpController.sendOtp);

router.post('/api/verifyOtp', otpController.verifyOtp);



module.exports = router;
