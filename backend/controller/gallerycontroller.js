const Image = require('../model/images'); 
const jwt = require('jsonwebtoken'); 


exports.SaveGalleryImages = async (req, res) => {
  try {
    const { token, imageData } = req.body; // Get token and imageData from the request body
    const decodedToken = jwt.decode(token);  // Decode the JWT token
    const { username, roomId } = decodedToken;  // Extract username and roomId from the token

    const newImage = new Image({
      username,
      roomId,  // Use roomId from the decoded token
      url: imageData,  // Save the base64 string or URL of the image
    });

    await newImage.save();

    res.status(200).json({ message: 'Image saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save image' });
  }
};



exports.GetGalleryImages = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
    const { roomId } = decodedToken;

    const images = await Image.find({ roomId });
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }
    res.status(500).json({ message: 'Failed to retrieve images' });
  }
};
