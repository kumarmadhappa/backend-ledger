const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');    


/**
 * Registration controller
 * 
 * This controller handles user registration functionality.
 * It interacts with the User model to create new users.
 */

async function register(req, res) {
    try {
        const { email, name, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const newUser = new userModel({ email, name, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('token', token);

        res.status(201).json({ message: 'User registered successfully' ,
             user: { email: newUser.email, name: newUser.name },
             token  
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message  });
    }
    
}

/** 
 *  Login controller    
 * 
 * This function handles user login by verifying the provided email and password against the stored user data.
 * It returns a success message if the credentials are valid, or an error message if they are not.
 */
 
async function login(req, res) {
    try {
        const { email, password } = req.body;

        console.log('Login attempt with email:', email);

        // Find user by email and include password field
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('token', token);

        res.status(201).json({ message: 'Login successful',
             user: { email: user.email, name: user.name }, 
             token 
            });

    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}       


module.exports = {
    register,
    login
}