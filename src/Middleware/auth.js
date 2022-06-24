const jwt = require('jsonwebtoken')
const blogModel = require('../Models/blogModel')
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
        if (validToken.ObjectId != author) { return res.status(400).send("Not Authorize user") }
        // res.send("Sucess")
        next()
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}


const paramsAutherization = async function (req, res, next) {
    try {
        //console.log("In Params")
        const token = req.headers['x-api-key']
        const validToken = jwt.verify(token, "Group-15-Project_1")
        let blogId = req.params.blogId
        const id = await blogModel.find({ _id: blogId })
        console.log(id,"im params authorization")
        if(id.length==0){return res.status(404).send("no data found for authorisation")}
        const author = id[0].authorId

        console.log(author)
        // console.log(validToken, "Sucess")
        if (validToken.ObjectId != author) { return res.Status(400).send("Not Authorize ") }
        // res.send("Sucess")
        next()
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}


// const queryAutherization = async function (req, res, next) {
//     try {
//         console.log("In query")
//         const token = req.headers['x-api-key']
//         const validToken = jwt.verify(token, "Group-15-Project_1")


//         // let data = req.query
//         // const checkdata = await blogModel.find({$or: [{category: data.category},{authorId: data.authorId},{tags: data.tags}, {subcategory: data.subcategory}]})
//         // console.log(checkdata)
//         // const author = id[0].authorId

//         //console.log(author)
//         // console.log(validToken, "Sucess")
//         if (validToken.ObjectId != author) { return res.Status(400).send("Not Authorize user") }
//         // res.send("Sucess")
//         next()  
//     }
//     catch (err) {
//         return res.status(500).send(err.message)
//     }
// }


module.exports.authentication = authentication;
module.exports.autherization = autherization;
module.exports.paramsAutherization = paramsAutherization
// module.exports.queryAutherization = queryAutherization