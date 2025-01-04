import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './journal.css';
import { useSession } from '../../context/SessionContext';

const Journal = () => {
  const [savedJournals, setSavedJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null); // State for the clicked journal
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const { token } = useSession();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch('http://localhost:5000/journal/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomId: JSON.parse(atob(token.split('.')[1])).roomId, // Extract roomId from JWT
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch journal entries');
        }

        const data = await response.json();
        setSavedJournals(data);
      } catch (error) {
        console.error('Error fetching journals:', error);
        alert('Error loading journals.');
      }
    };

    fetchJournals();
  }, [token]);

  const handleCardClick = (journal) => {
    setSelectedJournal(journal); // Set the selected journal
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setSelectedJournal(null); // Clear the selected journal
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h2 style={{ fontFamily: 'Kalam, cursive', color: '#9427d8', marginTop: '0px' }}>
          Journals
        </h2>
        <Button
          className="add-button"
          onClick={() => navigate('/dashboard/journal')}
        >
          +
        </Button>
      </div>
      <div className="journal-cards-container">
        {savedJournals.length === 0 ? (
          <p style={{   fontSize:'16px',color: '#9427d8' }}>
            No journals found. Start by creating one!
          </p>
        ) : (
          savedJournals.map((journal, index) => (
            <Card
              key={index}
              className="journal-card"
              onClick={() => handleCardClick(journal)} // Add click handler
              style={{ cursor: 'pointer' }} // Add pointer cursor
            >
              <Card.Body>
                <Card.Title>{journal.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By {journal.username}
                </Card.Subtitle>
                <Card.Text className="journal-date">
                  {new Date(journal.date).toLocaleDateString()}
                </Card.Text>
                <Card.Text>{journal.body.slice(0, 20)}...</Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* Modal for displaying full journal content */}
      {selectedJournal && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title  style={{
             
              color: 'white',                // Set text color to black
              
            }}>{selectedJournal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: 'white', // Keep the background white for better readability
              color: 'black',                // Set text color to black
              padding: '10px',
            }}
          >
            <p
              style={{
                backgroundColor: 'white', // Keep the background white for better readability
                color: 'black',       // Add a light background for contrast
                padding: '5px',
                fontSize: '1.1em',
                borderRadius: '5px',

              }}
            >
              <strong>Date:</strong>{' '}
              {new Date(selectedJournal.date).toLocaleDateString()}
            </p>
            <hr />
            <p
              style={{
                backgroundColor: 'white', // Keep the background white for better readability
                color: 'black',       // Add a light background for contrast
                padding: '5px',
                borderRadius: '5px',
                fontSize: '1.1em',
              }}
            >{selectedJournal.body}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Journal;
