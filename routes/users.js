const express = require('express')
const router = express.Router()
const User = require('../model/user.js')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth.js')


router.get('/me',auth,async (req,res)=>{
   console.log('hello')
   const user = await User.findById(req.user._id).select("-password");
   console.log(user);
   res.send(user)
})

//get all users
router.get('/', async (req, res) => {
  const users = await User.find()
  if (!users) return res.status(404).send('no user exist')
  res.send(users)
})
// create one user
router.post('/', async (req, res) => {
  const { name,email,password } = req.body
  const existingUser = await User.findOne({email:email})
  console.log(existingUser)
  if(existingUser) return res.status(400).send('user already exist')
  const user = new User({
    name,
    email,
    password
  })
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  
 await user.save()
const token = user.generateAuthToken()
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
})

//  get one user
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (!user) return res.status(400).send('id does not exist')

  res.send(user)
})

//  update user
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (!user) return res.status(400).send('id does not exist')
  const { name,email,password } = req.body
  
  user.name = name
  user.email=email
  user.password = password
  await user.save()
  res.send(user)
})

// delete one user
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findOneAndDelete(id)
  res.send(user)
})

module.exports = router
