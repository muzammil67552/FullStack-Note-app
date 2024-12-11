const jwt =require("jsonwebtoken")
const User = require("../models/User")


const middleware = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split("")[1]
        if(!token) {
            return res.status(401).json({success:false, message:"Unauthorize"})
        }

        const decoded = jwt.verify(token,)
    } catch (error) {
        
    }
}