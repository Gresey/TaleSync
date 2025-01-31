const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./mongodb_connect.js');
const userRoutes=require('./routes/userroutes.js');
const journalRoutes=require('./routes/journalroutes.js');
const galleryRoutes=require('./routes/galleryroutes.js');
const goalroutes=require('./routes/goalroutes.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();


app.use('/user',userRoutes);

app.use('/journal',journalRoutes);

app.use('/gallery',galleryRoutes);

app.use('/goal',goalroutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});