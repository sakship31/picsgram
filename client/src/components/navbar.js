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
             <li key="2"><Link to="/explore">Explore</Link></li>,
             <li key="3"><Link to="/profile/my">Profile</Link></li>,
             <li key="4"><Link to="/createPost">Create Post</Link></li>,
             <li key="5"><Link to="/myfollowingpost">My following Posts</Link></li>,
             <li  key="6">
              <button className="btn #c62828 red darken-3"
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
           <li  key="6"><Link to="/login">Login</Link></li>,
           <li  key="7"><Link to="/signup">Signup</Link></li>
          
          ]
        }
      }

    return (
        <nav className="#1a237e indigo darken-4">
            <div className="nav-wrapper">
            <Link to="#" className="brand-logo left">Social-Connect</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
             {renderList()}
                
            </ul>
            </div>    
        </nav>
    )
}


export default Navbar