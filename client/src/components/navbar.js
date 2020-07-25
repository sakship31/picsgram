import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar=()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = ()=>{
        if(localStorage.getItem("user")){
            return [
             <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
             <li key="2"><Link to="/explore" style={{color:"black"}}>Explore</Link></li>,
             <li key="3"><Link to="/profile/my" style={{color:"black"}}>Profile</Link></li>,
             <li key="4"><Link to="/createPost" style={{color:"black"}}>Create Post</Link></li>,
             <li key="5"><Link to="/myfollowingpost" style={{color:"black"}}>My following Posts</Link></li>,
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
        </nav>
    )
}


export default Navbar