const express=require('express')
const Post=require('../models/post')
const User=require('../models/user')
const auth1=require('../middleware/auth1')
// const multer=require('multer')
// const sharp=require('sharp')
// const {welcomeMail,cancelMail}=require('../emails/account')
const app = new express.Router()

app.put('/follow',auth1,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).then(result=>{
          res.send(result)
      }).catch(err=>{
          return res.status(422).send(err)
      })

    }
    )
})
app.put('/unfollow',auth1,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).send(err)
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).send(err)
      })

    }
    )
})



module.exports=app