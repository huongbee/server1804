const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/relation1804',{ 
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(()=>console.log('DB Connected'))
.catch(err=>console.log(err.message))