const express = require('express')
const router = express.Router()
const User = require('../model/user.js')
const _ = require('lodash')
const bcrypt = require('bcrypt')


router.post('/', async (req, res) => {
  const {  email, password } = req.body
  const existingUser = await User.findOne({ email: email })
  
  if (!existingUser) return res.status(400).send('Invalid email or password ')
  const validatePassword = await bcrypt.compare(password,existingUser.password)
  
  if (!validatePassword) return res.status(400).send('Invalid email or password ')
  
  res.send(true);
})
module.exports = router