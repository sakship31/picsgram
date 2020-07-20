import React from 'react'
const explore=()=>{
    return (
<div className="home">

            <div className="card home-card">
            <h5 style={{padding:"5px"}}>sakshi</h5>
                 <div className="card-image">
                     <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"/>
                 </div>
                 <div className="card-content input-field">
                 <i className="material-icons" style={{color:"red"}}>favorite</i>
                
                     <h6>6 likes</h6>
                     <p>caption</p>
                
                             <h6 ><span style={{fontWeight:"500"}}>Sakshi</span> Caption</h6>
                            
                       <input  type="text" placeholder="add a comment" />  
                     
                 </div>
             </div> 
        

        </div>
    )
}


export default explore