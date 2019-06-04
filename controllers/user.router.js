const express = require('express');
const router = express.Router();
const { User } = require('../models/User.model')

router.post('/register',(req,res)=>{
    const { email, password, name } = req.body
    User.signUp( email, password, name )
    .then(user=>res.send({
        code: 1, // 1:success, 0:error
        data: user,
        message: 'Success!'
    }))
    .catch(error=>res.send({ 
        code: 0,
        data: null,
        message: error.message
    }))
})
router.post('/login',(req,res)=>{
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(user=>res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(error=>res.send({ 
        code: 0,
        data: null,
        message: error.message
    }))
})


module.exports = router;