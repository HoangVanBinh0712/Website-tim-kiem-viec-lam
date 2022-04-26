const express = require("express")
const router = express.Router()
const verifyToken = require('../middleware/auth')
const JobSeeker = require('../model/JobSeeker')
const Employer = require('../model/Employer')
const Admin = require('../model/Admin')
const GetAndAdjustInfo = require('../controller/GetAndAdjustInfo')

//Get
router.get("/admin", verifyToken, GetAndAdjustInfo.getInforAdmin)

router.get("/jobseeker", verifyToken, GetAndAdjustInfo.getInforJobSeeker)

router.get("/employer", verifyToken, GetAndAdjustInfo.getInforEmployer)

//-----PUT

//Note: đẩy cái token, trong cái token được mã hóa theo userId chính là _id của user >> find theo là ra user đó
//Check 1 số thứ cơ bản
//Nếu email và số điện thoại thay đổi không trùng với ai đã đăng ký thì cho đổi
router.put("/jobseeker", verifyToken, GetAndAdjustInfo.adjustJobSeeker)

router.put("/employer", verifyToken,GetAndAdjustInfo.adjustEmployer)
module.exports = router