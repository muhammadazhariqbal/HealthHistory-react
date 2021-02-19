import React from 'react'
import { useState } from 'react'
import MineNavigationBar from '../../Components/Navigation'
import SignInIcon from '../../assets/signIn-icon.png'
import Button from '../../Components/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, FormGroup, Label, Input, } from 'reactstrap'
import {signIn} from '../../Config/firebaseConfig'
import './style.css'
const SignIn = (props) => {
    // state for storing email 
    const [email, setEmail] = useState('')
    // state for storing password
    const [password, setPassword] = useState('')
    
    // getting and setting email 
    const getEmail = (e) => { setEmail(e.target.value) }
    // getting and setting password
    const getPassword = (e) => { setPassword(e.target.value) }
    // toggling page
    
    // getting user
    const SignInUser = (e) => {
        e.preventDefault()
        signIn(email,password)
        .then(response=>{
            props.navigation('dashboard')
            console.log("welcome to dashboard")})
        .catch(error=>{console.log(error.message)})
    }
    

    return <>
        {/* <MineNavigationBar navigation={props.navigation('signin')}/> */}
        <Container>
            <Row>
                <Col md='6'>
                    <div className="left-details">
                        <h3>We Take Care of Your Health</h3>
                        <p>Health problems, even minor ones, can interface with or even overshadow other aspects of your life. Even relatively minor  health issues such as aches, pains, lethargy and indigestion.</p>
                       <img src={SignInIcon}/>
                    </div>
                </Col>
                <Col md='6'>
                    <div className="right-form-details">
                        <p>START FOR FREE</p>
                        <h3>Sign in to MedHistory.</h3>
                        <p>New User? <a className="login-linked" onClick={()=>{
                            props.navigation('signup')
                        }}>Sign up now</a></p>
                        <Form className="signIn-form" onSubmit={SignInUser}>
                            <FormGroup>
                                <Label>Email</Label> <Input type="mail" name="email" placeholder=" Your Email" onChange={getEmail} />
                               
                                <Label>Password</Label><Input type="password" name="password" placeholder="Your Password" onChange={getPassword} />
                                
                            </FormGroup>
                            

                           

                            <FormGroup><Button name="Sign In" type="submit" /></FormGroup>

                        </Form>
                    </div>
                </Col>

            </Row>
        </Container>
    </>
}
export default SignIn