const express = require('express')
const foodController = require('../controllers/food.controller');
const { authFoodPartnerMiddleware, authFoodUserMiddleware } = require('../middlewares/auth.foodPartner.middleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
})
// POST /api/food/[prtected] ( authentication, services, response)
router.post('/',
    authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood)

// GET /api/food/ [protected]

router.get('/',
    authFoodUserMiddleware,
    foodController.getFood
)

// Delete a food by id (partner must own it)
router.delete('/:id',
    authFoodPartnerMiddleware,
    foodController.deleteFood
)

module.exports = router;