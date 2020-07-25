import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'

const Signup=()=>{
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const history = useHistory()
    const PostData = ()=>{
        console.log(name)
        axios.post('http://localhost:5000/signup',
        // body:JSON.stringify(
          {
            name,
            password,
            email,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>res)
        .then(data=>{
          console.log(data)
               M.toast({html:"Authentication successfull",classes:"#43a047 green darken-1"})
               history.push('/login')
           
        }).catch(err=>{
          M.toast({html: "Authentication failed,please check your email address!",classes:"#c62828 red darken-3"})
            console.log(err)
        })
 
    }
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h4>Signup</h4>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
              <button style={{
                            margin:"10px",
                            color:"black",
                            backgroundColor:"#e6e9ed",
                            }}  className="btn " onClick={()=>PostData()}>Signup</button>
              <h6>
              Already have an account ?<Link to="/login">Login</Link>
            </h6>
        </div>
        </div>
    )
}


export default Signup