import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './journal.css';

const Journal = () => {
  const [savedJournals, setSavedJournals] = useState([
    {
      title: "My First Journal",
      content: "Today was an amazing day! I explored the park and enjoyed the fresh air.",
      author: "Alice Johnson",
      date: "24 December 2024", // Added date
    },
    {
      title: "Work Updates",
      content: "Completed the first phase of the project. Team collaboration was excellent.",
      author: "Bob Smith",
      date: "12 December 2024", // Added date
    },
    {
      title: "Travel Diary",
      content: "Visited the mountains, and the view was breathtaking. Can't wait to go back!",
      author: "Clara Davis",
      date: "5 November 2024", // Added date
    },
    {
      title: "My First Journal",
      content: "Today was an amazing day! I explored the park and enjoyed the fresh air.",
      author: "Alice Johnson",
      date: "24 December 2024", // Added date
    },
    {
      title: "Work Updates",
      content: "Completed the first phase of the project. Team collaboration was excellent.",
      author: "Bob Smith",
      date: "12 December 2024", // Added date
    },
    {
      title: "Travel Diary",
      content: "Visited the mountains, and the view was breathtaking. Can't wait to go back!",
      author: "Clara Davis",
      date: "5 November 2024", // Added date
    },
    
  ]);

  const navigate = useNavigate();

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h2 style={{fontFamily:'Kalam,cursive',color:'#9427d8',marginTop:'0px'}}>Journals</h2>
        <Button
          className="add-button"
          onClick={() => navigate('/dashboard/journal')}
        >
          +
        </Button>
      </div>
      <div className="journal-cards-container">
  {savedJournals.map((journal, index) => (
    <Card key={index} className="journal-card">
      <Card.Body>
        <Card.Title >{journal.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          By {journal.author}
        </Card.Subtitle>
        <Card.Text className="journal-date">{journal.date}</Card.Text> {/* Added Date */}
        <Card.Text>{journal.content.slice(0, 20)}...</Card.Text>
      </Card.Body>
    </Card>
  ))}
</div>

    </div>
  );
};

export default Journal;
