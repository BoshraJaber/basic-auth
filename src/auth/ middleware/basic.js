const base64 = require('base-64');
const bcrypt = require('bcrypt');
// const Clothes = require('../models/data-collection-class')
const Users = require('../models/users-model')
// const Users = new Users(dataModel);



// let salt = 5;

async function bcryptHashing (req,res,next){
    try{
        console.log("I am in the basics");
        console.log(req.body.password);
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        req.record = record
        next();
    } catch(error){
        console.log(error);
    }
   
}
module.exports = bcryptHashing;