const express = require('express');
const router = express.Router();
const Goal=require('../model/sharedgoal');
const authMiddleware = require('../middleware/authenticate');

// Get all goals for a specific room
router.get('/:roomId', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ roomId: req.params.roomId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new goal and add the creator as the first user
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { title, roomId } = req.body;
    const { userId, name } = req.user; // Extract user info from JWT

    const newGoal = new Goal({
      title,
      roomId,
      users: [{ userId, name }]
    });

    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add user to an existing goal
router.post('/:goalId/join', authMiddleware, async (req, res) => {
  try {
    console.log("Goal ID:", req.params.goalId); // Debugging
    console.log("User Data:", req.user);

    const { userId, name } = req.user;
    if (!userId || !name) {
      return res.status(401).json({ message: "Unauthorized: Missing user data" });
    }

    // Find goal by `_id`
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    // Check if user is already in the goal
    if (goal.users.some(user => user.userId.toString() === userId)) {
      return res.status(400).json({ message: "User already added" });
    }

    goal.users.push({ userId, name });
    await goal.save();

    res.json(goal);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
