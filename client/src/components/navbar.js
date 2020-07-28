import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
import Axios from 'axios'
const Navbar=()=>{
  const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])
  
  const fetchUsers = (query)=>{
    setSearch(query)
    Axios.post('http://localhost:5000/search',
    {
      query
    },{   
      headers:{
        "Content-Type":"application/json"
      },
   
    }).then(res=>res)
    .then(results=>{
      console.log(results)
      setUserDetails(results.data.user)
      
    })
 }
    const renderList = ()=>{
        if(localStorage.getItem("user")){
            return [
             <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger li" style={{color:"black"}}>search</i></li>,
             <li key="5"><Link to="/home" style={{color:"black"}}>Home</Link></li>,
             <li key="2"><Link to="/explore" style={{color:"black"}}>Explore</Link></li>,
             <li key="4"><Link to="/createPost" style={{color:"black"}}>Create Post</Link></li>,
             <li key="3"><Link to="/profile/my" style={{color:"black"}}>Profile</Link></li>,           
             <li  key="6">
              <button style={{
                            margin:"10px",
                            color:"black",
                            backgroundColor:"#e6e9ed",
                            }} className="btn "
             onClick={()=>{
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/login')
             }}
             >
                 Logout
             </button>
             </li>
          
             
            ]
        }else{
          return [
           <li  key="6"><Link to="/login" style={{color:"black"}}>Login</Link></li>,
           <li  key="7"><Link to="/signup" style={{color:"black"}}>Signup</Link></li>
          
          ]
        }
      }

    return (
        <nav className="#e0e0e0 grey lighten-2">
            <div className="nav-wrapper">
            <Link to="#" className="brand-logo left" style={{color:"black",marginLeft:"9px"}}>Social-Connect</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down" >
             {renderList()}
                
            </ul>
            </div> 
            <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content input-field">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile/my'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">
                 <img className="follower-pic"
                        src={item.pic}
                        /><div className="follower-name">{item.name}</div></li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
   
        </nav>
    )
}


export default Navbar