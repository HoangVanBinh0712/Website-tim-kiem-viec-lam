const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')
const Admin = require('../model/Admin')
//Admin
router.get('/admin/:type', verifyToken, async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId)
        if (!admin)
            return res.json({ success: false, message: "Admin only" })
        const type = req.params.type
        let post
        if (type == "unapproved")
            posts = await Post.find({ status: "pending" })
        else if (type == "rejected")
            posts = await Post.find({ status: "rejected" })
        else posts = await Post.find()
        res.json({ success: true, post: posts })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
})
router.put('/:type/:id', verifyToken, async (req, res) => {
    const type = req.params.type
    const post_id = req.params.id
    if (type != "approve" && type != "reject")
        return res.json({ success: false, message: "Unknow" })
    try {
        const admin = await Admin.findById(req.userId)
        if (!admin)
            return res.json({ success: false, message: "Admin only" })

        let post = await Post.findById({ _id: post_id })
        if (!post) {
            return res.json({ success: false, message: "Post not found" })
        }
        let status = "rejected"
        if (type == "approve")
            status = "approved"
        post.status = status
        post.approver = req.userId
        post = await Post.findByIdAndUpdate({ _id: post._id }, post, { new: true })
        if (!post) {
            return res.json({ success: false, message: "Error" })
        }
        return res.json({ success: true, message: `${status} post successfully`, post: post })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.get('/EmpPost', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.userId })
        res.json({ success: true, post: posts })
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
})
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ status: "approved" })
        return res.json({ success: true, post: posts })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.post('/search', async (req, res) => {
    const { cate, title, location } = req.body
    let posts
    try {
        if (!cate & !title & !location) {
            posts = await Post.find({ status: "approved" })
            return res.json({ success: true, post: posts })
        }
        if (!title & !location) {
            if (cate == "all")
                posts = await Post.find({ status: "approved" })
            else
                posts = await Post.find({ category: cate, status: "approved" })
            return res.json({ success: true, post: posts })
        }
        if (!cate) {
            if (!location) {
                posts = await Post.find({ status: "approved", title: { '$regex': title, '$options': 'i' } })
                return res.json({ success: true, post: posts })
            }
            if (!title) {
                posts = await Post.find({ status: "approved", location: { '$regex': location, '$options': 'i' } })
                return res.json({ success: true, post: posts })
            }
            posts = await Post.find({ status: "approved", title: { '$regex': title, '$options': 'i' }, location: { '$regex': location, '$options': 'i' } })
            return res.json({ success: true, post: posts })
        }
        if (cate == "all")
            posts = await Post.find({ status: "approved", title: { '$regex': title, '$options': 'i' }, location: { '$regex': location, '$options': 'i' } })
        else
            posts = await Post.find({ status: "approved", category: cate, title: { '$regex': title, '$options': 'i' }, location: { '$regex': location, '$options': 'i' } })
        // var i = 0
        // posts.forEach(async post => {
        //     if (post.category != cate) {
        //         posts.splice(i, 1);
        //         i--
        //     }
        //     i++
        // })
        console.log(posts)
        res.json({ success: true, post: posts })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})
router.delete('/:id', async (req, res) => {
    const post_id = req.params.id
    try {
        const deleted_post = await Post.findOneAndDelete({ _id: post_id })
        if (deleted_post)
            res.json({ success: true, message: "Delete post successfully", post: deleted_post })
    } catch (error) {
        res.status(500).json({ success: false, message: "Post Not Found" })
    }
})
router.post('/', verifyToken, async (req, res) => {
    const { category, title, description, requirement, salary, location, dateEnd } = req.body
    //, dateAcepted, author, approver
    //date req
    const author = req.userId
    const dateAcepted = ""
    const dateRequest = new Date()
    const status = "pending"
    if (!category || !title || !description || !requirement || !salary || !location || !dateEnd || !author)
        return res.status(401).json({ success: false, message: "Missing information" })
    try {
        const post = new Post({
            category: category,
            title: title,
            description: description,
            requirement: requirement,
            salary: salary,
            location: location,
            status: status,
            dateRequest: dateRequest,
            dateEnd: dateEnd,
            dateAcepted: dateAcepted,
            author: author,
            approver: ""
        })
        post.save()
        return res.json({ success: true, message: "Add new Post successfully", post: post })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    const { category, title, description, requirement, salary, location, dateEnd } = req.body
    const post_id = req.params.id

    try {
        let post = await Post.findById({ _id: post_id })
        if (!post) {
            return res.json({ success: false, message: "Post not found" })
        }
        post.category = category;
        post.title = title;
        post.description = description
        post.requirement = requirement
        post.salary = salary
        post.location = location
        post.dateEnd = dateEnd
        post = await Post.findByIdAndUpdate({ _id: post._id }, post, { new: true })
        if (!post) {
            return res.json({ success: false, message: "Error" })
        }
        return res.json({ success: true, message: "Updated Post successfully", post: post })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
module.exports = router