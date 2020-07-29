import React,{useState,useEffect,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import axios from 'axios';
import {UserContext} from '../App'
const Single=()=>{
    const [item,setItem]=useState([])
    const {state,dispatch} = useContext(UserContext)
    const {id}=useParams()
    const history=useHistory()
    useEffect(()=>{
        axios.get('/single/'+id,
        // body:JSON.stringify(
        {
          headers: {
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res)
        .then(result=>{
            setItem(result.data.posts)
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
          const newData = result.data
          setItem(newData)
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
      const newData =result.data
      setItem(newData)
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
      const newData = result.data
    setItem(newData)
  }).catch(err=>{
      console.log(err)
  })
}

const deletePost = (postId)=>{
  axios.delete('/post/'+postId,
  {
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
  } ).then(res=>res)
        .then(result=>{
            history.push('/profile/my')
        })
}
return (<div>
{item.postedBy && item.likes?
<div className="home">
    <div className="card home-card">
     <div className="card-image">
       <div >
         <img style={{ padding:"7px", width:"50px",height:"50px",borderRadius:"30px",float:"left"}}
               src={item.postedBy.pic}
                /></div><h5 style={{paddingLeft:"3px",paddingTop:"12px",fontSize:"20px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile/my"} >{item.postedBy.name}</Link>
                 
         {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right",cursor: "pointer",paddingTop:"9px",paddingRight:"5px"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>}           </h5></div>

         <div className="card-image">
             <img src={item.pic}/>
         </div>
         <div className="card-content input-field">
         
         {(item.likes.includes(state._id)
                            ? 
                            <i className="material-icons li" style={{color:"red"}}  onClick={()=>{unlikePost(item._id)}}>favorite</i>
                            : 
                            <i className="material-icons li" style={{color:"black"}}  onClick={()=>{likePost(item._id)}}>favorite</i>)
                            }
         <br/>{item.likes.length} likes<br/>
            <h6 >{item.caption}</h6>   

            <h6 style={{fontWeight:"500",color:"#81858a"}}> {item.comments.length} Comments</h6>   
            { 
                                    item.comments.map(record=>{
                                        return(
                                          <div>
                                        <h6 key={record._id}><span style={{fontWeight:"500",color:"blue"}}>       
                                        <Link to={record.postedBy._id !== state._id?"/profile/"+record.postedBy._id :"/profile/my"} >{record.postedBy.name}:</Link> </span>{record.text}</h6>
                    
                                        </div>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
             
         </div>
     </div> 
     
       
        
)
</div>
:<div className="brand-logo" style={{fontSize:"40px"}}>Loading...</div>}</div>)}



export default Single