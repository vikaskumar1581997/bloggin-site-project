const authorModel = require("../Models/authorModel")
var validator = require("email-validator");

let passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const createAuthor = async function (req, res) {
    try {
        const data = req.body
        console.log(data.firstName)
        console.log(typeof (data.firstName))

        if (Object.keys(data).length == 0) { return res.status(400).send({ msg: "please  provide sufficient data" }) }


        if (data.firstName == null) {
            return res.status(400).send({ msg: "first name should not be empty" })
        }


        if (typeof (data.firstName) != "string") {
            return res.status(400).send({ msg: "first name should be string" })
        }

//=================================REGEX======================================
        let f = data.firstName
        let pattern = /\d/g;
        let result = f.match(pattern);
        console.log(result)
        if (result != null) { return res.status(400).send({ msg: "name can not be number" }) }

//=========================================================


        if (data.firstName.trim().length == 0) {
            return res.status(400).send({ msg: "first name should not be empty" })
        }


        //============================lastname validation===================
        if (data.lastName == null) {
            return res.status(400).send({ msg: "last name should not be empty" })
        }

        if (typeof (data.lastName) != "string") {
            return res.status(400).send({ msg: "last name should be string" })
        }

    //======================REGEX=================================

        let l = data.lastName
        let pattern1 = /\d/g;
        let result1 = l.match(pattern1);
        console.log(result1)
        if (result1 != null) { return res.status(400).send({ msg: "name can not be number" }) }

  //=========================================================
        if (data.lastName.trim().length == 0) {
            return res.status(400).send({ msg: "last name should not be empty" })
        }
        //=======================password validation===========================
        if (data.password == null) {
            return res.status(400).send({ msg: "Password should not be empty" })
         }
        // if (typeof (data.password) != "string") {
        //     return res.status(400).send({ msg: "password name should be string" })
        // }
        
        // if (data.password.trim().length == 0) {
        //     return res.status(400).send({ msg: "password should not be blank" })
        // }

        console.log("pr pss",data.password.match(passwordPattern))
        if(!data.password.match(passwordPattern)){return res.status(400).send({status:false,msg:"password Must Contain One Uppercase,Lowercase,Number,Symbol And Minimum Length Should Be 8-Character"});}

        const authorData = await authorModel.find()
        // console.log(authorData)
        console.log("pass", data.password)
        console.log("pass1", authorData.password)

        const password = authorData.filter(x => x.password == data.password)
        //  console.log(password)
        if (password.length != 0) { return res.status(400).send({ msg: "password should be unique" }) }
        //======================enum validation=========================

        if (data.title == null) { return res.status(400).send({ msg: "title is must" }) }
        //  if(data.title.trim()==null){return res.status(400).send("title is must")}
        if (data.title == "Mr" || data.title == "Mrs" || data.title == "Miss") {
            console.log("hii miss")
        } else {
            return res.status(400).send({ msg: "select only in Mr,Mrs,Miss" })

        }
        //==================email validation================
        const email = authorData.filter(x => x.email == data.email)
        //  console.log(password)
        if (email.length != 0) { return res.status(400).send({ msg: "email should be unique" }) }
        const check = validator.validate(data.email)
        if (check) {
            const saveData = await authorModel.create(data)
            res.status(201).send({ status: true, data: saveData })
        } else {
            return res.status(400).send({ msg: "Enter the valid email" })
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


module.exports.createAuthor = createAuthor