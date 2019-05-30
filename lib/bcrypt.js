const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(password){
    return bcrypt.hash(password, saltRounds)
}
function compare(passwordHash, password){
    return bcrypt.compare(password,passwordHash)
    .then(result=>{
        if(!result) return Promise.reject(new Error('Password not match!'))
        return result;
    })
}

module.exports = { hash, compare }