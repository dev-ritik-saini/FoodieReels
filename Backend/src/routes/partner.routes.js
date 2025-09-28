const express = require('express');
const { getMyProfile, getPublicProfile } = require('../controllers/partner.controller');
const { authFoodPartnerMiddleware } = require('../middlewares/auth.foodPartner.middleware');
const { authAnyMiddleware } = require('../middlewares/auth.any.middleware');

const router = express.Router();

// Partner-only profile
router.get('/me', authFoodPartnerMiddleware, getMyProfile);

// Store page requires any authenticated user (user or partner)
router.get('/:id', authAnyMiddleware, getPublicProfile);

module.exports = router;
