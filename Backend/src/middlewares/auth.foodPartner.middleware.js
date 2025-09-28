const foodPartnerModel = require('../models/foodPartner.model')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

// Food adding middleware for food partner
async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }


    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decode.id || decode._id)
        if (!foodPartner) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.foodPartner = foodPartner
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
// Food adding middleware for food partner
async function authFoodUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }


    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const foodUser = await userModel.findById(decode.id || decode._id)

        req.foodUser = foodUser
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authFoodUserMiddleware
}