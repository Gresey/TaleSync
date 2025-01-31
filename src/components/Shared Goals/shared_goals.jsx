import React, { useState, useEffect } from 'react';
import { Icon, Tooltip } from '@mui/material';
import { Modal } from 'react-bootstrap';
import './shared_goals.css';
import { useSession } from '../../context/SessionContext';
import Sidebar from '../Dashboard/sidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SharedGoals = () => {
  const { token } = useSession(); 

  const [sharedGoals, setSharedGoals] = useState([]);
  const [addNewGoalModal, setAddNewGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate function

  // Decode token to get roomId safely
  useEffect(() => {
    try {
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setRoomId(decodedToken?.roomId || '');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setRoomId(''); // Set a default value to avoid issues
    }
  }, [token]);

  // Fetch goals when roomId is available
  useEffect(() => {
    if (!roomId) return;

    const fetchGoals = async () => {
      try {
        const response = await fetch(`http://localhost:5000/goal/${roomId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch goals');
        const data = await response.json();
        setSharedGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [roomId, token]);

  // Function to add a new goal
  const handleAddGoal = async () => {
    if (!newGoalTitle.trim() || !roomId) return;

    try {
      const response = await fetch('http://localhost:5000/goal/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newGoalTitle, roomId }),
      });

      if (!response.ok) throw new Error('Failed to add goal');
      const newGoal = await response.json();

      setSharedGoals([...sharedGoals, newGoal]);
      setNewGoalTitle('');
      setAddNewGoalModal(false);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Function to add user to a goal
  const handleJoinGoal = async (goalId) => {
    try {
      console.log("Joining Goal:", goalId); // Debugging
  
      const response = await fetch(`http://localhost:5000/goal/${goalId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        if (response.status === 400) {
          alert("User already added to this goal!");
        }
        throw new Error(result.message || "Failed to join goal");
      }
  
      setSharedGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === goalId ? result : goal))
      );
    } catch (error) {
      console.error("Error joining goal:", error);
    }
  };

  return (
    <div className="shared-goals-div">
      <Sidebar />
      
    

      <div className="goal-row">
        <h1 className="goals-heading">Shared Goals</h1>
        <button className="add-goal-button" onClick={() => setAddNewGoalModal(true)}>
          +
        </button>
      </div>

      <div className="goals-container">
          {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &lt; 
      </button>
        {sharedGoals.map((goal) => (
          <div className="goals-card" key={goal._id}>
            <h3 className="goal-title">{goal.title}</h3>

            <div className="goal-users">
              {goal.users.map((user, userIndex) => (
                <Tooltip key={userIndex} title={user?.username || "Unknown"} arrow>
                  <Icon className="user-icon">{user?.username?.charAt(0) || "?"}</Icon>
                </Tooltip>
              ))}
            </div>

            <button className="set-yes" onClick={() => handleJoinGoal(goal._id)}>
              On it
            </button>
          </div>
        ))}
      </div>

      {addNewGoalModal && (
        <Modal show={addNewGoalModal} onHide={() => setAddNewGoalModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="Goal Title"
              className="goal-input"
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="goal-button" onClick={handleAddGoal}>
              Add
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SharedGoals;
