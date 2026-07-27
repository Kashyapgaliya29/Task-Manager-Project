const mongoose = require('mongoose')

const connection = async() =>{
    try{
        await mongoose.connect(process.env.MY_URI)
        console.log('Connection Eastablished..!');
    }catch(err){
        console.error('Something Went Wrogn While Connection')
        process.exit(1)
    }
}

module.exports = connection;