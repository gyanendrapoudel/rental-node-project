const express = require('express')
const router = express.Router()
const User = require('../model/user.js')

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
 await user.save()
  res.send({})
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
