const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type:String,
        required:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        
    }
},
{timestamps:true}
);

const User = new mongoose.model("User",UserSchema)

module.exports = User