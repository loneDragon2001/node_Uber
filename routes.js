const express = require('express');
const loginMiddleware = require('./middleware/authenticateJWT');
const UserController = require('./controllers/UserController');
const RiderController = require('./controllers/riderController');

const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage ,limits: { fileSize: 1024 * 1024 }});


router.get('/api/users', UserController.getAllUsers);



router.post('/api/sendUserData', UserController.sendUserData);


router.post('/api/sendRiderData', upload.fields([{ name: 'rcPhoto' }, { name: 'proofOfIdentity' }, { name: 'proofOfAddress' }]), RiderController.sendRiderData);

router.get('/api/getRiderData', RiderController.getAllData);


router.post('/api/login', loginMiddleware, (req, res) => {
    res.json({ token: req.token });
  });

module.exports = router;
