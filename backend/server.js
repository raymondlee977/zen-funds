require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log('Server listenting on port', PORT);
  });
})
.catch((error) => {
  console.log(error);
});