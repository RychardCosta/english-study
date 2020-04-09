const express = require("express")

const routes = express.Router();

const SessionController = require('./constrollers/SessionController')

routes.get('/sessions', SessionController.create)


module.exports = routes