const {Schema, model} = require("mongoose")

const User = new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        number: {type: String, required: true},
        password: {type: String, required: true},
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true})


module.exports = model('User', User)