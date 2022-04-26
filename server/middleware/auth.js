const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1]
    if(!token)
    return res.status(401).json({success: false, message: "Access Token not found"})
    try {
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.userId = decode.userId
        //Móc db kiểm tra giống nhau nếu giống thì mới qua 
        next()
    } catch (error) {
        console.log(error.message)
        res.status(403).
        json({ success: false, message: "Invalid Token" })
   
    }

}

module.exports = verifyToken