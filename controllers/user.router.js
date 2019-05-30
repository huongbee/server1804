const express = require('express');
const router = express.Router();
const { User } = require('../models/User.model')


router.post('/register',(req,res)=>{
    const { email, password, name } = req.body
    User.signUp( email, password, name )
    .then(user=>res.send({user}))
    .catch(error=>res.send({ error: error.message}))
})

module.exports = router;