const { verify } = require('./jwt')

function authenticte(req, res, next){
    const { token } = req.headers
    verify(token)
    .then(obj => {
        req.idUser = obj._id; 
        next(); // tiep tuc thuc hien request
    })
    .catch(error => res.send({ 
        code: 0,
        data: null,
        message: error.message
    }))
}

module.exports = { authenticte }