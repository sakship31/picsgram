import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Profile=()=>{
    const [data,setData]=useState([])
    const[userDetail,setUserDetail]=useState([])
    const user=JSON.parse(localStorage.getItem("user"));
    const {userid}=useParams()
    console.log(user)
    useEffect(()=>{
        if(userid!=='my') {axios.get('http://localhost:5000/profile/'+userid,
       
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            console.log('hey')
            console.log(result.data.posts)
            console.log(result)
            console.log(result.data.posts[0].postedBy.name)
            // userD=result.data.posts[0].postedBy.name
            setData(result.data.posts)
            setUserDetail(result.data.posts[0].postedBy)
        })
    }
    else{
        console.log('elseee')
        axios.get('http://localhost:5000/profile/'+user._id,
       
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            console.log('hey')
            console.log(result.data.posts)
            console.log(result)
            console.log(result.data.posts[0].postedBy.name)
            // userD=result.data.posts[0].postedBy.name
            setData(result.data.posts)
            setUserDetail(result.data.posts[0].postedBy)
        })
    }
    },[userid])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
           margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            
      
        <div style={{
            display:"flex",
            justifyContent:"space-around",
           
        }}>
            <div>
                <img style={{width:"120px",height:"120px",borderRadius:"60px"}}
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                />
              
            </div>
            <div>
    {/* <h4>{(JSON.parse(localStorage.getItem("user"))).name}</h4> */}
    <h4>{userDetail.name}</h4>
    
                <h5>{userDetail.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{data.length} posts</h6>
                    <h6>6 followers</h6>
                    <h6>6 following</h6>
                </div>
            </div>
        </div>
    
         </div>      
        <div className="gallery">{
        data.map(item =>{return(
           
                     <img className="item" src={item.pic} />  
            
        )})
}
        </div>
    </div>
    )
}


export default Profile