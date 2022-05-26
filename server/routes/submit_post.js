const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const Submitted = require('../model/Submitted')
const jobseeker = require('../model/JobSeeker')
const Profile = require('../model/Profile')
router.get('/post/:id', verifyToken, async (req, res) => {
    try {
        var lstProfile = []
        const submitted = await Submitted.find({ post: req.params.id })
        for (var i = 0; i < submitted.length;i++)
        {
            const profile = await Profile.findOne({jobseeker: submitted[i].submitterId})
            lstProfile.push(profile)
        }
        
        return res.json({ success: true, profiles: lstProfile })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const jsk = await jobseeker.findById(req.userId)
        if (!jsk)
            return res.json({ success: false, message: "User not found !" })
        const submitted = await Submitted.findOne({ submitterId: req.userId, post: req.params.id })
        if (submitted)
            return res.json({ success: true, result: true })
        return res.json({ success: true, result: false })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})


router.get('/', verifyToken, async (req, res) => {
    try {
        const jsk = await jobseeker.findById(req.userId)
        if (!jsk)
            return res.json({ success: false, message: "User not found !" })
        const submitted = await Submitted.find({ submitterId: req.userId })
        res.json({ success: true, Submitted: submitted })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

//lan 1 la gui, nhan lan nua la xoa
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id
        const jsk = await jobseeker.findById(req.userId)
        if (!jsk)
            return res.json({ success: false, message: "User not found !" })
        const sbmt = await Submitted.findOne({ submitterId: req.userId, post: postId })
        if (sbmt) {
            await Submitted.findOneAndDelete({ _id: sbmt._id })
            return res.json({ success: true, message: "Deleted success Fully", Submitted: sbmt })
        }
        const today = new Date()
        const submitted = new Submitted({
            submitterId: req.userId,
            dateSubmitted: today,
            post: postId
        })
        submitted.save()
        res.json({ success: true, message: "Submitted Successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

module.exports = router