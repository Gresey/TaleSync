const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./mongodb_connect.js');
const userRoutes=require('./routes/userroutes.js');
const journalRoutes=require('./routes/journalroutes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();


app.use('/user',userRoutes);

app.use('/journal',journalRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
