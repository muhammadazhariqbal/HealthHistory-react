import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MineNavigationBar from '../../Components/Navigation'
import SignInIcon from '../../assets/signIn-icon.png'
import Button from '../../Components/Button'
import Loader from '../../Components/Loader'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, FormGroup, Label, Input, Alert} from 'reactstrap'
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
     // state for showing error message 
     
     const [showErrorMsg, setShowErrorMsg] =useState()
    const history=useHistory()
    // showing loading aniamtion 
    const [loading, setLoading] = useState(false)
    // getting user
    const SignInUser = (e) => {
        setLoading(true)
        e.preventDefault()
        signIn(email,password)
        .then(response=>{
            setLoading(false)
            console.log("welcome to dashboard")
            history.push('/dashboard')
        })
        .catch(error=>{
            setLoading(false)
            setShowErrorMsg(error.message)
            console.log(error.message)
        })
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
                        <p>New User? <a className="login-linked" onClick={()=>{history.push('/signup')}}>Sign up now</a></p>
                        <Form className="signIn-form" onSubmit={SignInUser}>
                        {showErrorMsg && <Alert color="danger">{showErrorMsg}</Alert>}
                            <FormGroup>
                                
                                <Label>Email</Label> <Input type="mail" name="email" placeholder=" Your Email" onChange={getEmail} />
                                <Label>Password</Label><Input type="password" name="password" placeholder="Your Password" onChange={getPassword} />
                             </FormGroup>
                             <FormGroup>
                                 {loading ? <Loader/> : <Button name="Sign In" type="submit" />}
                                 </FormGroup>
                         </Form>
                    </div>
                </Col>

            </Row>
        </Container>
    </>
}
export default SignIn