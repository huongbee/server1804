const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(password){
    return bcrypt.hash(password, saltRounds)
}
async function compare(passwordHash, password){
    return bcrypt.compare(password,passwordHash)
    .then(result=>{
        if(!result) return Promise.reject(new Error('Password invalid!'))
        return Promise.resolve(result);
    })
}

module.exports = { hash, compare }