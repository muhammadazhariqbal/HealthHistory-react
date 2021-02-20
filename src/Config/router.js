import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SignUp from '../views/SignUp' 
import SignIn from '../views/SignIn' 
import Dashboard from '../views/Dashboard' 
  
  export default function Navigation() {
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
            <Route path="/signIn" exact>
              <SignIn />
            </Route>
           
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
