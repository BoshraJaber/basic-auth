'use strict';
// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

//importing files
const userModel = require('./models/users-model');
// const basicAuthentication = require('./ middleware/basic');
const bcryptHashing = require('./ middleware/basic').bcryptHashing
const authentication = require('./ middleware/basic').authentication
const router = express.Router();

// Routes

router.post('/signup',bcryptHashing, signupHandler)
router.post('/signin', authentication , signinHandler)

async function signupHandler(req, res){
    try {
        // console.log("I am in the router");
        // console.log(req.record);
        res.status(201).json(req.record);
    } catch (error){
        // next(error)
        res.status(403).send("Error Creating User");
    }
}

async function signinHandler(req,res){
    res.status(200).json(req.user);
}


module.exports = router;