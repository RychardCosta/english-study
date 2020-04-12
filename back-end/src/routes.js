const express = require("express")
const {celebrate, Segments, Joi} = require('celebrate')
const connection = require('../src/database/connection')

const routes = express.Router();

const RegisterController = require('./constrollers/Signup/RegisterController')
const LoginControler = require('./constrollers/Sign/LoginControler')
const AuthorizationToken = require('./middleware/AuthorizationToken')


routes.post('/signup', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

}), RegisterController.create)

routes.post('/sign', LoginControler.create)


routes.get('/listUser', AuthorizationToken.valided, async (req, res) => {
    const users = await connection("users").where("id", req.user.id).select('*')
    
    res.json(users)

    
} )



module.exports = routes