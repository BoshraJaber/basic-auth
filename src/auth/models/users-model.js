// Create a mongoose model
'use strict';
const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});
// this line will create the collection (sql table) with name 'user'
const users = mongoose.model('users', usersSchema);

module.exports = users;
