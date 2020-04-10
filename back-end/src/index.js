const express = require("express")
const routes = require('./routes')
const cors = require('cors')
const connection = require('./database/connection')
const {errors} = require('celebrate')

const app = express()

connection.migrate.latest()

app.use(cors())

app.use(express.json())

app.use(routes)
app.use(errors())
app.listen(process.env.PORT || 3000)