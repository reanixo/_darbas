const mongoose = require('mongoose')

const dishesSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    impressions: { type: Number, default: 1 }
})

const dishesModel = mongoose.model("dishes", dishesSchema)
module.exports = dishesModel