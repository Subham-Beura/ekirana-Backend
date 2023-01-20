const express = require('express')
const User = require("./models/User")
const router = express.Router()
router.get("/", async (req, res) => {
    const allUsers = await User.find()
    res.json(allUsers)
})
router.post('/signup', async (req, res) => {
    console.log(req.body)
    let newUser = req.body
    const doc = new User(newUser)
    const saved = await doc.save()
    res.send(saved)
})
router.post('/login', async (req, res) => {
    const userDetails = req.body
    try {
        const userFound = await User.findOne({ username: userDetails.username })
        if (!userFound)
            res.send({ msg: "Wrong UserName" })
        if (userDetails.password !== userFound.password)
            res.json({ msg: "wrong Password", given: userDetails, data: userFound })
        res.json({ msg: "Logged In", ...userFound, })
    } catch {
        err => {
            console.log(err)
        }
    }
})
module.exports = router;