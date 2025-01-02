import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-datepicker/dist/react-datepicker.css';
import './journal.css';
import Sidebar from '../Dashboard/sidebar';

const AddJournal = ({ onSave }) => {
  const [newJournal, setNewJournal] = useState({
    title: "",
    content: "",
    author: "",
    date: new Date(),
  });

  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default background color

  const navigate = useNavigate(); // Initialize navigate

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newJournal.title && newJournal.content && newJournal.author) {
      onSave(newJournal);
      setNewJournal({ title: "", content: "", author: "", date: new Date() });
    }
  };

  const handleEditorChange = (content) => {
    setNewJournal({ ...newJournal, content });
  };

  const handleDateChange = (date) => {
    setNewJournal({ ...newJournal, date });
  };

  return (
    <div
      className="add-journal-fullscreen"
      style={{ backgroundColor }}
    >
      <Sidebar/>
      <div className="header-controls"  style={{ marginTop:'0px'}}>
        <Button
          onClick={() => navigate('/dashboard')} // Navigate back to the previous page
          style={{
            background: 'transparent',
            border: '1px solid #9427d8',
            color: '#9427d8',
            marginRight: '10px',
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleFormSubmit}
          style={{
            background: 'linear-gradient(90deg, #b150bc, #9427d8)',
            border: 'none',
            color: '#fff',
          }}
        >
          Save
        </Button>
      </div>
      <div className="form-container">
        <div className="form-item date-picker">
          <DatePicker
            selected={newJournal.date}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="transparent-input"
          />
        </div>
        <div className="form-item author-field">
          <Form.Control
            type="text"
            placeholder="Enter the title of your journal"
            value={newJournal.title}
            onChange={(e) => setNewJournal({ ...newJournal, title: e.target.value })}
            className="transparent-input"
          />
        </div>
      </div>
      <div className="editor-card">
        <Editor
          apiKey="t14lxqbf6efawc0k9euu9hsri4n0407w53hn3chk1ye3gpyq"
          value={newJournal.content}
          onEditorChange={handleEditorChange}
          init={{
            height: 450,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar: `bold italic | alignleft aligncenter alignright | bullist numlist | help`,
            content_style: `
              body {
                background-color: transparent !important;
                color: #9427d8;
                font-family: 'Kalam', cursive;
              }
            `,
            toolbar_location: 'bottom',
          }}
        />
      </div>
    </div>
  );
};

export default AddJournal;
