import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import SignUp from '../views/SignUp' 
import SignIn from '../views/SignIn' 
import Dashboard from '../views/Dashboard' 
  
  export default function Navigation({user}) {
    return (
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav> */}
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              {authChecker(!user,<SignIn/>,'/dashboard')}
              </Route>
           
            <Route path="/dashboard">
            {authChecker(user,<Dashboard/>)}

            

             
            </Route>
            <Route path="/signup">
            {authChecker(!user,<SignUp/>,'/dashboard')}

             
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

  const authChecker = (user,component, path="/") =>{
  return user ? component : <Redirect to={path} />
  }