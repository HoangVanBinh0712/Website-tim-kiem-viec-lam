const express = require("express")
const router = express.Router()
const Post = require('../model/Post')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken,async (req, res) => {
    const {cate,title} = req.body
        let posts
    try {
        if(!cate&!title){
            posts = await Post.find()
            return res.json({ success: true, post: posts })
        }
        if(!title){
            posts = await Post.find({category: cate })
            return res.json({success: true, post: posts})
        }
        if(!cate){
            posts = await Post.find({title:{'$regex': title, '$options' : 'i'}})
            return res.json({success: true, post: posts})
        }
        posts = await Post.find({title:{'$regex': title, '$options' : 'i'}})

        var i = 0
        posts.forEach(async post=> {
            if(post.category != cate){
                posts.splice(i, 1);
                i--
            }
            i++
        })
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
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
router.post('/', verifyToken,async (req, res) => {
    const { category, title, content, status, dateEnd} = req.body
    //, dateAcepted, author, censor
    //date req
    const author = req.userId
    const censor=""
    const dateAcepted=""
    const dateRequest = new Date()
    console.log(req.userId)
    
    if (!category||!title||!content||!status||!dateRequest||!dateEnd ||!author)
        return res.status(401).json({ success: false, message: "Missing information" })
    try {
        const post = new Post({
            category: category,
            title: title,
            content:content,
            status:status,
            dateRequest: dateRequest,
            dateEnd:dateEnd,
            dateAcepted:dateAcepted,
            author:author,
            censor:"626158d3262007754a2ce2a8"
        })
        post.save()
        return res.json({ success: true, message: "Add new Post successfully", post: post })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.put('/:id', verifyToken,async (req, res) => {
    const { category, title, content,dateEnd} = req.body
    const post_id = req.params.id

    try {
        let post = await Post.findById({_id: post_id})
        if(!post){
            return res.json({success: false, message: "Post not found"})
        }
        post.category = category;
        post.title = title;
        post.content = content
        post.dateEnd = dateEnd
        post = await Post.findByIdAndUpdate({_id: post._id},post,{new: true})
        if(!post)
        {
            return res.json({success: false, message: "Error"})
        }
        return res.json({ success: true, message: "Updated Post successfully", post: post })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})
module.exports = router