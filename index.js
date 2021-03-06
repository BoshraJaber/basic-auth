'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server')
// instead of const server then server.start
// require('./src/server').start(process.env.PORT);



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    server.start(process.env.PORT);
  }).catch((e) => {
    console.log('__CONNECTION ERROR__', e.message);
  });