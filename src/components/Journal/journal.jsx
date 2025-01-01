import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AddJournal from './newjournalpage';
import './journal.css';

const Journal = () => {
  const [savedJournals, setSavedJournals] = useState([
    {
      title: "My First Journal",
      content: "Today was an amazing day! I explored the park and enjoyed the fresh air.",
      author: "Alice Johnson",
    },
    {
      title: "Work Updates",
      content: "Completed the first phase of the project. Team collaboration was excellent.",
      author: "Bob Smith",
    },
    {
      title: "Travel Diary",
      content: "Visited the mountains, and the view was breathtaking. Can't wait to go back!",
      author: "Clara Davis",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleSaveJournal = (newJournal) => {
    setSavedJournals([...savedJournals, newJournal]);
    setShowForm(false);
  };

  return (
    <div className="journal-container">
     

      {showForm==false? <>
        <div className="journal-header">
        <h2>Journals</h2>
        <Button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + 
        </Button>
      </div><div className="journal-grid">
        {savedJournals.map((journal, index) => (
          <Card key={index} className="journal-card">
            <Card.Header>
              <Card.Title>{journal.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">By {journal.author}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Card.Text>{journal.content.slice(0, 100)}...</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div></> :<AddJournal onSave={handleSaveJournal} />}

      
    </div>
  );
};

export default Journal;
