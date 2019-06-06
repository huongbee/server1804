const router = require('express').Router()
const { Post } = require('../models/Post.model')

router.post('/create',(req,res)=>{
    const content = req.body.content 
    const author = req.idUser
    Post.createPost(author,content)
    .then(post=>res.send({
        code: 1,
        data: post,
        message: '',
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})
router.post('/update',(req,res)=>{
    const { content, id } = req.body;
    const author = req.idUser // user logged in
    Post.updatePost(author, id, content)
    .then(post=>res.send({
        code: 1,
        data: post,
        message: '',
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message,
    }))
})
router.post('/delete',(req,res)=>{
    const id = req.body.id;
    const author = req.idUser
    Post.detelePost(author, id)
    .then(result=>res.send({
        code:1,
        data: result,
        message: 'Delete successfully!'
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))

})
module.exports = router;


