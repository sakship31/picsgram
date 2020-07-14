const express=require('express')
const Post=require('../models/post')
const auth1=require('../middleware/auth1')
// const multer=require('multer')
// const sharp=require('sharp')
// const {welcomeMail,cancelMail}=require('../emails/account')
const app = new express.Router()

app.post('/createpost',auth1,async (req,res)=>{
    const {caption,pic} = req.body 
    if(!caption || !pic){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    // req.user.password = undefined
    const post = new Post({
        caption,
        pic,
        postedBy:req.user
    })
    // post.save().then(result=>{
    //     res.json({post:result})
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    try{
        await post.save()
        res.status(201).send(post)
    }catch(e){
        res.status(400)
        res.send(e)        
    }

})

app.get('/allposts',auth1,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    // .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.send({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

app.get('/myposts',auth1,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    // .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.send({posts})
    }).catch(err=>{
        console.log(err)
    })   
})

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBjZjEwMjM0OGVjNDNkMTQ0ZmIxMjAiLCJpYXQiOjE1OTQ2ODM2NTB9.aGax498enIlziqfFuHcP1RIz9IHGOR2615REAgh8v50

module.exports=app 