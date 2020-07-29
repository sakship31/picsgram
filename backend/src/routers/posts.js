const express=require('express')
const Post=require('../models/post')
const User=require('../models/user')
const auth1=require('../middleware/auth1')
const { json } = require('body-parser')
// const multer=require('multer')
// const sharp=require('sharp')
// const {welcomeMail,cancelMail}=require('../emails/account')
const app = new express.Router()

app.post('/createpost',auth1,async (req,res)=>{
    const {caption,pic} = req.body 
    if(!caption || !pic){
      return  res.status(422).json({error:"Please add all the fields"})
    }
    const post = new Post({
        caption,
        pic,
        postedBy:req.user
    })
    try{
        await post.save()
        res.status(201).send(post)
    }catch(e){
        res.status(400)
        res.send(e)        
    }

})

app.get('/allposts',auth1,(req,res)=>{   
        Post.find({$and:[{postedBy:{$nin:req.user.following}},{postedBy:{$nin:req.user._id}}]})
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name pic")
        .sort('-createdAt')
        .then((posts)=>{
            res.send({posts})  
        }).catch(err=>{
            console.log(err)
        })
    
})
//user specific posts
app.get('/profile/:id',auth1,(req,res)=>{
    Post.find({postedBy:req.params.id})
    .populate("postedBy","_id name email pic followers following")
    //.populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{       
        User.find({_id:req.params.id})
        .populate("_id","_id name email pic followers following")
        .then((user)=>{
            return res.send({posts,user})
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })   
})

app.get('/followingposts',auth1,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .sort('-createdAt')
    .then(posts=>{
        res.send({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get('/single/:id',auth1,(req,res)=>{
    Post.findById(_id=req.params.id)
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .sort('-createdAt')
    .then((posts)=>{
        res.send({posts})  
    }).catch(err=>{
        console.log(err)
    })
})

app.put('/like',auth1,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/unlike',auth1,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/comment',auth1,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).send(err)
        }else{
            res.send(result)
        }
    })
})


app.delete('/post/:id',auth1,async (req,res)=>{
    try{
        //const user=await Task1.findByIdAndDelete(req.params.id)
        const post=await Post.findOneAndDelete({_id:req.params.id,postedBy:req.user._id})
        if(!post){
            return res.status(404).send()
        }
        res.send(post)
    }catch{
        return res.status(500).send()
    }
})


module.exports=app 