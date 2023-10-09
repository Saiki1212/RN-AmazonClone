const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    verify : {
        type : Boolean,
        default : false
    },
    verificationToken : String,
    addresses : [
        {
            name : String,
            mobileNo : String,
            houseNo : String,
            landmark : String,
            city : String,
            country : String,
            state: String,
            postalcode : String
        }
    ],
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Order'
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User;