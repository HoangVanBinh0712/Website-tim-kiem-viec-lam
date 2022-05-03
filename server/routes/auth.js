const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const LoginController = require('../controller/LoginController')
const RegisterController = require('../controller/RegisterController')
const JobSeeker = require("../model/JobSeeker")
const Employer = require("../model/Employer")
const Admin = require("../model/Admin")

//login
router.post('/login', LoginController.login)

//employer register
router.post('/employer/register', RegisterController.employerRegister)

//jobseeker register
router.post('/jobseeker/register', RegisterController.JobSeekerRegister)
//Code tham khao
router.get('/', verifyToken, async (req, res) => {
    try {
        const jobseeker = await JobSeeker.findById(req.userId).select('-password')
        const employer = await Employer.findById(req.userId).select('-password')
        const admin = await Admin.findById(req.userId).select('-password')
        if (!jobseeker && !employer && !admin)
            return res.status(400).json({ success: false, message: "User not found" })
        if (jobseeker)
            return res.json({ success: true, user: jobseeker })
        if (employer)
            return res.json({ success: true, user: employer })
        if (admin)
            return res.json({ success: true, user: admin })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
//-----------------------------------------------------------------------------------------------------------

//Create
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: "Title is required" })
    try {
        const newPost = new Post({
            title: title,
            description: description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || "To learn",
            user: req.userId
        })
        await newPost.save()

        res.json({ success: true, message: "Happy learning!", post: newPost })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

//update
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: "Title is required" })
    try {
        let updatePost = {
            title,
            description: description || "",
            url: (url.startsWith('https://')) ? url : `https://${url}` || "",
            status: status || "To learn"
        }
        //Dieu kien
        const condittion = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findOneAndUpdate(condittion, updatePost, { new: true })
        if (!updatePost)
            return res.status(401).json({ success: false, message: "Post not found or user Unauthorization" })
        res.json({ success: true, message: "Excellent progress !", post: updatePost })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)
        if (!deletePost)
            return res.status(401).json({ success: false, message: "Post not found or user Unauthorization" })
        res.json({ success: true, message: "Excellent progress !", post: deletePost })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
module.exports = router