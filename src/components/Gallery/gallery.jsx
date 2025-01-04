import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import { useSession } from "../../context/SessionContext";

import './gallery.css';
import { jwtDecode } from "jwt-decode";
import Sidebar from '../Dashboard/sidebar';

const initialImages = [
  { alt: "Image 1", src: "/5.jpg" },
  { alt: "Image 2", src: "/12.jpg" },
  { alt: "Image 3", src: "/16.jpg" },
  { alt: "Image 5", src: "/14.jpg" },
  { alt: "Image 6", src: "/15.jpg" },
  { alt: "Image 4", src: "/13.jpg" }
];

const Gallery = () => {
  const [images, setImages] = useState(initialImages);
  const navigate = useNavigate(); 
  const { token } = useSession();
  const decodedToken = jwtDecode(token);
  const {username,roomId} = decodedToken;
  
  const onInit = () => {
    console.log('LightGallery has been initialized');
  };

  const navigateToDashboard = () => {
    navigate(`/dashboard/${roomId}`); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Add the new image to the images state
        setImages((prevImages) => [
          ...prevImages,
          { alt: file.name, src: reader.result }
        ]);
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  };

  return (
    <div className="gallery-page">
      
      <h1 className="gallery-heading">Gallery</h1>
      <div>
        <button className="btn-dashboard" onClick={navigateToDashboard}>
          Go to Dashboard
        </button>

        {/* Button to Upload Images */}
        <label className="btn-upload">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="gallery-card">
        <LightGallery
          className="lg-container"
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgAutoplay, lgRotate, lgFullscreen, lgShare]}
          mode="lg-slide"
          download={true}
        >
          {images.map((image, index) => (
            <a
              href={image.src}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-img"
              data-download-url={image.src}
            >
              <img
                alt={image.alt}
                src={image.src}
                className="gallery-img-item"
                style={{ width: '20%', height: '20%', margin: '7px', objectFit: 'cover' }}
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </div>
  );
};

export default Gallery;
