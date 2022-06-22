const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

const createBlog = async function (req, res) {
    try {
        const data = req.body
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
        //const data = req.querry
        const blogData = await blogModel.find({ isDeleted: false, isPublished: true })
        if (!blogData) return res.status(404).send({ status: false, msg: "No User found" })
        res.status(200).send({ status: true, msg: blogData })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

}

const updateBlog=async function(req,res){

    const blogId=req.params.blogId;
    const isavailable =await blogModel.find({_id:blogId,isDeleted:false});
    if(!isavailable){return res.status(404).send("data invalid")}

    
    const data=req.body
    data.isPublished=true
    data.publishedAt=Date.now()
  
    
    var updatedBlog= await blogModel.findByIdAndUpdate(blogId ,{$set:{title: data.title, body: data.body}},{new:true}) 
    updatedBlog = await blogModel.findByIdAndUpdate(blogId ,{$push:{tags: data.tags}},{new:true} ) 
    updatedBlog = await blogModel.findByIdAndUpdate(blogId ,{$push:{subcategory: data.subcategory}},{new:true})

  

    
    return res.status(200).send({status:true, data:updatedBlog})
    
    };
    


module.exports.createBlog = createBlog
module.exports.getBlogData = getBlogData
module.exports.updateBlog =updateBlog