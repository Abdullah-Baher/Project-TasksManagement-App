import React, { useContext, useRef, useState } from 'react'
import { Button, Card, Container, Form, Modal } from 'react-bootstrap'
import Styled from 'styled-components'
import UsersContext from '../Contexts/UsersContext/UsersContext'
import TasksContext from '../Contexts/TasksContext/TasksContext'
import '../CommentsStyle.css'

const CardHeaderContainer = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TaskCommentsModal = ({ task, showCommentsModal, setShowCommentsModal }) => {
    
    const usersContext = useContext(UsersContext);
    const tasksContext = useContext(TasksContext);
    const [ taskcomments, setTaskComments ] = useState(tasksContext.state.tasks[task.id].comments);
    const newCommentTextBox = useRef();

    const handleCommentsClose = () => setShowCommentsModal(false);

    const addComment = (e) => {
        e.preventDefault();
        const newComment = newCommentTextBox.current.value.trim();
        
        if(!newComment){
            return;
        }
        
        //tasksContext.state.tasks[task.id].comments.push(newComment);
        setTaskComments([...taskcomments, newComment ]);
    }
    return (
        <Modal show={showCommentsModal} onHide={handleCommentsClose} scrollable centered>
                            
            <Modal.Header closeButton>
                <Modal.Title>
                    <strong>{ task.title + ' Comments' }</strong>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container fluid>
                    <Form onSubmit={addComment}>    
                        <Form.Group controlId="formBasicComment">
                            <Form.Label className="comment-text">New Comment</Form.Label>
                            <Form.Control ref={newCommentTextBox} type="text" size="lg" placeholder="Enter new comment" required />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Add Comment
                        </Button>
                    </Form>
                    <br/>
                    {
                        taskcomments.map(val => <Card  className="comment-card">
                            <Card.Body className="comment-card-body">
                                <Card.Title>
                                    <CardHeaderContainer>
                                        <img alt="profile pic" width="50px" height="50px" src="profile.png" />
                                        <strong className="comment-user-name">{usersContext.username}</strong>
                                    </CardHeaderContainer>
                                </Card.Title>
                                <Card.Text>
                                    <p className="comment-text">{val}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>)
                    }
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCommentsClose}>
                    Close
                </Button>
            </Modal.Footer>
                            
        </Modal>
    )
}


export default TaskCommentsModal;