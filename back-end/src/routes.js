const express = require("express")
const {celebrate, Segments, Joi} = require('celebrate')



const routes = express.Router();

const RegisterController = require('./constrollers/RegisterController')

routes.post('/signup', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

}) , RegisterController.create)


module.exports = routes