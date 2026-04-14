import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"data:image/png;base64,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",
    },
    address:{
        type:Object,
        default:{line1:'',line2:''}
    },
    gender:{
        type:String,
        default:"Not Selected"
    },
    dob:{
        type:String,
        default:"Not Selected"
    },
    phone:{
        type:String,
        default:"0000000000"
    }
},)

const userModel=mongoose.models.user || mongoose.model('user',userSchema)

export default userModel