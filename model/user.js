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
        unique:true,
        required:true,
        minlenght:5,
        maxlength:255,
        pattern: /.*@.*/,
    },
    password :{
        type:String,
        minlength:5,
        maxlength:50,
    }
})
const User = mongoose.model('User',userSchema)

module.export = User