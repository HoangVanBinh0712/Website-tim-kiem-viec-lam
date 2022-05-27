const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const Profile = require('../model/Profile')


router.post('/search', verifyToken, async (req, res) => {
    const { search } = req.body
    try {
        //Email
        if (isNaN(search)) {
            const prof = await Profile.find({ owner_email: { '$regex': search, '$options': 'i' } })
            return res.json({ success: true, profiles: prof, message: "Search for: " + search })
        }
        //Number
        const prof = await Profile.find({ phonenumber: { '$regex': search, '$options': 'i' } })
        return res.json({ success: true, profiles: prof, message: "Search for: " + search })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.get('/', verifyToken, async (req, res) => {
    const jobseeker_id = req.userId
    try {
        const prof = await Profile.findOne({ jobseeker: jobseeker_id })
        res.json({ success: true, profile: prof })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.post('/', verifyToken, async (req, res) => {
    const { owner_email, phonenumber, name, birthday, introduce, experience, degree } = req.body

    //jobseeker ID
    const jobseeker = req.userId

    if (!owner_email || !phonenumber || !name || !birthday || !introduce)
        return res.status(401).json({ success: false, message: "Missing information" })
    try {
        const prof = new Profile({
            owner_email: owner_email,
            phonenumber: phonenumber,
            name: name,
            birthday: birthday,
            introduce: introduce,
            experience: experience,
            degree: degree,
            jobseeker: jobseeker
        })
        prof.save()
        return res.json({ success: true, message: "Add new Profile successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.put('/', verifyToken, async (req, res) => {
    const { owner_email, phonenumber, name, birthday, introduce, experience, degree } = req.body
    const jobseeker_id = req.userId

    //jobseeker ID
    try {
        let prof = await Profile.findOne({ jobseeker: jobseeker_id })
        if (!prof)
            res.json({ success: false, message: "profile not found" })
        prof.owner_email = owner_email
        prof.phonenumber = phonenumber
        prof.name = name
        prof.birthday = birthday
        prof.introduce = introduce
        prof.experience = experience
        prof.degree = degree
        prof = await Profile.findOneAndUpdate({ _id: prof._id }, prof, { new: true })
        return res.json({ success: true, message: "Updated profile successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
module.exports = router