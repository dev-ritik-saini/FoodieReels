
const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');


// user register controller
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        email
    })

    if (isUserExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hasedPassword
    })
    // creating token using jwt 
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    // sending response to frontend
    res.status(201).json({
        message: "User register sucessfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }
    })

}

// user login controller
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(404).json({
            message: "Invalid user or password"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Invalid user or password"
        })
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User login sucessfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

// user logout Controller

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logout sucsessfully"
    });
}


// -------------------------------------------------------------------------------------------------


// Food Partner registration controller
async function registerFoodPartner(req, res) {
    const { businessName, name, email, password, contact, address } = req.body;

    const isPartnerExists = await foodPartnerModel.findOne({
        email
    })
    if (isPartnerExists) {
        return res.status(200).json({
            message: "Partner already exists"
        })
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        businessName,
        name,
        email,
        contact,
        password: hasedPassword,
        address
    })

    const token = jwt.sign({
        _id: foodPartner._id,

    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message: "Partner registered successfully",
        next: "/profile",
        user: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

// Food Partner Login controller
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const isfoodPartner = await foodPartnerModel.findOne({
        email
    })
    if (!isfoodPartner) {
        return res.status(400).json({
            message: "Invalid user or Password"
        })
    }

    const isPasswordMatched = bcrypt.compare(password, isfoodPartner.password)
    if (!isPasswordMatched) {
        return res.status(400).json({
            message: "Invalid user or Password"
        })
    }

    const token = jwt.sign({
        _id: isfoodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message: "Partner login successfully",
        next: "/profile"
    })
}

// Food partner logout controller
async function logoutFoodPartner(req, res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "Partner logged out"
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    // Added below
    async getMe(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) {
                return res.status(401).json({ message: 'Please login first' });
            }
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const id = decode.id || decode._id;
            if (!id) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // Try to resolve as user first
            let me = await userModel.findById(id).lean();
            if (me) {
                return res.status(200).json({
                    role: 'user',
                    user: {
                        _id: me._id,
                        fullName: me.fullName,
                        email: me.email,
                    },
                });
            }
            // Then as partner
            me = await foodPartnerModel.findById(id).lean();
            if (me) {
                return res.status(200).json({
                    role: 'partner',
                    user: {
                        _id: me._id,
                        businessName: me.businessName,
                        name: me.name,
                        email: me.email,
                        contact: me.contact,
                        address: me.address,
                    },
                });
            }
            return res.status(404).json({ message: 'Account not found' });
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}
