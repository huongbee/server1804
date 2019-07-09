const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use((req, res, next)=>{
    setTimeout(()=>{
        next()
    }, 2000)
})

const parser = require('body-parser').json();
app.use(parser)
const { authenticate } = require('./lib/authenticate')

require('./lib/dbconnect')
const userRouter = require('./controllers/user.router')
const friendRouter = require('./controllers/friend.router')
const postRouter = require('./controllers/post.router')
app.use('/user',userRouter);
app.use('/friend', authenticate, friendRouter);
app.use('/post', authenticate, postRouter);


app.get('/',(req,res)=>{
    res.send({
        status: 'success',
        data: null,
        message: 'Server started!'
    })
})

app.listen(3000, ()=>console.log('Server start on port 3000'))

// http://localhost:3000/user/register POST