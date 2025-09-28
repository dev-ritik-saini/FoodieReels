const foodModel = require('../models/food.model')
const storageService = require('../services/storage.service')
const { v4: uuid } = require('uuid')

//  Add food api controller
async function createFood(req, res) {

    // console.log(req.foodPartner);
    // console.log(req.body);
    // console.log(req.file);

    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'Video file is required' });
    }
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    // console.log(fileUploadResult);

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner?._id || req.body._id
    })

    res.status(201).json({
        message: "Food item added successfully",
    })


}

// get food api controlller

async function getFood(req, res) {
    const foodItems = await foodModel
        .find({})
        .populate('foodPartner', '_id')
    res.status(200).json({
        message: "Food items fetching sucessfully",
        foodItems
    })

}

// delete food (partner-only, must own the item)
async function deleteFood(req, res) {
    try {
        const { id } = req.params;
        const partnerId = req.foodPartner?._id;
        if (!partnerId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const item = await foodModel.findById(id);
        if (!item) return res.status(404).json({ message: 'Food not found' });
        if (String(item.foodPartner) !== String(partnerId)) {
            return res.status(403).json({ message: 'Not allowed' });
        }
        await item.deleteOne();
        return res.status(200).json({ message: 'Food deleted' });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to delete' });
    }
}

module.exports = { createFood, getFood, deleteFood };