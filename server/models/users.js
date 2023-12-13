const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false }
})

const usersModel = mongoose.model("users", usersSchema)
module.exports = usersModel