const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();
const { authFoodPartnerMiddleware, authFoodUserMiddleware } = require('../middlewares/auth.foodPartner.middleware');

// User Authentication Routes
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)
router.get('/me', authController.getMe)


// Food Partner Authentication Routes
router.post('/foodPartner/register', authController.registerFoodPartner)
router.post('/foodPartner/login', authController.loginFoodPartner)
router.get('/foodPartner/logout', authController.logoutFoodPartner)


module.exports = router; 