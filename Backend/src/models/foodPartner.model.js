const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,

    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
})

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema);
module.exports = foodPartnerModel;