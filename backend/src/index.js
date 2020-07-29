const express=require('express')
var corS=require('cors')
require('./db/mongoose');
const app=express()
app.use(express.json())
const authRouter=require('./routers/auth')
const postRouter=require('./routers/posts')
const userRouter=require('./routers/user')

const port =process.env.PORT || 5000

app.use(corS())
app.use(authRouter)
app.use(postRouter)
app.use(userRouter)

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})