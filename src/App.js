import React from 'react'
import { useState, useEffect } from 'react'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import Dashboard from './views/Dashboard'
import { onAuthStateCheck } from './Config/firebaseConfig'
import MineNavigationBar from './Components/Navigation'
import './App.css';


function App() {
  const [navigate, setNavigation] = useState('signin')
  
  const togglePage = (value) =>{
    setNavigation(value)
   
  }
  useEffect(() => {
    onAuthStateCheck(user => {
        if (user) {
            // if user true
            console.log("user here")
            
              setNavigation('dashboard')
            
            
            

        } else{
          console.log("user false")

        }
    })

}, [])
  
  return <>
  

  
  {navigate === "signin" && <MineNavigationBar navigation={togglePage} /> }
  {navigate === "signup" && <MineNavigationBar navigation={togglePage}/> }
  {navigate === "signin" && <SignIn navigation={togglePage}/>}
  {navigate === "signup" && <SignUp navigation={togglePage}/>}
  {navigate === 'dashboard' && <Dashboard navigation={togglePage} />}
  </>
    
  
  
  
}

export default App;
