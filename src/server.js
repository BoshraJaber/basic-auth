'use strict';
// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const signRouters = require('./auth/router')

//importing files
const basicAuthentication = require('./auth/ middleware/base');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/signup', signRouters)

// app.post('/signup', basicAuthentication, signupHandler)


module.exports = {
    server: app,
    start: (port) => {
      const PORT = port || 8080;
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
  };

