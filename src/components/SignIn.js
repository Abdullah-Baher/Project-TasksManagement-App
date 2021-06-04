import React, { useContext, useEffect, useRef } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import UsersContext from '../Contexts/UsersContext/UsersContext'
import ProjectsContext from '../Contexts/ProjectsContext/ProjectsContext'
import TasksContext from '../Contexts/TasksContext/TasksContext'
import '../FormStyle.css'

const SignIn = () => {
    
    const usersContext = useContext(UsersContext);
    const projectsContext = useContext(ProjectsContext)
    const tasksContext = useContext(TasksContext);

    let history = useHistory();
    
    const userNameField = useRef();
    const passwordField = useRef();
    
    useEffect(() => {
        usersContext.ClearUser();
        projectsContext.clearData();
        tasksContext.clearData();
    },[]);

    const loginClick = () => {
        const username = userNameField.current.value.trim();
        const password = passwordField.current.value.trim();

        if(!username || !password){
            return;
        }
        
        usersContext.saveUser(username);
        history.push('/home')
    }

    const goToRegister = () => history.push('/register');

    return(
        <Container className="col-11 col-lg-5 p-5 rounded" style={{backgroundColor: 'rgb(55, 58, 64)'}}>

            <Form.Label className="form-title">SignIn</Form.Label>

            <Form style={{flexGrow: '1'}} onSubmit={(e) => e.preventDefault()}>

                <Form.Group style={{marginBottom: '20px'}} controlId="basicEmail">
                    <Form.Label className="form-label-text">Username</Form.Label>
                    <Form.Control ref={userNameField} type="text" size="lg" placeholder="Enter your username" required />
                </Form.Group>

                <Form.Group style={{marginBottom: '50px'}} controlId="basicPassword">
                    <Form.Label className="form-label-text">Password</Form.Label>
                    <Form.Control ref={passwordField} type="password" size="lg" placeholder="Enter your password" required />
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="form-btn" onClick={loginClick}>Sign In</Button>
                <a className="text-Muted form-goto-register" onClick={goToRegister}>Don't have an account ?</a>
            </Form>
        </Container>
    )
}

export default SignIn;