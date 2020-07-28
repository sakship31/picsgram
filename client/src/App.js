import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import NavBar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import Explore from './components/explore'
import CreatePost from './components/createPost'
import {reducer,initialState}  from './reducers/userReducer'
import Followingposts from './components/followingposts';
import Single from './components/singlepost';
import UpdatePic from './components/updatePic';

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
           history.push('/login')
    }
  },[])
  return(
<div>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile/:userid">
        <Profile />
      </Route>
      <Route path="/single/:id">
        <Single />
      </Route>
      <Route path="/home">
        <Followingposts />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
      <Route path="/createPost">
        <CreatePost />
        </Route>
        <Route path="/updatePic">
        <UpdatePic />
      </Route>
      </div>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />     
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
