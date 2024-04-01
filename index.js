const express =require('express');
const app = express();
const home = require('./routes/home.js')

app.use('/',home)


app.listen(3000, console.log('port is listening on 3000'))