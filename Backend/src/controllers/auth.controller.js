const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenBlacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');

/**
 * @name registerUserController
 * @description Register a new user
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please provide all the required fields'
            });
        }

        // Check if user already exists
        const isUserExist = await userModel.findOne({
            $or: [{ name }, { email }]
        });

        if (isUserExist) {
            return res.status(400).json({
                message: 'Account with this name or email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name
            },
            process.env.Jwt_Secret_key,
            {
                expiresIn: '1d'
            }
        );

        // Store token in cookie
        res.cookie('token', token);

        // Send response
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message
        });
    }
}


/**
 * @name loginUserController
 * @description Login an existing user
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { name, password } = req.body;

        // Validate required fields
        if (!name || !password) {
            return res.status(400).json({
                message: 'Please provide all the required fields'
            });
        }

        // Find user
        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid name or password'
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid name or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name
            },
            process.env.Jwt_Secret_key,
            {
                expiresIn: '1d'
            }
        );

        // Store token in cookie
        res.cookie('token', token);

        // Send response
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message
        });
    }
}
/**
 * 
 * @name logoutUserController
 * @description Logout a user
 * @access Public
 */

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;
        if(token){
            await tokenBlacklistModel.create({ token });
        }
        // Clear the token cookie
        res.clearCookie('token');
        // Send response
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

/**
 * @name getMeController
 * @description Get the logged-in user's information
 * @access Private
 * 
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        return res.status(200).json({
            message: 'User information retrieved successfully',
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};