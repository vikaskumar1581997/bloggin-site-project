const authorModel = require("../Models/authorModel")
var validator = require("email-validator");

const createAuthor = async function (req, res) {
    try {
        const data = req.body
        console.log(data)
        const check = validator.validate(data.email)
        if(check){
        const saveData = await authorModel.create(data)
        res.status(201).send({ status: true, data: saveData })
        }else{
        return res.status(400).send("Enter the valid email")
    }
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


module.exports.createAuthor = createAuthor

//just