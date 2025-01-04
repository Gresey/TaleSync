const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');


exports.SignUpuser=async(req,res)=>{
     const { username, email, password } = req.body;
    
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
    
            const newUser = new User({ username, email, password });
            await newUser.save();
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error registering user', error: err });
        }

}
exports.Loginuser=async(req,res)=>{
   
      const { email, password, roomId } = req.body;
    
      if (!roomId) {
        return res.status(400).json({ message: "Room ID is required" });
      }
    
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        const token = jwt.sign(
          { id: user._id, username: user.username, roomId },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        res.status(200).json({
          message: "Login successful",
          token,
          username: user.username,
          roomId,
        });
      } catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
      }
    };
    
