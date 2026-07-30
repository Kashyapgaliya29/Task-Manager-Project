const validateRegister = (req,res,next) =>{
    const {name,email,password} = req.body;

    if(!name || name.trim() === ''){
        return res.status(400).json({success:false,message:"Please Enter valid Name..!"})
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || email.trim() === ''){
        return res.status(400).json({success:false,message:"Email is Required..!"})
    }

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:"Please Enter Valid Email..!"})
    }

    if (!password || password.length < 6 || password.length>20) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Valid Password..!"
        });
    }
    next()
}
const validateLogin = (req,res,next) =>{
    const {email,password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || email.trim() === ''){
        return res.status(400).json({success:false,message:"Email is Required..!"})
    }

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:"Please Enter Valid Email..!"})
    }

    if (!password || password.length < 6 || password.length>20) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Valid Password..!"
        });
    }
    next()
}

const validateTask = (req,res,next) =>{
    const {title,description,dueDate} = req.body;

    if(!title || title.trim() === ''){
        return res.status(400).json({success:false,message:"Please Enter Valid Title"})
    }

    if(!description || description.length>300 || description.trim() === ''){
        return res.status(400).json({success:false,message:"Please Enter Valid Description"})
    }

    if(!dueDate){
        return res.status(400).json({success:false,message:"Enter Valid Date"})
    }
    next()
}

module.exports = {
    validateRegister,
    validateLogin,
    validateTask
}