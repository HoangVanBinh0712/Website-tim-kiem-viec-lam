
const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')

router.get('/:id', verifyToken , async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) 
        return res.json({success: true, message: "Not Found"})
        return res.json({success: true, post: post})
    } catch (error) {
        console.log(error)
    }

})

module.exports = router