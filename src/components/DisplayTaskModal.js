import { React, useContext, useState, useRef } from 'react'
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

//const usernames = ['Abdullah Baher', 'Salah Mostafa', 'Shehab Khalid', 'Ahmed Salama', 'Mohamed Hatem', 'Ali Adel'];

const DisplayTaskModal = ({ task, showModal, setShowModal }) => {
    
    const [ selectedDate, setSelectedDate ] = useState(new Date(task.deadline));
    const handleClose = () => setShowModal(false);

    const tasksContext = useContext(TasksContext);
    const usernames = tasksContext.state.members;

    const taskTitleField = useRef();
    const taskDescriptionField = useRef();
    const taskDeadlineField = useRef();

    const deleteTaskClick = (taskId) => {
        tasksContext.deleteTask(taskId);
        handleClose();
    }

    const saveTaskChangesClick = () => {
        const taskTitle = taskTitleField.current.value.trim();
        const tasktitleError = document.getElementById('task-title-error');
        
        if(!taskTitle){
            tasktitleError.innerText = 'Please provide a Title';
        } else {
            tasktitleError.innerText = '';
        }

        const taskDescription = taskDescriptionField.current.value.trim();
        const taskdescriptionerror = document.getElementById('task-description-error');

        if(!taskDescription){
            taskdescriptionerror.innerHTML = 'Please provide a Description'
        } else {
            taskdescriptionerror.innerText = '';
        }

        const deadline = taskDeadlineField.current.input.defaultValue.trim();
        const deadlineError = document.getElementById('deadline-error');
        const date = new Date(deadline);
        date.setHours(0, 0, 0, 0);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if(!deadline){
            deadlineError.innerText = 'Please provide a Deadline';
        } 
    
        else if(date.getTime() < todayDate.getTime()){
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
        
        if(!taskTitle || !taskDescription || !deadline || users.length === 0 || date.getTime() < todayDate.getTime()){
         //   handleClose();
            return;
        }
        
        const modifiedTask = {
            id: task.id,
            title: taskTitle,
            description: taskDescription,
            deadline: date,
            users: users,
            status: task.status,
            comments: tasksContext.state.tasks[task.id].comments
        }

        tasksContext.modifyTask(modifiedTask);
        handleClose();
    }

    const listItemClick = (e) => {
        const checkbox = e.target.getElementsByClassName('form-check-input')[0];
        if(checkbox){
            checkbox.checked = !checkbox.checked;
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} scrollable centered>
            <Modal.Header closeButton>
                <Modal.Title><strong>{task.title}</strong></Modal.Title>
            </Modal.Header>
                                    
            <Modal.Body>
                <Container fluid>
                    <Form.Group controlId="BasicTaskTitle">
                        <Form.Label style={{fontSize: '20px'}}>Task Title</Form.Label>
                        <Form.Control type="text" size="lg" ref={taskTitleField} defaultValue={task.title} />
                        <Form.Text className="text-muted">Task title should not be more than three words</Form.Text>
                        <FieldError id="task-title-error"></FieldError>
                    </Form.Group>

                    <Form.Group controlId="BasicTaskDescription">
                        <Form.Label style={{fontSize: '20px'}}>Task Description</Form.Label>
                        <Form.Control type="text" size="lg" ref={taskDescriptionField} defaultValue={task.description} />
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
                                    defaultChecked={task.users.includes(val)}
                                    id={"user" + (idx + 1).toString()}/>
                                </ListGroup.Item>)
                            }
                        </ListGroup>
                        <FieldError id="task-members-error"></FieldError>
                    </Form.Group>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" style={{marginRight: 'auto'}} onClick={() => deleteTaskClick(task.id)}>
                    Delete Task
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveTaskChangesClick}>
                    Save Changes
                </Button>
            </Modal.Footer>                            
        </Modal>
    )
}

export default DisplayTaskModal;