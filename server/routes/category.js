const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const LoginController = require('../controller/LoginController')
const RegisterController = require('../controller/RegisterController')
const Category = require('../model/Category')

router.get('/' ,async (req,res) => {
    try {
        const categorys = await Category.find()
        res.json({succes: true, category:categorys}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})



module.exports = router