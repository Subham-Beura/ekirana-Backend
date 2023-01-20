const User = require("../models/User");


async function signUp(req, res) {
    let newUser = req.body;
    // Create Doc
    const doc = new User(newUser);
    // SaveDoc in DB
    const saved = await doc.save();
    res.send(saved);
}

exports.signUp = signUp;

async function login(req, res) {
    const userDetails = req.body;
    try {
        //Find User
        const userFound = await User.findOne({ username: userDetails.username });

        //Wrong UserName
        if (!userFound)
            res.send({ msg: "Wrong UserName" });

        //Wrong Password e
        if (userDetails.password !== userFound.password)
            res.json({ msg: "wrong Password", given: userDetails });

        //Ideal
        res.json({ msg: "Logged In", ...userFound, });

    } catch {
        err => {
            console.log(err);
        };
    }
}
exports.login = login;
