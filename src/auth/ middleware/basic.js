const base64 = require('base-64');
const bcrypt = require('bcrypt');

let salt = 5;

async function bcryptHashing (req,res,next){
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new users(req.body);
    const record = await user.save(req.body);
    next();
}
module.exports = bcryptHashing;