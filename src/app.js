const express = require('express')
require('./db/connection')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')

const app = express()

app.use(express.json())
app.use(usersRouter)
app.use(tasksRouter)

module.exports = app
