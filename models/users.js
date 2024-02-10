const mongo = require('mongoose')

const userSchema = new mongo.Schema({
    name: {type: String, required: true,},
    email: {type: String, required: true,},
    phone: {type: Number, required: true,},
    image: {type: String, required: true,},
    date: {type: Date, required: true,default: Date.now},
})

module.exports = mongo.model('users', userSchema)