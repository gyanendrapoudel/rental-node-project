const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

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
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.jwtPrivateKey);
    return token
}
const User = mongoose.model('User',userSchema)

module.exports = User