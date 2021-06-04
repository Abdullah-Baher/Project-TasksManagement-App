import React, { useState } from 'react'
import Styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import CreateTaskModal from './CreateTaskModal'
import '../ModalStyle.css'

const Container = Styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 7px;
    width: 325px;
    display: flex;
    flex-direction: column;
    background-color: rgb(238, 238, 238);
`
const Title = Styled.h3`
    padding: 8px;
`
const TaskList = Styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? '#bbbbbb' : 'white')};
    flex-grow: 1;
    min-height: 350px;
    border-radius: 0 0 7px 7px;
    margin-right: 1px;
`
//rgb(10, 187,145) #6c757d #28a745 #17a2b8
const Btn = Styled.button`
    background-color: #28a745;
    border: none;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin-top: 5%;
    align-content: center;
    color: white;
    font-size: xx-large;

    &: active {
        transform: translateY(2px);
    }
`
const ColumnHeaderContainer = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    flex-basis: auto;
    align-items: baseline;
`
const ColumnContainer = Styled.div`
    margin: 0 auto;
    border-radius: 25px;
`

const InnerList = React.memo(({ tasks }) => {
    return tasks.map((task, index) => {
         return <Task key={task.id} task={task} index={index} />
    })
})


const Column = ({ column, tasks }) => {
    
    const [ showModal, setShowModal ] = useState(false)
    
    const handleShow = () => setShowModal(true);
    
    return (
        <ColumnContainer>
            <Container>

                <ColumnHeaderContainer>
                    <Title>{column.title}</Title>
                    <CreateTaskModal setShowModal={setShowModal} showModal={showModal} col={column} />
                    <Btn onClick={handleShow}>+</Btn>
                </ColumnHeaderContainer>

                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => {
                        return <TaskList
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        >   
                            <InnerList tasks={tasks} />
                            {provided.placeholder}
                        </TaskList>    
                    }}
                </Droppable>
            </Container>
    
        </ColumnContainer>
    )
}

export default Column;