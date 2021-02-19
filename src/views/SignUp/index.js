import React from 'react'
import { useState } from 'react'
import MineNavigationBar from '../../Components/Navigation'
import { register , saveData } from '../../Config/firebaseConfig'
import Button from '../../Components/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import signUpImage from '../../assets/signup-icon.png'
import { Container, Row, Col, Form, FormGroup, Label, Input, } from 'reactstrap'
import './style.css'


const SignUp = (props) => {
    // state for storing email 
    const [email, setEmail] = useState('')

    // state for storing password
    const [password, setPassword] = useState('')

    // state for storing repeatedPassword for validation
    const [repeatedPassword, setRepeatedPassword] = useState('')
    

    // state for storing fullName 
    const [fullName, setFullName] = useState('')

    // state for storing health status
    const [healthStatus, setHealthStatus] = useState('')

    // state for stroing disease name
    const [diseaseName, setDiseaseName] = useState()

    // state for toggling on health status 
    const [healthStatusToggle, setHealthStatusToggle] = useState(false)

    // getting and setting email 
    const getEmail = (e) => { setEmail(e.target.value) }

    // getting and setting fullName
    const getFullName = (e) => { setFullName(e.target.value) }

    // getting and setting password
    const getPassword = (e) => { setPassword(e.target.value) }

    // getting and setting Repeatedpassword
    const getRepeatedPassword = (e) => { setRepeatedPassword(e.target.value) }

    // geting and setting Health status
    const getHealthStatus = (e) => {
        // toggling 
        (e.target.value == 'Ill' ? setHealthStatusToggle(true) : setHealthStatusToggle(false))
        setHealthStatus(e.target.value)
    }


    // getting and setting disease 
    const getDiseaseName = (e) => { setDiseaseName(e.target.value) }
    // getting user 

    const registerUser = (event) => {
        event.preventDefault()
        if(password===repeatedPassword){
           
            register(email,password)
            .then(response=>{
                props.navigation('signin')
                

                console.log("user registered!")
                saveData(fullName,healthStatus,diseaseName)
                .then(response=>{
                    console.log("Data saved!!")
                })
                .catch(error=>{console.log(error.message)})
                
            })
            .catch(erorr=>{console.log(erorr.message)})
           
            
        }
        else {
            console.log("not working!")
        }
        
    
      

    }

    return <>
        {/* <MineNavigationBar/> */}
        <Container>
            <Row>
                <Col md='6'>
                    <div className="left-details">
                        <h3>We Take Care of Your Health</h3>
                        <p>Health problems, even minor ones, can interface with or even overshadow other aspects of your life. Even relatively minor  health issues such as aches, pains, lethargy and indigestion.</p>
                        <img className="signup-image" src={signUpImage} />
                    </div>
                </Col>
                <Col md='6'>
                    <div className="right-form-details">
                        <p>START FOR FREE</p>
                        <h3>Sign up to MedHistory.</h3>
                        <p>Already Member? <a className="login-linked" onClick={()=>{
                            props.navigation('signin')
                        }}>Login</a></p>
                        <Form className="signup-form" onSubmit={registerUser}>
                            <FormGroup>
                                <Label>Email</Label> <Input type="mail" name="email" placeholder=" Your Email" onChange={getEmail} />
                                <Label>Full Name</Label><Input type="text" name="fullName" placeholder=" Your Full Name" onChange={getFullName} />
                                <Label>Password</Label><Input type="password" name="password" placeholder="Your Password" onChange={getPassword} />
                                <Label>Confirm Your Password</Label>
                                <Input type="password" name="password" placeholder="Repeat Your Password" onChange={getRepeatedPassword} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select Your Health Status</Label>
                                <Input type="select" name="select" id="exampleSelect" onChange={getHealthStatus}>
                                    <option>Select Your Health Status</option>
                                    <option>Well</option>
                                    <option>Ill </option>
                                </Input>
                            </FormGroup>

                            {healthStatusToggle &&
                                <FormGroup>
                                    <Label for="exampleSelect">Disease</Label>
                                    <Input type="select" name="select" id="exampleSelect" onChange={getDiseaseName}>
                                        <option>Select Your Disease</option>
                                        <option>Autoimmune Diseases.</option>
                                        <option>COVID19 & Infectious Diseases.</option>
                                        <option>Allergies & Asthma.</option>
                                        <option>Celiac Disease</option>
                                    </Input>
                                </FormGroup>
                            }

                            <FormGroup><Button name="Sign Up" type="submit" /></FormGroup>

                        </Form>
                    </div>
                </Col>

            </Row>
        </Container>
    </>
}
export default SignUp