const User = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getMe = async(req,res,next) =>{
    try{
        if(!req.user){
            return res.status(404).json({success:false,message:"User Not Found..!"})
        }
        return res.status(200).json({success:true,user:req.user})
    }catch(err){
        next(err)
    }
}

exports.registerContoller = async(req,res,next) =>{
    try{
        const {name,email,password} = req.body;
        
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(409).json({success:false,message:"User Already Exists"})
        }

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password:passwordHash
        })
        return res.status(201).json({success:true,data:newUser})
    }catch(err){
        next(err)
    }
}

exports.loginController = async(req,res,next) =>{
    try{
        const {email,password} = req.body;
        
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(401).json({success:false,message:"Invalid Credentials."})
        }

        const isMatch = await bcrypt.compare(password,existUser.password)
        if(!isMatch){
            return res.status(404).json({success:false,message:"Invalid Credentials."})
        }

        const token = await jwt.sign(
            {_id:existUser._id,name:existUser.name,email:existUser.email},
            process.env.S_KEY,
            {expiresIn:'1d'}
        )

        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'None',
            maxAge:24*60*60*1000
        })

        return res.status(200).json({success:true,message:"Login Successfully",token})
    }catch(err){
        next(err)
    }
}

exports.logoutController = async(req,res,next) =>{
    try{
        res.clearCookie('token')
        return res.status(200).json({success:true,message:'Logout Successfully..!'})
    }catch(err){
        next(err)
    }
}