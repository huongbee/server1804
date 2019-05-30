const express = require('express');
const router = express.Router();


router.post('/register',(req,res)=>{
    res.send({success: 'Success'})
})

module.exports = router;