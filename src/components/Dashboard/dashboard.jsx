import React, { useState, useEffect } from 'react';
import galleryimage from './../../assets/gallery.jpg';
import Journalimage from './../../assets/image.png';
import Goalimage from './../../assets/goal.png';
import './dashboard.css';
import Sidebar from './sidebar';
import GradientCard from './card';
import Journal from '../Journal/journal';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { use } from 'react';

export default function Dashboard() {
  const [viewJournal, setViewJournal] = useState(false);
  const [viewSidebar, setViewSidebar] = useState(true);
  const navigate = useNavigate();
  const { code } =useParams();
  // Ensure the sidebar is shown when the dashboard is first rendered
  useEffect(() => {
    setViewSidebar(true);
  }, []);

  // Function to handle card click
  const handleCardClick = (cardType) => {
    if (cardType === 'journal') {
      setViewSidebar(false); // Hide the sidebar
      setViewJournal(true);  // Show the Journal component
    } else if (cardType === 'gallery') {
      setViewSidebar(false); // Hide the sidebar
      navigate('/gallery');  // Navigate to the Gallery page
    }else if(cardType==='goals'){
      setViewSidebar(true); // Hide the sidebar
      navigate(`/dashboard/sharedgoals/${code}`);  // Navigate to the Shared Goals page
    }
  };

  // Function to reset the dashboard view
  const resetToDashboard = () => {
    setViewJournal(false);  // Hide the Journal component
    setViewSidebar(true);   // Show the Sidebar
  };

  return (
    <div className="dashboard-container">
     <Sidebar /> {/* Render Sidebar only when viewSidebar is true */}

      <div className="dashboard-content">
        {viewJournal ? (
          <>
            <button className="btn-back" onClick={resetToDashboard}>
              Back to Dashboard
            </button>
            <Journal />
          </>
        ) : (
          <div className="dashboard-card-container">
            <GradientCard
              imagesrc={Journalimage}
              title="Write Journal"
              onClick={() => handleCardClick('journal')}
            />
            <span> </span>
            <GradientCard
              imagesrc={galleryimage}
              title="Share Photos"
              onClick={() => handleCardClick('gallery')} // Trigger gallery navigation
            />
            <span> </span>
            <GradientCard
              imagesrc={Goalimage}
              title="Shared Goals"
              onClick={() => handleCardClick('goals')} // Trigger gallery navigation
            />
          </div>
        )}
      </div>
    </div>
  );
}
