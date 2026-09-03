const express= require('express');
const authController=require('../controllers/auth.controller');
const authUser=require('../middlewares/auth.middleware');
const router=express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register',authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
router.post('/login',authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
router.get('/logout',authController.logoutUserController);
 
/**
 * @route GET /api/auth/get-me
 * @desc Get the logged-in user's information
 * @access Private
 */
router.get('/get-me',authUser,authController.getMeController);
 
module.exports=router;