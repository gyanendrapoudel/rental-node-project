const express = require('express')
const router = express.Router();
const Genre = require('../model/genre');
const auth = require('../middleware/auth')


//get all genres
router.get('/', async(req,res)=>{
    const genres = await Genre.find()
    if(!genres) return res.status(404).send('no user exist')
    res.send(genres);
})
// create one genre
router.post('/',auth,async(req, res) => {
 const {name} =  req.body
 if(!name) return res.status(404).send('bad request')
 const genre = new Genre({
        name
    })
 const result = await genre.save()
 res.send(result);

})
//  get one genre
router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const genre = await Genre.findById(id);
    if(!genre) return res.status(400).send('id does not exist')

    res.send(genre)

})
//  update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const genre = await Genre.findById(id)
  if (!genre) return res.status(400).send('id does not exist')
  const {name} = req.body;
  genre.name = name;
   genre.save();
  res.send(genre)
})

// delete one genre
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const genre = await Genre.findOneAndDelete(id);
  res.send(genre)
  
})

module.exports = router