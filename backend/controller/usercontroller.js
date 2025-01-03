import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';


const SignUpuser=async(req,res)=>{
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
const Loginuser=async(req,res)=>{
    const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.status(200).json({ token, message: 'Login successful' });
        } catch (err) {
            res.status(500).json({ message: 'Error logging in', error: err });
        }
}

export {SignUpuser,Loginuser}