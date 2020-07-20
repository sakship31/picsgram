const express=require('express')
const User=require('../models/user')
// const auth=require('../middleware/auth')
// const multer=require('multer')
// const sharp=require('sharp')
// const {welcomeMail,cancelMail}=require('../emails/account')
const app = new express.Router()

app.post('/signup',async (req,res)=>{
    const user=new User(req.body)
    if(!user.email || !user.password || !user.name){
        return res.status(422).send({error:"please add all the fields"})
     }
    try{
        await user.save()
        const token=await user.generatetoken()
        res.send({user})
    }catch(error){
        res.status(400)
        res.send(error)
    }
})

app.post('/login',async(req,res)=>{
    try{
        const user =await User.findCredential(req.body.email,req.body.password)
        const token=await user.generatetoken()
        res.send({user,token})
    }catch(e){
        res.status(404).send()
    }
})



module.exports=app 