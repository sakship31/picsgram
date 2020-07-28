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


app.put('/updatepic',auth1,async (req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).send({error:"pic cannot be updated"})
         }
         res.send(result)
    })

})


app.post('/search',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}})
    .select("_id name pic")
    .then(user=>{
        res.send({user})
    }).catch(err=>{
        console.log(err)
    })

})

app.get('/following/:id',(req,res)=>{
    User.find({_id:req.params.id})
    .populate("following","_id pic name")
    .then((users)=>{       
                 return res.send({users})
         }).catch(err=>{
             console.log(err)
         })
    
})

app.get('/followers/:id',(req,res)=>{
    User.find({_id:req.params.id})
    .populate("followers","_id pic name")
    .then((users)=>{   
            return res.send({users})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports=app