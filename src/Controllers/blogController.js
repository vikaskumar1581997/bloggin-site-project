const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")


const createBlog = async function (req, res) {
    try {
        const data = req.body
        console.log(typeof (data.tags))
        if (data.title == null || (typeof (data.title) != "string")) {
            return res.status(400).send("title  should not be empty and should be string")
        }
        if (data.title.trim().length == 0) {
            return res.status(400).send("title should not be blank")
        }

        if (data.body == null || (typeof (data.body) != "string")) {
            return res.status(400).send("body should not be empty")
        }

        if (data.body.trim().length == 0) {
            return res.status(400).send(" body should not be blank")
        }

        if (data.category == null || (typeof (data.category) != "string")) {
            return res.status(400).send("category should not be empty")
        }

        if (data.category.trim().length == 0) {
            return res.status(400).send(" category should not be blank")
        }
        console.log(data.tags)
        // if (data.tags == null) {
        //     return res.status(400).send(" tags should not be null or empty")
        // }
        if (data.tags !== null) { //bcoz not required true

            if (typeof (data.tags) == "object") {
                if (data.tags.length == 0) {
                    return res.status(400).send("tags should not be empty")
                }
                for (i = 0; i < data.tags.length; i++) {
                    if (typeof (data.tags[i]) != "string") {
                        return res.status(400).send("tags should be array of string")
                    } console.log(data.tags)
                    if (data.tags.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" tags should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.tags) != "string") {
                    return res.status(400).send("tags should be string ")
                }
                if (data.tags.trim().length == 0) {
                    return res.status(400).send(" tags should not be blank")
                }
            }
        }


        if (data.subcategory != null) { //bcoz not required true

            if (typeof (data.subcategory) == "object") {
                if (data.subcategory.length == 0) {
                    return res.status(400).send("subcategory should not be empty")
                }
                for (i = 0; i < data.subcategory.length; i++) {
                    if (typeof (data.subcategory[i]) != "string") {
                        return res.status(400).send("subcategory should be array of string")
                    }
                    if (data.subcategory.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" subcategory should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.subcategory) != "string") {
                    return res.status(400).send("subcategory should be string ")
                }
                if (data.subcategory.trim().length == 0) {
                    return res.status(400).send(" subcategory should not be blank")
                }
            }
        }


        const user = await authorModel.findById(data.authorId)
        if (!user) return res.status(400).send({ status: false, msg: "Enter the Valid Author Id" })
        const saveData = await blogModel.create(data)
        res.status(201).send({ status: true, data: saveData })


    }
    catch (err) {
        res.status(500).send(err.message)
    }

}


const getBlogData = async function (req, res) {
    try {
        const data = req.query
        data.isDeleted = false
        data.isPublished = true
        const result = await blogModel.find(data)
        if (result.length == 0) {
            return res.status(400).send("Incorrect Data entered")
        }
        // console.log(result)
        return res.status(200).send({ status: true, msg: result })

    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

const updateBlog = async function (req, res) {

    try {
        const blogId = req.params.blogId;
        console.log(blogId)
        const isavailable = await blogModel.find({ _id: blogId, isDeleted: false });
        if (isavailable.length == 0) { return res.status(404).send("BlogId is invalid") }

        const data = req.body
        if (data.title == null) {
            console.log(data.title)
        }
        else {
            console.log("In else")
            if (data.title != null && typeof (data.title) != "string") {
                console.log("trim")
                return res.status(400).send("title  should be string")
            }
            if (data.title.trim().length == 0) {
                return res.status(400).send("title should not be blank")
            }
        }


        if (data.body == null) {
            console.log(data.body)
        }
        else {
            console.log("In else")
            if (data.body != null && typeof (data.body) != "string") {
                console.log("trim")
                return res.status(400).send("body  should be string")
            }
            if (data.body.trim().length == 0) {
                return res.status(400).send("body should not be blank")
            }
        }

        if (data.category == null) {
            console.log(data.category)
        }
        else {
            console.log("In else")
            if (data.category != null && typeof (data.category) != "string") {
                console.log("trim")
                return res.status(400).send("category  should be string")
            }
            if (data.category.trim().length == 0) {
                return res.status(400).send("category should not be blank")
            }
        }
        //================================================================

        if (data.tags !== null) { //bcoz not required true

            if (typeof (data.tags) == "object") {
                if (data.tags.length == 0) {
                    return res.status(400).send("tags should not be empty")
                }
                for (i = 0; i < data.tags.length; i++) {
                    if (typeof (data.tags[i]) != "string") {
                        return res.status(400).send("tags should be array of string")
                    } console.log(data.tags)
                    if (data.tags.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" tags should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.tags) != "string") {
                    return res.status(400).send("tags should be string ")
                }
                if (data.tags.trim().length == 0) {
                    return res.status(400).send(" tags should not be blank")
                }
            }
        }


        if (data.subcategory != null) { //bcoz not required true

            if (typeof (data.subcategory) == "object") {
                if (data.subcategory.length == 0) {
                    return res.status(400).send("subcategory should not be empty inside array")
                }
                for (i = 0; i < data.subcategory.length; i++) {
                    if (typeof (data.subcategory[i]) != "string") {
                        return res.status(400).send("subcategory should be array of string")
                    }
                    if (data.subcategory.toString().trim().length == 0) {
                        console.log("In Trim")
                        return res.status(400).send(" subcategory should not be blank after trim")
                    }
                }
            } else {
                if (typeof (data.subcategory) != "string") {
                    return res.status(400).send("subcategory should be string ")
                }
                if (data.subcategory.trim().length == 0) {
                    return res.status(400).send(" subcategory should not be blank")
                }
            }
        }

        data.isPublished = true
        data.publishedAt = Date.now()
        updatedBlog = await blogModel.findByIdAndUpdate(blogId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body }, { new: true })
        // updatedBlog1 = await blogModel.findByIdAndUpdate(blogId, {  }, { new: true })
        // updatedBlog2 = await blogModel.findByIdAndUpdate(blogId, { $push: { subcategory: data.subcategory } }, { new: true })

        return res.status(200).send({ status: true, data: updatedBlog })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

};


const deleteBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        //console.log(blogId)
        const result = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        // if(result.isDeleted == true) return res.status(400).send({status: false, msg: "Already deleted User"})
        //if(result.isDeleted == true ) return res.send("Already deleted user")
        if (!result) { return res.status(404).send("no such data exist or already deleted") }

        return res.status(200).send({ status: "Done" })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteBlogByQuerry = async function (req, res) {
    try {
        const data = req.query
        //if (!data.key) return res.status(400).send({ status: false, msg: "Provide Data To Delete" })
        console.log(data)
        
        
        const toCheckQuery = await blogModel.find()
        console.log(toCheckQuery.subcategory[0])
        // console.log(toCheckQuery)
        if (data.category != toCheckQuery.category) { return res.status(400).send({ status: false, msg: "Provide correct data to delete" }) }
        if (data.body != toCheckQuery.body) { return res.status(400).send({ status: false, msg: "Provide correct data to delete" }) }
        if (data.tags != toCheckQuery.tags) { return res.status(400).send({ status: false, msg: "Provide correct data to delete" }) }
        
        console.log(toCheckQuery.subcategory)
        const check = toCheckQuery.subcategory.filter(x => x == data.subcategory) 
        if(!check) { return res.status(400).send({ status: false, msg: "Provide correct data to delete" }) }
        
        
        
        
        if (data.title != toCheckQuery.title) { return res.status(400).send({ status: false, msg: "Provide correct data to delete" }) }
        if (data.authorId != toCheckQuery.authorId) { return res.status(400).send({ status: false, msg: " Provide correct data to delete" }) }
        data.isDeleted = false
        //console.log(data)

        const blogDeleted = await blogModel.updateMany(data, { isDeleted: true }, { new: true })
        console.log(blogDeleted)
        if (blogDeleted.modifiedCount == 0) return res.send("User already deleted")
        res.status(200).send({ status: true, data: blogDeleted })
    }
    catch (err) {
        res.status(500).send(err.message)

    }
}

module.exports.createBlog = createBlog
module.exports.getBlogData = getBlogData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuerry = deleteBlogByQuerry