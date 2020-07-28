import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


const Following=()=>{
    const [data,setData]=useState([])
    const user=useParams()
    useEffect(()=>{
        console.log(user.id)
        if(user.id){
        axios.get('http://localhost:5000/following/'+user.id,
      {
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
                setData(result.data.users[0].followers)
        }).catch(err=>{
            console.log(err)
        })
    
     
    }},[user])
    return (
    <div>{data?
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
      
                 <ul className="collection">
               {data.map(item=>{
                 return (<div className="followers-box"><Link to={ "/profile/"+item._id} 
                 ><li className="collection-item">
                 <img  className="follower-pic"
                        src={item.pic}
                        /><div className="follower-name">{item.name}</div></li></Link><br/> </div>
                ) })}
               
              </ul>
    </div>
    :<div className="brand-logo" style={{fontSize:"40px"}}>Loading...</div>}</div>)
}


export default Following