const jwt = require('jsonwebtoken')
// const User = require('../model/user.model')

const protect = async(req,res,next) =>{
    const token = req.cookies.token;
    try{
        if(!token){
            return res.status(404).json({success:false,message:"Token Not found Please Login First"})
        }

        const decode = await jwt.verify(token,process.env.S_KEY)
        req.user = decode;
        next()
    }catch(err){
        next(err)
    }
}

module.exports = protect;