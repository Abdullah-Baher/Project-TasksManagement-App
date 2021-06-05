import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router'
import UsersContext from '../Contexts/UsersContext/UsersContext'

const AppNavbar = () => {

    const usersContext = useContext(UsersContext);

    let location = useLocation();
    let history = useHistory();
    
    const getNavLinkText = () =>{
        
        if(location.pathname === "/" || location.pathname === "/login"){
            return "Sign Up";
        }
        
        else if(location.pathname === "/home"){
            if(usersContext.username){
                return "Log Out"
            }
            
            else {
                return "Sign In"
            }
        }
        
        else if(location.pathname === "/register"){
            return "Sign In"
        }
        
        else {
            return "Log Out"
        }
        
    }
    
    const homeClick = () => history.push('/home');

    const SignInClick = () => {
        const text = getNavLinkText();
        if(text === "Sign Up") {
            history.push('/register');
        }

        else {
            history.push('/login')
        }
    }

    return (
        <Navbar bg="dark" variant="dark"  style={{ marginBottom: '2%'}}>
                <Navbar.Brand style={{fontSize: '120%', color: 'gold'}}>Task Management App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link style={{fontSize: '120%'}} onClick={homeClick}>Home</Nav.Link>
                    <Nav.Link style={{fontSize: '120%'}} onClick={SignInClick}>{getNavLinkText()}</Nav.Link>
                </Nav>
            
        </Navbar>
    )
}

export default AppNavbar;