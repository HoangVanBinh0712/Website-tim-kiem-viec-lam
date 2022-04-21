const argon2 = require("argon2")
const JobSeeker = require("../model/JobSeeker")
const Employer = require('../model/Employer')
const Admin = require('../model/Admin')

class RegisterController {
    async employerRegister(req, res){
        let { email, phonenumber, password, address, companyname, description } = req.body
    
        if (!email || !phonenumber || !address || !companyname || !description || !password)
            return res.status(400)
                .json({ success: false, message: 'missing information' })
        try {
            email = email.trim()
            phonenumber = phonenumber.trim()
            address = address.trim()
            companyname = companyname.trim()
            description = description.trim()
            //Check phone 10 nums
            if (phonenumber.length != 10)
                return res.status(400)
                    .json({ success: false, message: "Phone number invalid" })
            //check exits email or phone
            const jobsk_email = await JobSeeker.findOne({ email: email })
            const jsbsk_phone = await JobSeeker.findOne({ phonenumber: phonenumber })
            const emp_email = await Employer.findOne({ email: email })
            const emp_phone = await Employer.findOne({ phonenumber: phonenumber })
            const admin_email = await Admin.findOne({ email: email })
            const admin_phone = await Admin.findOne({ phonenumber: phonenumber })
            if (jsbsk_phone != null || jobsk_email != null ||
                emp_email != null || emp_phone != null
                || admin_email != null || admin_phone != null)
                return res.status(400)
                    .json({ success: false, message: "email or phone number already taken" })
    
            //Pass check
            const hashedPassword = await argon2.hash(password)
            const emp = new Employer({
                email: email,
                phonenumber: phonenumber,
                password: hashedPassword,
                address: address,
                role: 1,
                lastesttoken: "",
                companyname: companyname,
                description: description
            })
            emp.save()
    
            return res.json({ success: true, message: "Employer created successfully" })
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }

    async JobSeekerRegister (req, res) {
        let { email, phonenumber, password, address, name, birthday } = req.body
    
        if (!email || !phonenumber || !address || !name || !birthday || !password)
            return res.status(400)
                .json({ success: false, message: 'missing information' })
        try {
            email = email.trim()
            phonenumber = phonenumber.trim()
            address = address.trim()
            name = name.trim()
            //Check phone 10 nums
            if (phonenumber.length != 10)
                return res.status(400)
                    .json({ success: false, message: "Phone number invalid" })
            //check birth day
            var now = new Date()
            var birth = new Date(birthday)
            if (birth > now)
                return res.status(400).json({ success: false, message: 'birth day invalid' })
    
            //check exits email or phone
            const jobsk_email = await JobSeeker.findOne({ email: email })
            const jsbsk_phone = await JobSeeker.findOne({ phonenumber: phonenumber })
            const emp_email = await Employer.findOne({ email: email })
            const emp_phone = await Employer.findOne({ phonenumber: phonenumber })
            const admin_email = await Admin.findOne({ email: email })
            const admin_phone = await Admin.findOne({ phonenumber: phonenumber })
            if (jsbsk_phone != null || jobsk_email != null ||
                emp_email != null || emp_phone != null
                || admin_email != null || admin_phone != null)
                return res.status(400)
                    .json({ success: false, message: "email or phone number already taken" })
    
    
            //Pass check
            const hashedPassword = await argon2.hash(password)
            const jsk = new JobSeeker({
                email: email,
                phonenumber: phonenumber,
                password: hashedPassword,
                address: address,
                role: 0,
                lastesttoken: "",
                name: name,
                birthday: birthday
            })
            jsk.save()
    
            return res.json({ success: true, message: "User created successfully" })
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
}

module.exports = new RegisterController