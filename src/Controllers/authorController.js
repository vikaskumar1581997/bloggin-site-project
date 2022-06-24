const authorModel = require("../Models/authorModel")
var validator = require("email-validator");

const createAuthor = async function (req, res) {
    try {
        const data = req.body
        console.log(data.firstName)
        console.log(typeof (data.firstName))

        if (data.firstName == null) {
            return res.status(400).send("first name should not be empty and should be string")
        }

        if (typeof (data.firstName) != "string") {
            return res.status(400).send("first name should be string")
        }

        if (data.firstName.trim().length == 0) {
            return res.status(400).send("first name should not be empty ")
        }

        if (data.lastName == null) {
            return res.status(400).send("last name should not be empty and should be string")
        }

        if (typeof (data.lastName) != "string") {
            return res.status(400).send("last name should be string")
        }

        if (data.lastName.trim().length == 0) {
            return res.status(400).send("last name should not be empty")
        }
        //=======================password validation
        if (data.password == null) {
            return res.status(400).send("Password should not be empty and should be string")
        }
        if (typeof (data.password) != "string") {
            return res.status(400).send("password name should be string")
        }
        if (data.password.trim().length == 0) {
            return res.status(400).send("password should not be blank")
        }
        const authorData = await authorModel.find()
        // console.log(authorData)
        console.log("pass", data.password)
        console.log("pass1", authorData.password)

        const password = authorData.filter(x => x.password == data.password)
        //  console.log(password)
        if (password.length != 0) { return res.status(400).send("password should be unique") }
        //======================enum validation=========================

        if (data.title == null) { return res.status(400).send("title is must") }
        //  if(data.title.trim()==null){return res.status(400).send("title is must")}
        if (data.title == "Mr" || data.title == "Mrs" || data.title == "Miss") {
            console.log("hii miss")
        } else {
            return res.status(400).send("select only in Mr,Mrs,Miss")

        }
        //==================email validation================
        const email = authorData.filter(x => x.email == data.email)
        //  console.log(password)
        if (email.length != 0) { return res.status(400).send("email should be unique") }
        const check = validator.validate(data.email)
        if (check) {
            const saveData = await authorModel.create(data)
            res.status(201).send({ status: true, data: saveData })
        } else {
            return res.status(400).send("Enter the valid email")
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


module.exports.createAuthor = createAuthor