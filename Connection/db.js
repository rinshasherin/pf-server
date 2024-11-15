const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose/mongoose.connect(connectionString).then(res=>{
    console.log("Server connected to MongoDB!!")
}).catch(err=>{
    console.log(err)
})