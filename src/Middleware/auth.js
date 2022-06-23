const jwt = require('jsonwebtoken')
// var validauthor
const authentication = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ msg: "please provide token" })
        const validToken = jwt.verify(token, "Group-15-Project_1")
        console.log(validToken)
        if (!validToken) {
            return res.status(400).send({ status: false, msg: "user not found" })
        }
        console.log(validToken)
        //    req.body.validauthor = validToken.ObjectId
        // console.log(validauthor)
        console.log("Done")
        next()
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}
const autherization = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key']
        const validToken = jwt.verify(token, "Group-15-Project_1")
        let author = req.body.authorId
        console.log(author)
        console.log(validToken, "Sucess")
        if (validToken.ObjectId != author) { return res.send("Not Authorize user") }
        // res.send("Sucess")
        next()
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}
module.exports.authentication = authentication;
module.exports.autherization = autherization;