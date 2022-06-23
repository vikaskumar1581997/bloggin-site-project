const express = require('express');
const router = express.Router();
const Authorcontroller = require("../Controllers/authorController")
const Blogcontroller = require("../Controllers/blogController")
const Logincontroller = require("../Controllers/loginController")
const CommonMd = require("../middleware/auth")



router.post('/authors', Authorcontroller.createAuthor)

router.post("/blog", CommonMd.authentication, CommonMd.autherization, Blogcontroller.createBlog)

router.get("/blogs", Blogcontroller.getBlogData)

router.put("/blogs/:blogId", Blogcontroller.updateBlog)

router.delete("/blogs/:blogId", Blogcontroller.deleteBlog)

router.delete("/blogs", Blogcontroller.deleteBlogByQuerry)

router.post("/login", Logincontroller.loginUser)

router.get("/verification/:authorId", CommonMd.authentication,CommonMd.autherization )

module.exports = router;