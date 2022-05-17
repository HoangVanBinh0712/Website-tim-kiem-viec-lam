const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const postRouter =  require('./routes/auth')
const cateRouter = require('./routes/category')
const userInfoRouter = require('./routes/user_info')
const postsRouter = require('./routes/post')
const submittedRouter = require('./routes/submit_post')
const postDetail = require('./routes/postDetail')
const markPostRouter = require('./routes/markpost')
const cors = require('cors')
const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://cnpm:1234@timkiemvieclam.fzlnj.mongodb.net/timkiemvieclam?retryWrites=true&w=majority`,
        {useNewUrlParser: true,
        useUnifiedTopology: true})
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
const app = express()

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors())
app.use('/api/auth',postRouter)
app.use('/api/category',cateRouter)
app.use('/api/info',userInfoRouter)
app.use('/api/post',postsRouter)
app.use('/api/submitted',submittedRouter)
app.use('/api/postDetail', postDetail)
app.use('/api/markPost',markPostRouter)
app.use(express.json)
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on ${PORT}`))