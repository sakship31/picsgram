const mongoose=require('mongoose')
const {MONGOURI}= require('../../config/keys')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}).then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err)=>{
    console.log("Error has occurred while connecting to the database: ",err);
})
