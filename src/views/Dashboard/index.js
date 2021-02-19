import React from 'react'
import './style.css'
import './responsive.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Table, } from 'reactstrap'
import { signOutUser, gettingUserData, onAuthStateCheck } from '../../Config/firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dashboardDetailIcon from '../../assets/dashboard-details-icon.png'
import { faColumns, faUsers, faUserShield, faProcedures, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Dashboard = (props) => {
    // storing users details
    const [usersDetails, setUsersDetails] = useState([])
    const [navigateSection, setNavigateSection] = useState('all')
   

    useEffect(() => {
        gettingUserData()
                .then(data=>{
                    setUsersDetails(data)
                })

    }, [])
    // function for signing out current user 
    const signOutCurrentUser = () => {
        signOutUser()
            .then(response => {
                props.navigation('signin')
            })
            .catch(error => { console.log(error.message) })
    }
     const showHealthySection = () =>{
        setNavigateSection('allhealthy')
     } 
     const showAllUser = () =>{
        setNavigateSection('all')

     }
     const showIllSection = () =>{
        setNavigateSection('allIll')

     }




    return <>

        <Container fluid={true}>
            <Row>
                <Col md="1">
                    <div className="dashboard-navigations">
                        <div className="logo">
                            <h3>Med<span className="color-style">History.</span></h3>
                        </div>
                        <div className="nav-icons-container">
                            <button className={navigateSection==='all' && 'active','nav-btn'} onClick={showAllUser}>
                                <FontAwesomeIcon icon={faColumns} />
                            </button>

                            <button className={navigateSection==='all' && 'active','nav-btn'}  onClick={showAllUser}>
                                <FontAwesomeIcon icon={faUsers} />
                            </button>

                            <button className={navigateSection==='allhealthy' && 'active','nav-btn'}  onClick={showHealthySection}>
                                <FontAwesomeIcon icon={faUserShield } />
                            </button>

                            <button className={navigateSection==='allIll' && 'active','nav-btn'}  onClick={showIllSection}>
                                <FontAwesomeIcon icon={faProcedures} />
                            </button>
                            <button className="nav-btn" onClick={signOutCurrentUser}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        </div>
                    </div>
                </Col>
                <Col md="8">
                    <div className="dashboard-details">
                        <h2>Dashboard</h2>
                        <div className="dashboard-header">

                            <Row>
                                <Col md="6">
                                    <h5>All Registered Users with their details.</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <button className="btn" onClick={showAllUser}>Show All Users</button>
                                </Col>
                                <Col md='2'>
                                    <img src={dashboardDetailIcon} />
                                </Col>
                            </Row>
                        </div>
                        <div className="allusers-list">

                            <Table responsive hover size="sm">
                                <thead scope="row">

                                    <th>Name</th>
                                    <th>Health Status</th>
                                    <th>Disease</th>
                                    

                                </thead>
                                <tbody>
                                    {navigateSection==='allhealthy' && 
                                    usersDetails.map(items=>{
                                      if(items.healthStatus==='Well'){
                                        return(
                                            <tr>
                                                <td>{items.fullName}</td>
                                                <td>{items.healthStatus}</td>
                                                <td>{items.diseaseName}</td>
                                            </tr>
                                        )
                                      }
                                        
                                    })}
                                    {navigateSection==='allIll' && 
                                    usersDetails.map(items=>{
                                      if(items.healthStatus==='Ill'){
                                        return(
                                            <tr>
                                                <td>{items.fullName}</td>
                                                <td>{items.healthStatus}</td>
                                                <td>{items.diseaseName}</td>
                                            </tr>
                                        )
                                      }
                                        
                                    })}

                                   {navigateSection==='all' && 
                                   usersDetails.map(items=>{
                                      
                                       return(
                                           <tr>
                                               <td>{items.fullName}</td>
                                               <td>{items.healthStatus}</td>
                                               <td>{items.diseaseName}</td>
                                           </tr>
                                       )
                                   })}
                                  
                                  
                                  

                                </tbody>
                            </Table>
                        </div>



                    </div>

                </Col>
                <Col md="3">
                    <div className="side-details">
                        
                        <h3>Number of Users</h3>
                        <div className="box">
                            <FontAwesomeIcon icon={faUsers} />
                            <h4>All Users</h4>
                            <h1>{usersDetails.length}</h1>
                        </div>
                        {/* <div className="box">
                            <FontAwesomeIcon icon={faProcedures} />

                            <h4>Patients</h4>
                            <h1>129</h1>
                        </div>
                        <div className="box">
                            <FontAwesomeIcon icon={faUserShield} />
                            <h4>Healthy</h4>
                            <h1></h1>

                        </div> */}
                    </div>

                </Col>
            </Row>
        </Container>
    </>
}
export default Dashboard