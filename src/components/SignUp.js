import React, { useContext, useEffect, useRef } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import UsersContext from '../Contexts/UsersContext/UsersContext'
import ProjectsContext from '../Contexts/ProjectsContext/ProjectsContext'
import TasksContext from '../Contexts/TasksContext/TasksContext'
import '../FormStyle.css'


const SignUp = () => {
    
    const usersContext = useContext(UsersContext);
    const projectsContext = useContext(ProjectsContext);
    const tasksContext = useContext(TasksContext);

    let history = useHistory();

    const emailField = useRef();
    const passwordField = useRef();
    const usernameField = useRef();
    
    useEffect(() => {
        usersContext.ClearUser();
        projectsContext.clearData();
        tasksContext.clearData()
    },[]);

    const registerClick = () => {
        const email = emailField.current.value.trim();
        const password = passwordField.current.value.trim();
        const username = usernameField.current.value.trim();

        if(username === '' || email === '' || password === ''){

            return;
        }
        
        usersContext.saveUser(username);
        history.push('/home')
    }

    return(
        <Container className="col-11 col-lg-5 p-5 rounded" style={{backgroundColor: 'rgb(55, 58, 64)'}}>
            <Form.Label className="form-title">Sign Up</Form.Label>
            <Form style={{flexGrow: '1'}} onSubmit={(e) => e.preventDefault()}>
            <Form.Group style={{marginBottom: '20px'}} controlId="basicUsername">
                    <Form.Label className="form-label-text">Username</Form.Label>
                    <Form.Control ref={usernameField} type="text" size="lg" placeholder="Enter your username" required />
                </Form.Group>
                <Form.Group style={{marginBottom: '20px'}} controlId="basicEmail">
                    <Form.Label className="form-label-text">Email</Form.Label>
                    <Form.Control ref={emailField} type="email" size="lg" placeholder="Enter your email" required />
                </Form.Group>
                <Form.Group style={{marginBottom: '50px'}} controlId="basicPassword">
                    <Form.Label className="form-label-text">Password</Form.Label>
                    <Form.Control ref={passwordField} type="password" size="lg" placeholder="Enter your password" required />
                </Form.Group>


                <Button type="submit" variant="primary" size="lg" className="form-btn" onClick={registerClick}>Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUp;