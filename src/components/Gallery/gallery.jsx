import React, { useState, useEffect } from 'react';
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
import { useSession } from '../../context/SessionContext';
import './gallery.css';
import { jwtDecode } from "jwt-decode";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { token } = useSession();
  const decodedToken = jwtDecode(token);
  const { username, roomId } = decodedToken;

  // Fetch images on component mount
 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!token) {
          console.error('Authorization token is missing');
          throw new Error('Authorization token missing or invalid');
        }
  
        const response = await fetch('http://localhost:5000/gallery/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching images:', errorData.message);
          throw new Error(errorData.message || 'Failed to fetch images');
        }
  
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, [token]);
  
    
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const imageData = reader.result;
    
          try {
            const response = await fetch('http://localhost:5000/gallery/save', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token,
                imageData,
              }),
            });
    
            const result = await response.json();
            if (response.ok) {
              setImages(prev => [...prev, { alt: file.name, src: imageData }]);
            } else {
              alert(result.message);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
  const onInit = () => {
    console.log('LightGallery has been initialized');
  };

  const navigateToDashboard = () => {
    navigate(`/dashboard/${roomId}`);
  };

 

  return (
    <div className="gallery-page">
      <h1 className="gallery-heading">Gallery</h1>
      <div>
        <button className="btn-dashboard" onClick={navigateToDashboard}>
          Go to Dashboard
        </button>
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
  {Array.isArray(images) && images.length > 0 ? (
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
  ) : (
    <p className="no-images-message">No images in the gallery. Upload an image to get started!</p>
  )}
</div>

    </div>
  );
};

export default Gallery;
