import React from 'react'
import './style.css'
import './responsive.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Table, } from 'reactstrap'
import { signOutUser, gettingUserData } from '../../Config/firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dashboardDetailIcon from '../../assets/dashboard-details-icon.png'
import loadIcon from '../../assets/load-img.gif'
import { faColumns, faUsers, faUserShield, faProcedures, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Dashboard = (props) => {
    // storing users details
    const [usersDetails, setUsersDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [navigateSec, setNavigateSec] = useState('allusers')
    // Calling Data Initially
    useEffect(() => {
        setLoading(true)
        gettingUserData()
            .then(data => {
                setLoading(false)
                setUsersDetails(data)
            })
    }, [])
    const history = useHistory()

    // for showing  only healthy users
    const showOnlyHealthyUsers = () => { setNavigateSec('allhealthyusers') }

    // for showing  only Ill users
    const showOnlyIllUsers = () => { setNavigateSec('allillusers') }

    // for showing all users
    const showAllUsers = () => { setNavigateSec('allusers') }

    // function for signing out current user 
    const signOutCurrentUser = () => {
        signOutUser()
            .then(response => { history.push('/signIn') })
            .catch(error => { alert(error.message) })
    }
    // for getting No of Well users
    var noOfWellUsers;
    noOfWellUsers = []
    usersDetails.map(item => {
        if (item.healthStatus === 'Well') {
            noOfWellUsers.push(item)
        }
    })

    // for getting No of Ill users
    var noOfIllUsers;
    noOfIllUsers = []
    usersDetails.map(item => {
        if (item.healthStatus === 'Ill') {
            noOfIllUsers.push(item)
        }
    })


    return <>
        <Container fluid={true}>
            <Row>
                <Col md="1">
                    <div className="dashboard-navigations">
                        <div className="logo">
                            <h3>Med<span className="color-style">History.</span></h3>
                        </div>
                        <div className="nav-icons-container">
                            <button className='nav-btn'>
                                <FontAwesomeIcon icon={faColumns} onClick={showAllUsers} />
                            </button>
                            <button className='nav-btn'>
                                <FontAwesomeIcon icon={faUserShield} onClick={showOnlyHealthyUsers} />
                            </button>

                            <button className='nav-btn'>
                                <FontAwesomeIcon icon={faProcedures} onClick={showOnlyIllUsers} />
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
                                    <button className="btn">Show All Users</button>
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
                                    {navigateSec === 'allusers' ? loading ? <h2 className="loading-image">Loading..</h2> : usersDetails.map(items => {
                                        return (
                                            <tr>
                                                <td>{items.fullName}</td>
                                                <td>{items.healthStatus}</td>
                                                <td>{items.diseaseName}</td>
                                            </tr>
                                        )
                                    }) : null
                                    }
                                    {navigateSec === 'allhealthyusers' && usersDetails.map(items => {
                                        if (items.healthStatus === 'Well') {
                                            return (
                                                <tr>
                                                    <td>{items.fullName}</td>
                                                    <td>{items.healthStatus}</td>
                                                    <td>{items.diseaseName}</td>
                                                </tr>
                                            )
                                        }

                                    })}
                                    {navigateSec === 'allillusers' && usersDetails.map(items => {
                                        if (items.healthStatus === 'Ill') {
                                            return (
                                                <tr>
                                                    <td>{items.fullName}</td>
                                                    <td>{items.healthStatus}</td>
                                                    <td>{items.diseaseName}</td>
                                                </tr>
                                            )
                                        }

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
                        <div className="box">
                            <FontAwesomeIcon icon={faProcedures} />
                            <h4>Patients</h4>
                            <h1>{noOfIllUsers.length}</h1>
                        </div>
                        <div className="box">
                            <FontAwesomeIcon icon={faUserShield} />
                            <h4>Healthy</h4>
                            <h1>{noOfWellUsers.length}</h1>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}
export default Dashboard