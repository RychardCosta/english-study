const express = require("express")

const routes = express.Router();

const RegisterController = require('./constrollers/RegisterController')

routes.post('/register', RegisterController.create)


module.exports = routes