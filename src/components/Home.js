import React, { useContext, useRef, useState } from 'react'
import { Form, Container, Row, Button, Col, ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import UsersContext from '../Contexts/UsersContext/UsersContext'
import ProjectsContext from '../Contexts/ProjectsContext/ProjectsContext'

const ProjectCard = styled.div`
  box-shadow: 3px 2.5px 2.5px rgba(100, 100, 100, 0.5);
  padding: 5px 5px 5px 10px;
  font-size: 25px;
  background-color: #6c757d;
  width: 15rem;
  height: 4rem;
  line-height: 3rem;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  white-space: nowrap;
  color: white;
`

const Home = () => {
    let history = useHistory();
    let projectNameField = useRef();

    const usersContext = useContext(UsersContext);
    const projectsContext = useContext(ProjectsContext);

    const [ newProjectMembers, setNewProjectMembers ] = useState([ usersContext.username ]);
    const memberName = useRef();

    const newProjectClick = () => {
      const projectName = projectNameField.current.value;
      projectsContext.createProject(projectName, [...newProjectMembers]);
      history.push('/tasks')
    }


    const projectCardClick = (e) => {
      const projectName = e.target.innerText;
      projectsContext.openProject(projectName);
      history.push('/tasks');
    }


    const addMember = () => {
      const member = memberName.current.value.trim();
      if(member === ''){
        return;
      }
      setNewProjectMembers([...newProjectMembers, member]);
    }
    
    return (
      usersContext.username !== '' ?
      <div style={{ zIndex: 1, padding: '10px'}}>
        <Container className="text-left rounded shadow-sm bg-light p-5">
          <Form.Label style={{fontSize: '30px', fontWeight: 'bold'}}>Create New Project</Form.Label>
          <Form onSubmit={newProjectClick}>
          <Form.Group controlId="basicNewProject">
              <Form.Label style={{fontSize: '17px', fontWeight: 'bold'}}>New Project Name</Form.Label>
              <Form.Control type="text" ref={projectNameField} size="lg" placeholder="Enter new project name" required />
          </Form.Group>

          <Form.Group controlId="basicNewProjectMembers">
            <Form.Label style={{fontSize: '17px', fontWeight: 'bold'}}>Add A New Team Member To Project</Form.Label>
            
            <Form.Control type="text" ref={memberName} size="lg" placeholder="Enter team member name" />
          
            <Button size="lg" variant="primary" style={{display: 'block', marginTop: '10px'}} onClick={addMember}>Add Member</Button>
              
            <Form.Label style={{fontSize: '17px', marginTop: '10px', fontWeight: 'bold'}}>New Project 's Current Team Members</Form.Label>
            <ListGroup>
            {
              newProjectMembers.map(val => <ListGroup.Item style={{fontSize: '19px',height: '55px'}}>{val}</ListGroup.Item>)
            }
            </ListGroup>
          </Form.Group>

          <Button variant="success" size="lg" type="submit">Create Project</Button>
          </Form>
        </Container>
      

        <Container className="text-left rounded shadow-sm bg-light p-5 mt-3">
          <Form.Label style={{fontSize: '30px'}} >Recent Projects</Form.Label>
          <Row>
            
              {
                  Object.keys(projectsContext.projects).map(val => <ProjectCard
                    onClick={projectCardClick}
                    bg="light"
                    text="dark"
                    className="rounded-0 shadow-sm">                
                    {val}
                  </ProjectCard>)
              }
            
          </Row>

      </Container>
    </div> :

    <center><h2 style={{color: 'white'}}>Please Login or Register First</h2></center>
  
  )
}

export default Home;