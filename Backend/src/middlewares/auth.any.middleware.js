const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');

async function authAnyMiddleware(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Please login first' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const id = decode.id || decode._id;
        if (!id) return res.status(401).json({ message: 'Invalid token' });

        let principal = await userModel.findById(id).lean();
        if (principal) {
            req.foodUser = principal;
            return next();
        }
        principal = await foodPartnerModel.findById(id).lean();
        if (principal) {
            req.foodPartner = principal;
            return next();
        }
        return res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { authAnyMiddleware };
