const mongoose = require('mongoose')

const connectionString = `${process.env.CONN_URL}/${process.env.DB_NAME}`
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
