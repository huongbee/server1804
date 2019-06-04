const express = require('express');
const app = express();

const parser = require('body-parser').json();
app.use(parser)
const { authenticte } = require('./lib/authenticate')

require('./lib/dbconnect')
const userRouter = require('./controllers/user.router')
app.use('/user',userRouter);
const friendRouter = require('./controllers/friend.router')
app.use('/friend', authenticte, friendRouter);


app.get('/',(req,res)=>{
    res.send({
        status: 'success',
        data: null,
        message: 'Server started!'
    })
})
app.listen(3000, ()=>console.log('Server start on port 3000'))

// http://localhost:3000/user/register POST