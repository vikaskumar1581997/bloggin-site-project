const express = require('express');
const router = express.Router();
const Authorcontroller = require("../Controllers/authorController")
const Blogcontroller = require("../Controllers/blogController")



router.post('/authors', Authorcontroller.createAuthor)

router.post("/blog", Blogcontroller.createBlog)

router.get("/blogs", Blogcontroller.getBlogData)

router.put("/blogs/:blogId", Blogcontroller.updateBlog)

router.delete("/blogs/:blogId", Blogcontroller.deleteBlog)

router.delete("/blogs", Blogcontroller.deleteBlogByQuerry)


module.exports = router;