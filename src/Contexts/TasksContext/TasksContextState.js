import {React, useContext, useState} from 'react'
import TasksContext from './TasksContext'
import ProjectsContext from '../ProjectsContext/ProjectsContext'


const TasksContextState = props => {
    const projectsContext = useContext(ProjectsContext);

    const [ state, setState ] = useState({});

    const clearData = () => setState({});

    const initData = () => setState(projectsContext.getSelectedProjectData())

    const saveTasks = (Data) => {
        projectsContext.updateProject(Data);
        setState({ ...Data });
    }

    
    const addNewTask = (columnId, task) => {
        const numOfTasks = Object.keys(state.tasks).length + 1;
        const column = state.columns[columnId];
        const columnTaskIds = Array.from(column.taskIds)
        const taskId = 'task-' + numOfTasks
        columnTaskIds.splice(column.taskIds.length, 1, taskId)
        const newColumn = {
            ...column,
            taskIds: columnTaskIds
        }
        const newData = {
            ...state,
            tasks: {
                ...state.tasks,
                [taskId]: {id: taskId, title: task.title, description: task.description, deadline: task.deadline, users: task.users, status: task.status, comments: []}
            },

            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            }

        }
        
        saveTasks(newData);
    
    }

    const deleteTask = (taskId) => {
        
        for(const column in state.columns){
            state.columns[column].taskIds = state.columns[column].taskIds.filter(val => val !== taskId);
        }
        
        delete state.tasks[taskId];
        const newData = { ...state }
        
        saveTasks(newData);
    }

    const modifyTask = (task) => {
        
        const newData = {
            ...state,
            tasks:{
                ...state.tasks,
                [task.id]: task
            }
        }

        saveTasks(newData);
    }

    return (
        <TasksContext.Provider value={{state, saveTasks, addNewTask, deleteTask, modifyTask, clearData, initData}}>
            {props.children}
        </TasksContext.Provider>
    )
}

export default TasksContextState;