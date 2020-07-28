import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../config') 
const CreatePost=()=>{
    const history = useHistory()
    const [caption,setCaption] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            axios.post('http://localhost:5000/createpost',
            // body:JSON.stringify(
              {
                caption,
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
                   M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                   history.push('/explore')
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
        ////node server 
     
    }
    return (
    <div className="card input-field update"
style={{
    maxWidth:"500px",
    padding:"20px",
    textAlign:"center"
}}
>
    <input 
    type="text"
     placeholder="caption"
     onChange={(e)=>setCaption(e.target.value)}
     />
    <div className="file-field input-field">
     <div className="btn #64b5f6 blue darken-1">
         <span>Uplaod Image</span>
         <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
     </div>
     <div className="file-path-wrapper">
         <input className="file-path validate" type="text" />
     </div>
     </div>
     <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
     onClick={()=>postDetails()}
     >
         Submit post
     </button>

</div>
)
}


export default CreatePost