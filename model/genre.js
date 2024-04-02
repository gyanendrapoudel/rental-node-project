const express = require('express')
const mongoose = require('mongoose')


const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true
    },

})

const Genre = mongoose.model('Genre',genreSchema);

module.exports=Genre