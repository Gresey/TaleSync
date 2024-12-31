import React from 'react';

import galleryimage from './../../assets/gallery.jpg';
import Journalimage from './../../assets/image.png';

import './dashboard.css';
import Sidebar from './sidebar';
import GradientCard from './card';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-card-container">
          <GradientCard imagesrc={Journalimage} title="Write Journal" />
        </div>
        <div className="dashboard-card-container">
          <GradientCard imagesrc={galleryimage} title="Share Photos" />
        </div>
      </div>
    </div>
  );
}