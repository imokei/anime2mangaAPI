const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());


const animes = require('./routes/api/animeRoutes.js');


//Access the database
const db = require('./config/config').mongoURI;
mongoose.connect(db,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    console.log('mongodb sucessfully connected')
})
    .catch(err =>{
    console.log('Error:'+ err);
})


//Use Routes
app.use('/api/animes', animes);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`app started on port: ${port} `));