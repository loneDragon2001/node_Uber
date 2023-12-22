const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Uber-like App API is running');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
