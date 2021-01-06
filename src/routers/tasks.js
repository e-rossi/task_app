const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
    const newTask = Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = requestedUpdates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ 'error': 'Invalid updates!' })
    }

    try {
        const updatedTask = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!updatedTask) {
            return res.status(404).send()
        }

        requestedUpdates.forEach((update) => updatedTask[update] = req.body[update])
        await updatedTask.save()
        res.send(updatedTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!deletedTask) {
            return res.status(404).send()
        }
        res.send(deletedTask)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
