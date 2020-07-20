import React from 'react'
const profile=()=>{
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
           margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>

      
        <div style={{
            display:"flex",
            justifyContent:"space-around",
           
        }}>
            <div>
                <img style={{width:"120px",height:"120px",borderRadius:"60px"}}
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                />
              
            </div>
            <div>
                <h4>Sakshi Pandey</h4>
                <h5>email.com</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>6 posts</h6>
                    <h6>6 followers</h6>
                    <h6>6 following</h6>
                </div>

            </div>
        </div>
    
         </div>      
        <div className="gallery">
            
           
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />  
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />  
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />  
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />  
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" /> 
                     <img className="item" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" /> 
            

        
        </div>
    </div>
    )
}


export default profile