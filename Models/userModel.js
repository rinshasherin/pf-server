const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({               // creating schema(structure) for model
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    linkedin:{
        type:String
    },
    github:{
        type:String
    }
})


const users=mongoose.model('users',userSchema)            // model defining   // users(which is collection name, and the given name must same as the collection name)

module.exports=users              // default exporting