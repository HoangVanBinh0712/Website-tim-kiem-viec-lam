const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const JobSeeker = require("../model/JobSeeker")
const Employer = require('../model/Employer')
const Admin = require('../model/Admin')

class LoginController {
    async login(req, res) {
        const { email, password, mode } = req.body
        if (!email || !password)
            return res.status(400)
                .json({ success: false, message: 'missing email or password' })
        try {
            //jobseeker
            if (mode == 0) {
                var jsk = await JobSeeker.findOne({ email: email })
                if (!jsk)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const passwordvalid = await argon2.verify(jsk.password, password)
                if (!passwordvalid)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const accessToken = jwt.sign({ userId: jsk._id }, process.env.ACCESS_TOKEN_SECRET)
                jsk.lastesttoken = accessToken
                //Dieu kien
                const condittion = { _id: jsk._id, email: email }
                jsk = await JobSeeker.findOneAndUpdate(condittion, jsk, { new: true })
                if (!jsk)
                    return res.status(500).json({ success: false, message: "__Internal server error" })
                return res.json({ success: true, message: "User Login successfully", accessToken })
            } else if (mode == 1) {
                //Employer
                var emp = await Employer.findOne({ email: email })
                if (!emp)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const passwordvalid = await argon2.verify(emp.password, password)
                if (!passwordvalid)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const accessToken = jwt.sign({ userId: emp._id }, process.env.ACCESS_TOKEN_SECRET)
                emp.lastesttoken = accessToken
                //Dieu kien
                const condittion = { _id: emp._id, email: email }
                emp = await Employer.findOneAndUpdate(condittion, emp, { new: true })
                if (!emp)
                    return res.status(500).json({ success: false, message: "__Internal server error" })
                return res.json({ success: true, message: "User Login successfully", accessToken })
            } else {
                //Admin
                var admin = await Admin.findOne({ email: email })
                if (!admin)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const passwordvalid = await argon2.verify(admin.password, password)
                if (!passwordvalid)
                    return res.status(400).json({ success: false, message: "Incorrect email or password" })
                const accessToken = jwt.sign({ userId: admin._id }, process.env.ACCESS_TOKEN_SECRET)
                admin.lastesttoken = accessToken
                //Dieu kien
                const condittion = { _id: admin._id, email: email }
                admin = await Admin.findOneAndUpdate(condittion, admin, { new: true })
                if (!admin)
                    return res.status(500).json({ success: false, message: "__Internal server error" })
                return res.json({ success: true, message: "Admin Login successfully", accessToken })
            }
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
}
module.exports = new LoginController