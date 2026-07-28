const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})