const express = require('express');
const router = express.Router();
const { SaveGalleryImages, GetGalleryImages } = require('../controller/gallerycontroller');
const authenticate = require('../middleware/authenticate');
const cors = require('cors');

router.post('/save', cors(),authenticate, SaveGalleryImages);
router.post('/get', cors(),authenticate, GetGalleryImages);

module.exports = router;