import React from 'react'
import {Link} from 'react-router-dom'
const Navbar=()=>{
    return (
        <nav className="#1a237e indigo darken-4">
            <div className="nav-wrapper">
            <Link to="#" className="brand-logo left">Social-Connect</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
        </div>    
        </nav>
    )
}


export default Navbar