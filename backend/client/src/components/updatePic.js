import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../config') 
const UpdatePic=()=>{
    const history = useHistory()
    const [caption,setCaption] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            axios.put('/updatepic',
            // body:JSON.stringify(
              {
                pic:url,
            }, {
              headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            }).then(res=>res)
            .then(data=>{
        
               if(data.error){
                  M.toast({html: data.error,classes:"#c62828 red darken-3"})
               }
               else{
                   M.toast({html:"Updated profile picture successfully",classes:"#43a047 green darken-1"})
                   history.push('/profile/my')
               }
            }).catch(err=>{
                console.log(err)
            })
            
     }
     },[url])
        const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset",UPLOAD_PRESET)
        data.append("cloud_name",CLOUD_NAME)
        axios.post(URL,data)
        .then(res=>res)
        .then(data=>{
            console.log(data.data.url)
           setUrl(data.data.url)
        })
        .catch(err=>{
            console.log(err)
        })
     
    }
    return (
    <div className="card input-field update"
style={{
    
    marginTop:"30px",
    maxWidth:"500px",
    padding:"20px",
    textAlign:"center"
}}
>
    Browse your profile picture here!
    <div className="file-field input-field">
     <div className="btn #64b5f6 blue darken-1">
         <span>Upload Image</span>
         <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
     </div>
     <div className="file-path-wrapper">
         <input className="file-path validate" type="text" />
     </div>
     </div>
     <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
     onClick={()=>postDetails()}
     >
         Update
     </button>

</div>
)
}


export default UpdatePic