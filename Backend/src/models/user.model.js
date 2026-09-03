const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true, 'Name must be unique'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true, 'Account with this email already exists'],
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Users', userSchema);