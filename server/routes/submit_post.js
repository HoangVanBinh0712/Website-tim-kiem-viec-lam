const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const Submitted = require('../model/Submitted')
const jobseeker = require('../model/JobSeeker')

router.get('/', verifyToken, async (req, res) => {
    try {
        const jsk = await jobseeker.findById(req.userId)
        if(!jsk)
        return res.json({success: false, message: "User not found !"})
        const email = jsk.email
        const submitted = await Submitted.find({submitterEmail: email})
        res.json({ success: true, Submitted: submitted })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

//lan 1 la gui, nhan lan nua la xoa
router.put('/', verifyToken, async (req, res) => {
    try {
        const {postId} = req.body
        const jsk = await jobseeker.findById(req.userId)
        if(!jsk)
        return res.json({success: false, message: "User not found !"})
        const sbmt = await Submitted.findOne({submitterId: req.userId, post: postId})
        if(sbmt)
        {
            await Submitted.findOneAndDelete({_id: sbmt._id})
            return res.json({success: true, message: "Deleted success Fully",Submitted: sbmt })
        }
        const today = new Date()
        const submitted = new Submitted({
            submitterId: req.userId,
            dateSubmitted: today,
            post: postId
        })
        submitted.save()
        res.json({ success: true,message: "Submitted Successfully" ,Submitted: submitted })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

module.exports = router