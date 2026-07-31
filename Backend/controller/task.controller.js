const Task = require('../model/task.model')

exports.createTask = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const {title,description,dueDate} = req.body;

        const newTask = await Task.create({
            userId,
            title,
            description,
            dueDate
        })

        return res.status(201).json({success:true,message:'Task Create Successfullt..!',data:newTask})
    }catch(err){
        next(err)
    }
}
exports.getTaskById = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const id = req.params.id;

        const task = await Task.findOne({_id:id,userId,isDeleted:false})

        if(!task){
            return res.status(404).json({success:false,message:"Task Not Found..!"})
        }

        return res.status(200).json({success:true,data:task})
    }catch(err){
        next(err)
    }
}
exports.getAllTask = async(req,res,next) =>{
    try{
        const userId = req.user._id;

        const tasks = await Task.find({userId,isDeleted:false}).sort({createdAt:-1}).lean()

        if(!tasks){
            return res.status(404).json({success:false,message:"Task Not Found..!"})
        }

        return res.status(200).json({success:true,data:tasks})
    }catch(err){
        next(err)
    }
}
exports.updateTask = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const id = req.params.id;
        const {title,description,dueDate} = req.body;

        const task = await Task.findOne({_id:id,userId,isDeleted:false})

        if(!task){
            return res.status(404).json({success:false,message:"Task Not Found..!"})
        }

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;

        await task.save()

        return res.status(200).json({success:true,message:'Task Updated Successfullt..!',data:task})
    }catch(err){
        next(err)
    }
}
exports.deleteTask = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const id = req.params.id;

        const task = await Task.findOne({_id:id,userId,isDeleted:false})
        if(!task){
            return res.status(404).json({success:false,message:"Task Not Found..!"})
        }
        
        task.isDeleted = true;
        await task.save()

        return res.status(200).json({success:true,message:'Task Deleted.'})
    }catch(err){
        next(err)
    }
}
exports.toggleTaskStatus = async(req,res,next) =>{
    try{
        const userId = req.user._id;
        const id = req.params.id;

        const task = await Task.findOne({_id:id,userId,isDeleted:false})
        if(!task){
            return res.status(404).json({success:false,message:"Task Not Found..!"})
        }
        
        task.completed = !task.completed;
        await task.save()

        return res.status(200).json({success:true,message:'Task Toggle Status Updated..!',data:task})

    }catch(err){
        next(err)
    }
}

exports.taskStates = async(req,res,next) =>{
    try{
        const userId = req.user._id;

        const total = await Task.countDocuments({userId,isDeleted:false})

        const completedTask = await Task.countDocuments({userId,completed:true,isDeleted:false})

        const pendingTask = await Task.countDocuments({userId,completed:false,isDeleted:false})

        const overDueTask = await Task.countDocuments({userId,isDeleted:false,completed:false,dueDate:{$lt:new Date()}})

        return res.status(200).json({
            success:true,
            stats:{
                total:total,
                completedTask:completedTask,
                pendingTask:pendingTask,
                overDueTask:overDueTask
            }
        })

    }catch(err){
        next(err)
    }
}
