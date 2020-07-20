import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import NavBar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import Explore from './components/explore'
import CreatePost from './components/createPost'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
      <Route path="/createPost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
