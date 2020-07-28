import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import {UserContext} from '../App'
import { useParams, Link } from 'react-router-dom';


const Following=()=>{
    const [data,setData]=useState([])
    const {state,dispatch} = useContext(UserContext)
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
          console.log(result.data.users[0].following)
                setData(result.data.users[0].following)
        }).catch(err=>{
            console.log(err)
        })
    
     
    }},[user])

    const followUser = (uid)=>{
      axios.put('http://localhost:5000/follow',
      // body:JSON.stringify(
        {
          followId:uid
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res)
      .then(data=>{
              console.log(data)
      })
  }
    return (
    <div>{data?
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
      
                 <ul className="collection">
               {data.map(item=>{
                 return (<div className="followers-box"><li className="collection-item"><Link to={item._id===state._id?"/profile/my": "/profile/"+item._id} 
                 >
                 <img  className="follower-pic"
                        src={item.pic}
                        /><div className="follower-name">{item.name}</div><br/>{item.followers.includes(state._id) || item._id===state._id?"": <button style={{
                          
                          color:"black",
                          width:"150px",
                          backgroundColor:"#e6e9ed",
                          float:"right",
                          marginTop:"-20px"
                      }} className="btn "
                       onClick={()=>followUser(item._id)}
                       >
                           Follow
                       </button>
                       }</Link></li></div>
                ) })}
               
              </ul>
    </div>
    :<div className="brand-logo" style={{fontSize:"40px"}}>Loading...</div>}</div>)
}


export default Following