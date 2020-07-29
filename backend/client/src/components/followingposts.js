import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import {UserContext} from '../App'
const Followingposts=()=>{
    const [data,setData]=useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        axios.get('/followingposts',
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            
            setData(result.data.posts)
        })
    },[])
    const likePost = (id)=>{
        axios.put('/like',  
            {
                postId:id
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          }).then(res=>res)
        .then(result=>{
                  
          const newData = data.map(item=>{
              if(item._id==result.data._id){
                  return result.data
                  
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const unlikePost = (id)=>{
    axios.put('/unlike',  
        {
            postId:id
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res)
    .then(result=>{
            
      const newData = data.map(item=>{
          if(item._id==result.data._id){
              return result.data
              
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

const makeComment = (text,postId)=>{
  axios.put('/comment',
    {
      postId,
      text
  },{
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  } 
  ).then(res=>res)
  .then(result=>{
      console.log(result.data)
      const newData = data.map(item=>{
        if(item._id==result.data._id){
            return result.data
        }else{
            return item
        }
     })
    setData(newData)
  }).catch(err=>{
      console.log(err)
  })
}

return (
  <div>{data?
<div className="home">
  <center><h5 className="heading">Posts of the accounts you follow!</h5></center>{
data.map(item =>{
    return(     
    <div className="card home-card">
                                 <div className="card-image">
       <div >
         <img style={{ padding:"7px", width:"50px",height:"50px",borderRadius:"30px",float:"left"}}
                src={item.postedBy.pic}
                /></div><h5 style={{paddingLeft:"3px",paddingTop:"12px",fontSize:"20px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile/my"} >{item.postedBy.name}</Link>
          </h5></div>

         <div className="card-image">
             <img src={item.pic}/>
         </div>
         <div className="card-content input-field">
         
         {item.likes.includes(state._id)
                            ? 
                            <i className="material-icons li" style={{color:"red"}}  onClick={()=>{unlikePost(item._id)}}>favorite</i>
                            : 
                            <i className="material-icons li" style={{color:"black"}}  onClick={()=>{likePost(item._id)}}>favorite</i>
                            }
         <br/>{item.likes.length} likes<br/>
            <h6 >{item.caption}</h6>   

            <Link to={"/single/"+item._id } ><h6 style={{fontWeight:"500",color:"#81858a"}}> {item.comments.length} Comments</h6></Link>     
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
             
         </div>
     </div> 
     )
       
        
})
 } </div>
 :<div className="brand-logo" style={{fontSize:"40px"}}>Loading...</div>}</div>)}



export default Followingposts