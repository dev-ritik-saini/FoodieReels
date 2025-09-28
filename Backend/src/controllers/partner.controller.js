const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model');

// GET /api/partners/me (partner-only)
async function getMyProfile(req, res) {
    try {
        const partner = req.foodPartner; // set by authFoodPartnerMiddleware
        if (!partner) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const foods = await foodModel
            .find({ foodPartner: partner._id })
            .select('_id name video description foodPartner')
            .lean();
        return res.status(200).json({
            partner: {
                _id: partner._id,
                businessName: partner.businessName,
                name: partner.name,
                email: partner.email,
                contact: partner.contact,
                address: partner.address,
            },
            foods,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to load profile' });
    }
}

// GET /api/partners/:id (public store profile)
async function getPublicProfile(req, res) {
    try {
        const { id } = req.params;
        const partner = await foodPartnerModel
            .findById(id)
            .select('_id businessName name address contact')
            .lean();
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        const foods = await foodModel
            .find({ foodPartner: id })
            .select('_id name video description foodPartner')
            .lean();
        const isOwner = req.foodPartner && String(req.foodPartner._id) === String(id);
        return res.status(200).json({ partner, foods, isOwner });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to load store' });
    }
}

module.exports = { getMyProfile, getPublicProfile };
