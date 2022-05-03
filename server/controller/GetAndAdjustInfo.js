const argon2 = require("argon2")
const JobSeeker = require("../model/JobSeeker")
const Employer = require('../model/Employer')
const Admin = require('../model/Admin')

class GetAndAdjustInfo {
    async getRoleUser(req, res) {
        try {
            const jobseeker = await JobSeeker.findById(req.userId)
            if (jobseeker)
                return res.json({ message: "Successfull", success: true, role: jobseeker.role })
            const employer = await Employer.findById(req.userId)
            if (employer)
                return res.json({ message: "Successfull", success: true, role: employer.role })
            const admin = await Admin.findById(req.userId)
            if (admin)
                res.json({ message: "Successfull", success: true, role: admin.role })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
    async getInforAdmin(req, res) {
        try {
            const admin = await Admin.viewInfo(req.userId)
            res.json({ message: "Successfull", success: true, admin: admin })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }

    }
    async getInforJobSeeker(req, res) {
        try {
            const jobseeker = await JobSeeker.viewInfo(req.userId)
            res.json({ message: "Successfull", success: true, jobseeker: jobseeker })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }

    }
    async getInforEmployer(req, res) {
        try {
            const employer = await Employer.viewInfo(req.userId)
            res.json({ message: "Successfull", success: true, employer: employer })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }

    }


    //ADJUST
    async adjustJobSeeker(req, res) {
        let { email, phonenumber, address, name, birthday } = req.body
        if (!email || !phonenumber || !address || !name || !birthday)
            return res
                .json({ success: false, message: 'missing information' })
        try {
            email = email.trim()
            phonenumber = phonenumber.trim()
            address = address.trim()
            name = name.trim()
            //Check phone 10 nums
            if (phonenumber.length != 10)
                return res
                    .json({ success: false, message: "Phone number invalid" })
            //check birth day
            var now = new Date()
            var birth = new Date(birthday)
            if (birth > now)
                return res.json({ success: false, message: 'birth day invalid' })

            //check exits email or phone
            const jobsk_email = await JobSeeker.findOne({ email: email })
            const jsbsk_phone = await JobSeeker.findOne({ phonenumber: phonenumber })

            const emp_email = await Employer.findOne({ email: email })
            const emp_phone = await Employer.findOne({ phonenumber: phonenumber })

            const admin_email = await Admin.findOne({ email: email })
            const admin_phone = await Admin.findOne({ phonenumber: phonenumber })


            if (jsbsk_phone && jsbsk_phone._id != req.userId || jobsk_email && jobsk_email._id != req.userId ||
                emp_email && emp_email._id != req.userId || emp_phone && emp_phone._id != req.userId
                || admin_email && admin_email._id != req.userId || admin_phone && admin_phone._id != req.userId) {
                return res.json({ success: false, message: "email or phone number already taken" })
            }

            let jobseeker = await JobSeeker.findOne({ _id: req.userId })
            jobseeker.email = email
            jobseeker.phonenumber = phonenumber
            jobseeker.address = address
            jobseeker.name = name
            jobseeker.birthday = birthday
            jobseeker = await JobSeeker.findOneAndUpdate({ _id: req.userId }, jobseeker)

            if (!jobseeker)
                return res.status(500).json({ success: false, message: "Internal server error" })

            return res.json({ success: true, message: "Changed successfully", user: jobseeker })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
    async adjustEmployer(req, res) {
        let { email, phonenumber, address, companyname, description } = req.body
        if (!email || !phonenumber || !address || !companyname || !description)
            return res
                .json({ success: false, message: 'missing information' })
        try {
            email = email.trim()
            phonenumber = phonenumber.trim()
            address = address.trim()
            companyname = companyname.trim()
            description = description.trim()
            //Check phone 10 nums
            if (phonenumber.length != 10)
                return res
                    .json({ success: false, message: "Phone number invalid" })

            //check exits email or phone
            const jobsk_email = await JobSeeker.findOne({ email: email })
            const jsbsk_phone = await JobSeeker.findOne({ phonenumber: phonenumber })

            const emp_email = await Employer.findOne({ email: email })
            const emp_phone = await Employer.findOne({ phonenumber: phonenumber })

            const admin_email = await Admin.findOne({ email: email })
            const admin_phone = await Admin.findOne({ phonenumber: phonenumber })


            if (jsbsk_phone && jsbsk_phone._id != req.userId || jobsk_email && jobsk_email._id != req.userId ||
                emp_email && emp_email._id != req.userId || emp_phone && emp_phone._id != req.userId
                || admin_email && admin_email._id != req.userId || admin_phone && admin_phone._id != req.userId) {
                return res
                    .json({ success: false, message: "email or phone number already taken" })
            }

            let employer = await Employer.findOne({ _id: req.userId })
            employer.email = email
            employer.phonenumber = phonenumber
            employer.address = address
            employer.companyname = companyname
            employer.description = description
            employer = await Employer.findOneAndUpdate({ _id: req.userId }, employer)

            if (!employer)
                return res.status(500).json({ success: false, message: "Internal server error" })

            return res.json({ success: true, message: "Changed successfully", user: employer })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }

    //Change Password
    async changPassword(req, res) {
        const { oldpassword, newpassword, confirmnewpassword, role } = req.body
        try {
            if (!oldpassword.trim() || !newpassword.trim() || !confirmnewpassword.trim())
                return res.json({ success: false, message: "Invalid Password!" })
            if (newpassword !== (confirmnewpassword))
                return res.json({ success: false, message: "Password not match !" })
            const hashedPassword = await argon2.hash(newpassword)

            if (role == 0) {
                let jsk = await JobSeeker.findById(req.userId)
                const passwordvalid = await argon2.verify(jsk.password, oldpassword)
                if (!passwordvalid)
                    return res.json({ success: false, message: "Incorrect old password" })
                jsk.password = hashedPassword
                jsk = await JobSeeker.findOneAndUpdate({_id: req.userId},jsk, {new: true})
                if (!jsk)
                    return res
                        .json({ success: false, message: "Internal server error" })
                return res.json({ success: true, message: "Change Password Succesfully" })
            } else if (role == 1) {
                let jsk = await Employer.findById(req.userId)
                const passwordvalid = await argon2.verify(jsk.password, oldpassword)
                if (!passwordvalid)
                    return res.json({ success: false, message: "Incorrect old password" })
                jsk.password = hashedPassword
                jsk = await Employer.findOneAndUpdate({_id: req.userId},jsk, {new: true})
                if (!jsk)
                    return res
                        .json({ success: false, message: "Internal server error" })
                return res.json({ success: true, message: "Change Password Succesfully" })
         
            }
            return res.status(500).json({ success: false, message: "Internal server error" })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
}

module.exports = new GetAndAdjustInfo