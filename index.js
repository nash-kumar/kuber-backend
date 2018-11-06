const express=require('express');
const app= express();
const mongoose=require('mongoose');

const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) console.log('Could not Connect');
    else console.log("SuccessFully Connected");
  });
const user = require('./routes/route');
app.use('/user',user);


let PORT = process.env.PORT;
app.listen(PORT, () => console.log(`At ${PORT} port is running!`));
