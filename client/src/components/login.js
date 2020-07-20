import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'
const Login=()=>{
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const history = useHistory()
    const PostData = ()=>{
        axios.post('http://localhost:5000/login',
        // body:JSON.stringify(
          {
            password,
            email,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>res)
        .then(data=>{
          console.log(data)   
          console.log(data.data.token)
          console.log(data.data.user)
               localStorage.setItem("jwt",data.data.token)
               localStorage.setItem("user",JSON.stringify(data.data.user))
               M.toast({html:"Logged in successfully",classes:"#43a047 green darken-1"})
               history.push('/explore')
           
        }).catch(err=>{
          M.toast({html: "Log in failed",classes:"#c62828 red darken-3"})
            console.log(err)
        })
    }

    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h4 >Login</h4>
            <input
            type="text"
            placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
              <button className="btn waves-effect waves-light #1a237e indigo darken-4" onClick={()=>PostData()}>Login</button>
              <h6>
              Don't have an account ?<Link to="/signup">Signup</Link>
            </h6>
        </div>
        </div>
    )
}


export default Login