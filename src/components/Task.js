import {React, useState} from 'react'
import Styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Card } from 'react-bootstrap'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import DisplayTaskModal from './DisplayTaskModal'
import TaskCommentsModal from './TaskCommentsModal'
import '../ModalStyle.css'
import '../TaskStyle.css'


const colors = ['purple', 'orangered', 'darkcyan','darkblue', 'darkgreen', 'darkred', 'darkorange', 'darkolivegreen', 'saddlebrown'];

const Container = Styled.div`
    border: 1px solid lightgray;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? '#EEEEEE' : 'rgba(230,230,230, 1)')};
    border-radius: 2px;
    min-height: 50px;
    padding: 5px 5px 5px 10px;
    box-shadow: 3px 2.5px 2.5px rgba(100, 100, 100, 0.5);
`
const OptionsBtn = Styled(AiOutlineEllipsis)`
    width: 40px;
    height: 40px;
    cursor: pointer;
`
const CommentsBtn = Styled(BiCommentDetail)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: #696969;
    margin-left: 10px;
`
const DetailsButton = Styled.button`
    display: inline-block;
    border: none;
    outline: none;
    background-color: inherit;
    padding: 0;
`

const DeadlineContainer = Styled.div`
    display: inline-block;
    background-color: ${props => props.backColor ? 'limegreen' : '#ec9488'};
    margin-bottom: 10px;
    font-weight: bold;
    padding: 5px;
`
const TaskMemberContainer = Styled.div`
    border-radius: 50%;
    background-color: ${props => colors[props.coloridx]};
    color: white;
    margin-bottom: 5px;
    margin-left: 5px;
    color: white;
    text-align: center;
    min-height: 40px;
    min-width: 40px;
    line-height: 40px;
    white-space: nowrap;
`
const CardTitleContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`
const UsersContainer = Styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
`

const Task = ({ task, index }) => {

    const [ showModal, setShowModal ] = useState(false)
    
    const handleShow = () => setShowModal(true);
    
    const [ showCommentsModal, setShowCommentsModal ] = useState(false);

    const handleCommentsShow = () => setShowCommentsModal(true);
    
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => {
                return <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                >
                <Card className="task-card">
                    <Card.Body className="task-card-body">
                        <Card.Title className="task-card-title">
                            <CardTitleContainer>
                                
                                { task.title }
                                <DetailsButton onClick={() => handleShow()}>
                                    <OptionsBtn />
                                </DetailsButton>
                                <DisplayTaskModal task={task} showModal={showModal} setShowModal={setShowModal} />

                            </CardTitleContainer>
                        </Card.Title>

                        <Card.Text className="task-card-body-text">
                            <p>{ task.description }</p>
                        </Card.Text>
                        
                        <DeadlineContainer backColor={task.status === 'Done'}>
                        {task.deadline.getDate().toString() + ' ' + task.deadline.toLocaleString('en-US',{month: 'short'})}
                        </DeadlineContainer>
                        
                        <DetailsButton onClick={() => handleCommentsShow()}>
                            <CommentsBtn />
                        </DetailsButton>

                        <TaskCommentsModal task={task} showCommentsModal={showCommentsModal} setShowCommentsModal={setShowCommentsModal} />

                        <UsersContainer>
                        {
                            task.users.map((val, idx) => {
                                return <TaskMemberContainer coloridx={idx % 10}>
                                { (val[0] + val[1]).toUpperCase() }
                            </TaskMemberContainer>
                            })
                        }
                        </UsersContainer>
                        
                    </Card.Body>
                </Card>        
             </Container>
            }}
        </Draggable>
    )
}

export default Task;