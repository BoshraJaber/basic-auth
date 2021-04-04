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

async function authentication (req,res, next){
    console.log(req.headers.authorization);
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        req.user = user;
     next()
    }
    else {
      next('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }
}




module.exports = {
    bcryptHashing,
    authentication
}