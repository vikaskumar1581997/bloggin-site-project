const authorModel = require("../Models/authorModel")

const createAuthor = async function (req, res) {
    try {
        const data = req.body
        const saveData = await authorModel.create(data)
        res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


module.exports.createAuthor = createAuthor