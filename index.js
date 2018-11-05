const express = require('express');
require('dotenv').config();
const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err)=>{
    if(err) console.log('Could not Connect');
    else console.log("Successfully Connected");
})


const cors = require('cors');
app.use(cors());

const user = require('./router/router');
app.use('/user', user);


app.get('/', (req, res) => res.send("Hello Page"));

PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`At ${PORT} port is running!`));
