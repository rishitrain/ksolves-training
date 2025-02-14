const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require('../backend/config/db')
const app = express();
app.use(cors());
app.use(express.json());

const imageroute = require('./routes/image.route')


app.use('/',imageroute)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const v =(a,b)=>{

}
