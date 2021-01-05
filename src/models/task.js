const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
})

taskSchema.methods.toJSON = function () {
    const taskObject = this.toObject()
    delete taskObject.owner
    return taskObject
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
