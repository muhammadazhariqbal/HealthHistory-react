import React from 'react'
import { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import './style.css'

const MineNavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return <>

        <div className="my-navigations">
            <Navbar className="nav-link" expand="md">
                <NavbarBrand className="navbar-brand" href="/">Med<span className="color-style">History.</span></NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink  onClick={()=>{props.navigation('signin')}}>Sign in</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  onClick={()=>{props.navigation('signup')}}>Sign up</NavLink>
                        </NavItem>

                    </Nav>

                </Collapse>
            </Navbar>
        </div>

    </>
}
export default MineNavigationBar