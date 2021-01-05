const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/users', async (req, res) => {
    const newUser = User(req.body)
    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201).send({ newUser, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
       res.send({ user, token })
    } catch (error) {
        res.status(401).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const requestedUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = requestedUpdates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ 'error': 'Invalid updates!' })
    }

    try {
        requestedUpdates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router