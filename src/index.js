const express = require('express')
require('./db/connection')
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server up and listening on port ${port}`)
})
