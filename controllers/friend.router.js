const express = require('express');
const router = express.Router();
const { User } = require('../models/User.model')

router.post('/send-friend-request',(req,res)=>{
    const { idReceiver } = req.body;
    const idSender = req.idUser; // get from token
    User.sendFriendRequest(idReceiver, idSender)
    .then(response=>res.send({ 
        code: 1,
        data: response,
        message: ''
    }))
    .catch(error => res.send({ 
        code: 0,
        data: null,
        message: error.message
    }))
    
})

router.post('/remove-send-friend-request',(req,res)=>{
    const { idReceiver } = req.body;
    const idSender = req.idUser; // get from token
    User.removeSendFriendRequest(idReceiver, idSender)
    .then(response=>res.send({ 
        code: 1,
        data: response,
        message: ''
    }))
    .catch(error => res.send({ 
        code: 0,
        data: null,
        message: error.message
    }))
})

router.post('/remove-receive-friend-request',(req,res)=>{
    
})

router.post('/accepted-friend-request',(req,res)=>{
    
})

router.post('/remove-friend',(req,res)=>{
    
})

module.exports = router
