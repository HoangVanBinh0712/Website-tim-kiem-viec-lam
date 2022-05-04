const express = require("express")
const router = express.Router()
const Category = require('../model/Category')

router.get('/', async (req, res) => {
    try {
        const categorys = await Category.find()
        res.json({ success: true, category: categorys })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

router.post('/', async (req, res) => {
    const { name, description } = req.body
    if (!name || !description)
        return res.status(401).json({ success: false, message: "Missng information" })
    try {
        const category = new Category({
            name: name,
            description: description
        })
        category.save()
        return res.json({ success: true, message: "Add new Category successfully", category: category })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    const cate_id = req.params.id
    try {
        const deleted_cate = await Category.findOneAndDelete({ _id: cate_id })
        if (deleted_cate)
            res.json({ success: true, message: "Delete category successfully", category: deleted_cate })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.put('/:id', async (req, res) => {
    const cate_id = req.params.id
    const { name, description } = req.body
    if (!name || !description)
        return res.status(401).json({ success: false, message: "Missng information" })

    try {
        let cate = await Category.findOne({ _id: cate_id })
        if (!cate)
            res.json({ success: false, message: "category not found" })
        cate.name = name
        cate.description = description
        cate = await Category.findOneAndUpdate({ _id: cate_id }, cate)
        if (!cate)
            res.status(500).json({ success: false, message: "Internal server error" })
        res.json({ success: true, message: "Update category successfully", category: cate })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

module.exports = router