const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")


const createBlog = async function (req, res) {
    try {
        const data = req.body
        if(data.title==null||(typeof(data.title)!="string")){
            return res.status(400).send("title  should not be empty and should be string")}
        if(data.title.trim().length==0){
            return res.status(400).send("title should not be blank")}
        
        if(data.body==null||(typeof(data.body)!="string")){
                return res.status(400).send("body should not be empty")}
            
       if(data.body.trim().length==0){
                return res.status(400).send(" body should not be blank")}

        if(data.category==null||(typeof(data.category)!="string")){
                return res.status(400).send("category should not be empty")}
                
        if(data.category.trim().length==0){
                return res.status(400).send(" category should not be blank")}
       
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
        if(result.length == 0) {
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
        data.isPublished = true
        data.publishedAt = Date.now()
        let updatedBlog = await blogModel.findByIdAndUpdate(blogId, {  $push: { tags: data.tags,  subcategory: data.subcategory },title: data.title, body: data.body } , { new: true })
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

        return res.status(200).send({ status: "Done", data: result })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteBlogByQuerry = async function(req, res) {
    try{
        const data =req.query
        data.isDeleted = false
        console.log(data)
        const blogDeleted = await blogModel.updateMany(data,{$set:{isDeleted: true}}, {new: true})
        console.log(blogDeleted)
         if(blogDeleted.modifiedCount == 0) return res.send("User already deleted")
        res.status(200).send({status: true, data: blogDeleted})
    }
    catch(err) {
        res.status(500).send(err.message)

    }
}

module.exports.createBlog = createBlog
module.exports.getBlogData = getBlogData
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuerry = deleteBlogByQuerry