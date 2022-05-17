const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const MarkedPost = require('../model/MarkedPost')

router.get('/all', verifyToken, async (req, res) => {
    try {
        //Lay het list bai post da luu (id)
        const listPost = await MarkedPost.find({ userId: req.userId }, { _id: 0, userId: 0, date: 0, __v: 0}).populate('postId')
        res.json({ success: true, listPost: listPost })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const userMarkPost = await MarkedPost.findOne({ userId: req.userId, postId: req.params.id })
        if (!userMarkPost)
            return res.json({ success: false })
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
})

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        let markPost = await MarkedPost.findOne({ userId: req.userId, postId: id })
        if (markPost) {
            await MarkedPost.deleteOne({ _id: markPost._id })
            return res.json({ success: true, message: "Đã bỏ lưu bài viết ." })
        }
        markPost = new MarkedPost({
            userId: req.userId,
            date: new Date(),
            postId: id
        })
        markPost.save()
        return res.json({ success: true, markPost: markPost, message: "Lưu bài viết thành công" })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
})

module.exports = router