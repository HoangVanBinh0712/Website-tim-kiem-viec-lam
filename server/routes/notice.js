const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const LoginController = require('../controller/LoginController')
const RegisterController = require('../controller/RegisterController')
const Category = require('../model/Category')
const Notice = require('../model/Notice')
const { findById } = require("../model/Post")
const JobSeeker = require("../model/JobSeeker")
const Employer = require("../model/Employer")

router.get('/', verifyToken ,async (req, res) => {
    const user_id = req.userId
    let thisUser = await JobSeeker.findById({_id:user_id})
    if(!thisUser)
        thisUser = await Employer.findById({_id:user_id})
    if(!thisUser)
        return res.status(401).json({ success: false, message: "Not found User" })

    const user_email = thisUser.email
    try {
        const notice = await Notice.find({email: user_email})
        res.json({ success: true, notice: notice })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
/// Create Notice
router.post('/:id', verifyToken,async (req, res) => {
    const { title} = req.body
    
    //jobseeker ID
    const user_id = req.params.id
    let thisUser = await JobSeeker.findById({_id:user_id})
    if(!thisUser)
        thisUser = await Employer.findById({_id:user_id})
    if(!thisUser)
        return res.status(401).json({ success: false, message: "Not found User" })

    const user_email = thisUser.email
    const isNew = true
    const date = new Date()
    console.log(user_email)
    if (!title)
        return res.status(401).json({ success: false, message: "Missing information" })
    try {
        const nt = new Notice({
            title: title,
            email: user_email,
            isnew:isNew,
            date:date
        })
        nt.save()
        return res.json({ success: true, message: "successfully!!" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
// Danh dau da xem het tat car thong bao
router.put('/', verifyToken,async (req, res) => {
    const user_id = req.userId
    let thisUser = await JobSeeker.findById({_id:user_id})
    if(!thisUser)
        thisUser = await Employer.findById({_id:user_id})
    if(!thisUser)
        return res.status(401).json({ success: false, message: "Not found User" })

    const user_email = thisUser.email
    
    try {
        
        let notices = await Notice.find({email:user_email})
        notices.forEach(async notice=> {
            notice.isnew = false
            await Notice.findOneAndUpdate({ _id: notice._id}, notice)
        })

        res.json({ success: true, message: "Done!"})

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

module.exports = router