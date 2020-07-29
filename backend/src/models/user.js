const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {ObjectId} = mongoose.Schema.Types
const {SECRET_KEY}= require('../../../config/keys')
const Post =require('./post')
// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta");

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        trim:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    pic:{
        type:String,
        default:"https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png" },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
})

userSchema.pre('save',async function(next){
    const user=this
    
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

//used statics to query the whole collection
userSchema.statics.findCredential=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const check=await bcrypt.compare(password,user.password)
    if(!check){
        throw new Error('Unable to login')        
    }
    return user
}

//used methods to query a particular document
userSchema.methods.generatetoken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},SECRET_KEY)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

//will not respond with following deleted attributes 
userSchema.methods.toJSON = function(){
    const user=this
    const userObj=user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}
userSchema.pre('remove',async function(next){
    const user=this
    await Post.deleteMany({postedBy:user._id})
    next()
})

var User=mongoose.model('User',userSchema)

module.exports=User
