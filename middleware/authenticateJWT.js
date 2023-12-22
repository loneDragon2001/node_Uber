// authenticateJWT.js

const jwt = require('jsonwebtoken');
const config = require('../config'); // Make sure to adjust the path based on your project structure

const { MongoClient } = require('mongodb');
// const config = require('../config'); // Make sure to adjust the path based on your project structure

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'Mak'; // Change this to your database name

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = client.db(dbName);
const collection1 = db.collection('rider_registration'); // Change this to your collection name
const collection2 = db.collection('user_registration'); // Change this to your collection name


// const loginMiddleware = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     // Replace this with your actual database logic to check the user's credentials
//     const user = await collection.findOne({username, password});

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

//     // Attach the user and token to the request for later use
//     req.user = user;
//     req.token = token;

//     next();
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Assuming collection1 and collection2 are your MongoDB collections
    const user1 = await collection1.findOne({ email, password });
    const user2 = await collection2.findOne({ email, password });

    if (!user1 && !user2) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Choose the user based on the collection where the login is successful
    const user = user1 || user2;

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });

    // Attach the user and token to the request for later use
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = loginMiddleware;
