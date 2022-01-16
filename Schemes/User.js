const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: String,
    step: {type: String, default: "default"}
})

module.exports = mongoose.model("User", UserSchema)