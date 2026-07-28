const express = require('express')
const dotenv = require('dotenv')
const connection = require('./config/db')
const authRouter = require('./route/user.routes')
const cookieparser = require('cookie-parser')

dotenv.config()
connection()

const app = express()
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({success:false,message:err.message || 'Internal Server Error'})
})
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`)
})
