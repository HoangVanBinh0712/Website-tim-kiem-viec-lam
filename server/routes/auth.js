const express = require("express")
const router = express.Router()
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
//Get user
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
module.exports = router