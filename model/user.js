const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:4,
        maxlength:255,
        required:true,
    },
    email:{
        type:String,
        
        minlenght:5,
        maxlength:255,
        
    },
    password :{
        type:String,
        minlength:5,
        maxlength:1024,
    }
})
const User = mongoose.model('User',userSchema)

module.exports = User