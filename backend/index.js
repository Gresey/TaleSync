const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./mongodb_connect.js');
const User = require('./model/user.js');
const { Loginuser, SignUpuser } = require('./controller/usercontroller.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to Database
connectDB();


app.post('/signup', SignUpuser);

// Login
app.post('/login', Loginuser);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
