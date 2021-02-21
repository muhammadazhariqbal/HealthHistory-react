import React from 'react'
import { useState, useEffect } from 'react'
import Navigation from '../src/Config/router'
import MineNavigationBar from './Components/Navigation'
import {auth} from '../src/Config/firebaseConfig'
import './App.css';


function App() {
  const [user, setUser] = useState()
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
  setUser(user)
    })
  },[])
  

  
  return <>
  
  <MineNavigationBar />
  <Navigation user={user} />
  
  </> 
  

  
 
  
    
  
  
  
}

export default App;
