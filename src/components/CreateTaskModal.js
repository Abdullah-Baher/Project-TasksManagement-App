import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Container, Form, ListGroup } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import "../ModalStyle.css"

const usernames = ['Abdullah Baher', 'Salah Mostafa', 'Shehab Khalid', 'Ahmed Salama', 'Mohamed Hatem', 'Ali Adel'];

const CreateTaskModal = () => {
    
    const [ selectedDate, setSelectedDate ] = useState(new Date());


    const listItemClick = (e) => {
        const checkbox = e.target.getElementsByClassName('form-check-input')[0];
        if(checkbox){
            checkbox.checked = !checkbox.checked;
        }
    }

    return (
        <Container fluid>
            <Form.Group controlId="BasicTaskTitle">
                <Form.Label style={{fontSize: '20px'}}>Task Title</Form.Label>
                <Form.Control type="text" size="lg" id='task-title' placeholder='Enter Task Title' required />
                <Form.Text className="text-muted">Task title should not be more than three words</Form.Text>
            </Form.Group>

            <Form.Group controlId="BasicTaskDescription">
                <Form.Label style={{fontSize: '20px'}}>Task Description</Form.Label>
                <Form.Control type="text" size="lg" id='task-description' placeholder='Enter Task Description' required />    
            </Form.Group>

            <Form.Group controlId="BasicTaskDeadline">
                <Form.Label style={{fontSize: '20px'}}>Task Deadline</Form.Label>
                <DatePicker wrapperClassName='datePicker' id='deadline' selected={selectedDate} onChange={date => setSelectedDate(date)} required />
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
            </Form.Group>
        </Container>
           
    )
}

export default CreateTaskModal;