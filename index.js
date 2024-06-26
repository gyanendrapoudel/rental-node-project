const express =require('express');
const app = express();
const home = require('./routes/home.js')
const genre = require('./routes/genres.js')
const user = require('./routes/users.js');
const auth = require('./routes/auth.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const Genre = require('./model/genre.js')

 if (!process.env.jwtPrivateKey){
    console.log('Fatal ERROR: jwtPrivateKEy is not defined')
    process.exit(1)
 }
   // middleware to parse json body
   app.use(express.json())


// router
app.use('/',home)
app.use('/api/genres', genre)
app.use('/api/users',user)
app.use('/api/auth', auth)


// database connection
const url = process.env.URl;
mongoose.connect(url)
    .then(()=>{console.log('Connection successful')})
    .catch((error)=>{console.log('Connection denied, ',error)})




app.listen(4000, console.log('port is listening on 3000'))

// createGenre();

// create a genre  function

function createGenre() {
  const genre = new Genre({
    name: 'Comedy',
  })
  genre.save()
  console.log(genre)
}