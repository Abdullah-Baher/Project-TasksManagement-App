import React, { useContext, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Container, Form, ListGroup, Modal, Button } from 'react-bootstrap'
import Styled from 'styled-components'
import TasksContext from '../Contexts/TasksContext/TasksContext'
import "react-datepicker/dist/react-datepicker.css";
import "../ModalStyle.css"

const FieldError = Styled.p`
    font-size: 18px;
    color: red;
    margin-top: 5px;
`



const CreateTaskModal = ({ showModal , setShowModal, col }) => {
    
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const handleClose = () => setShowModal(false);
    const tasksContext = useContext(TasksContext);
    const usernames = tasksContext.state.members;

    const taskTitleField = useRef();
    const taskDescriptionField = useRef();
    const taskDeadlineField = useRef();

    const saveTask = () => {

        const tasktitle = taskTitleField.current.value.trim();
        const tasktitleError = document.getElementById('task-title-error');
        
        if(!tasktitle){
            tasktitleError.innerText = 'Please provide a Title';
        } else {
            tasktitleError.innerText = '';
        }

        const taskdescription = taskDescriptionField.current.value.trim();
        const taskdescriptionerror = document.getElementById('task-description-error');

        if(!taskdescription){
            taskdescriptionerror.innerHTML = 'Please provide a Description'
        } else {
            taskdescriptionerror.innerText = '';
        }

        
        const deadline = taskDeadlineField.current.input.defaultValue.trim();
        const selectedDate = new Date(deadline);
        const deadlineError = document.getElementById('deadline-error');
        selectedDate.setHours(0, 0, 0, 0);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if(!deadline){
            deadlineError.innerText = 'Please provide a Deadline';
        } 
    
        else if(selectedDate.getTime() < todayDate.getTime()){
            deadlineError.innerText = 'Task deadline can not be before today';
        }

        else {
            deadlineError.innerText = '';
        }

        const checkboxes = document.getElementsByClassName('form-check-input');
        const membersError = document.getElementById('task-members-error');
        let users = [];

        for(let i = 0; i < checkboxes.length; ++i){
            const val = checkboxes[i];
            if(val.checked){
                users.push(usernames[i]);
            }
        }

        if(users.length === 0){
            membersError.innerText = 'Please add members to this task'
        } else {
            membersError.innerText = '';
        }
        if(!tasktitle || !taskdescription || users.length === 0 || !deadline || selectedDate.getTime() < todayDate.getTime()){
           // handleClose();
            return
        }
        const task = {
            'title': tasktitle,
            'description': taskdescription,
            'deadline': selectedDate,
            'users': users,
            'status': col.title
        }

        
        tasksContext.addNewTask(col.id, task);
        handleClose();
    }

    const listItemClick = (e) => {
        const checkbox = e.target.getElementsByClassName('form-check-input')[0];
        if(checkbox){
            checkbox.checked = !checkbox.checked;
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} size='xl' scrollable centered>
                                    
            <Modal.Header closeButton>
                <Modal.Title><strong>New Task</strong></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>
                    
                    <Form.Group controlId="BasicTaskTitle">
                        <Form.Label style={{fontSize: '20px'}}>Task Title</Form.Label>
                        <Form.Control type="text" size="lg" ref={taskTitleField} placeholder='Enter Task Title' />
                        <Form.Text className="text-muted">Task title should not be more than three words</Form.Text>
                        <FieldError id="task-title-error"></FieldError>
                    </Form.Group>

                    <Form.Group controlId="BasicTaskDescription">
                        <Form.Label style={{fontSize: '20px'}}>Task Description</Form.Label>
                        <Form.Control type="text" size="lg" ref={taskDescriptionField} placeholder='Enter Task Description' />
                        <FieldError id="task-description-error"></FieldError>    
                    </Form.Group> 

                    <Form.Group controlId="BasicTaskDeadline">
                        <Form.Label style={{fontSize: '20px'}}>Task Deadline</Form.Label>
                        <DatePicker wrapperClassName='datePicker' ref={taskDeadlineField} selected={selectedDate} onChange={date => setSelectedDate(date)} />
                        <FieldError id="deadline-error"></FieldError>
                    </Form.Group>
            
                    <Form.Group controlId="BasicTaskMembers">
                        <Form.Label style={{fontSize: '20px'}}>Task Members</Form.Label> 
                        <ListGroup>
                            {   
                                usernames.map((val, idx) => <ListGroup.Item style={{height: '55px'}} onClick={listItemClick}>
                                    <Form.Check label={val}  
                                    name="usersList"
                                    id={"user" + (idx + 1).toString()}/>
                                </ListGroup.Item>)
                            }
                        </ListGroup>
                        <FieldError id="task-members-error"></FieldError>
                    </Form.Group>
            
                </Container>
            </Modal.Body>
        <Modal.Footer>
    
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>

            <Button variant="primary" onClick={saveTask}>
                Save Task
            </Button>

        </Modal.Footer>
    </Modal>
)}

export default CreateTaskModal;