const mongoose = require('mongoose');

require('dotenv').config()

const db = process.env.DB

mongoose.connect(db)


    .then(() => console.log('Connected!'))

    .catch((err) => console.log(err))