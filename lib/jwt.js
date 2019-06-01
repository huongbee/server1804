const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'chuoibaomatnaodo';

async function sign(obj){
    return jwt.sign(obj,PRIVATE_KEY,{expiresIn: 120 })
}
async function verify(token){
    try{
        const decoded = jwt.verify(token,PRIVATE_KEY);
        delete decoded.iat;
        delete decoded.exp;
        return decoded; // then
    }
    catch(err){ throw new Error(err.message)} // catch
}
module.exports = { sign, verify }


// sign({_id: '1234567890','email':'a'})
// .then(token=>console.log(token))
// .catch(err=>console.log(err))

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhIiwiaWF0IjoxNTU5Mzk3NTgyLCJleHAiOjE1NTkzOTc3MDJ9.6MqXKTHzZguqeGqmnEpzF23MwuLKf2s13kuYiVcryJQ'
// verify(token)
// .then(r=>console.log(r))
// .catch(err=>console.log(err.message))
