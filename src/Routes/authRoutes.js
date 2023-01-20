const express = require('express')
const User = require("../models/User")
const { signUp, login } = require("../Controllers/authControllers")
const router = express.Router()
router.get("/", async (req, res) => {
    const allUsers = await User.find()
    res.json(allUsers)
})
router.post('/signup', async (req, res) => {
    await signUp(req, res)
})
router.post('/login', async (req, res) => {
    await login(req, res)
})
module.exports = router;


