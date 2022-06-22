const authorModel = require("../Models/authorModel")
var validator = require("email-validator");

const createAuthor = async function (req, res) {
    try {
        const data = req.body
        console.log(data.firstName)
        console.log(typeof(data.firstName))
        if((data.firstName==null)||(typeof(data.firstName)!==String)){
            return res.status(400).send("first name should not be empty and should be string")}
        
        if(data.firstName.trim().length==0){
            return res.status(400).send("first name should not be empty ")}   

        if(data.lastName==null||(typeof(data.firstName)!==String)){
                return res.status(400).send("last name should not be empty and should be string")}
            
         if(data.lastName.trim().length==0){
                return res.status(400).send("last name should not be empty")}
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