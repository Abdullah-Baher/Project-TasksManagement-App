import React, { useState } from 'react'
import ProjectsContext from './ProjectsContext'
import initialData from '../../initial-data'
import initialDataNewProject from '../../initial-data-newproject'

const FCIS_MEMBERS = ['Abdullah Baher', 'Salah Mostafa', 'Shehab Khalid', 'Ahmed Salama', 'Mohamed Hatem', 'Ali Adel'];

const ProjectsContextState = props => {
    const [ projects, setProjects ] = useState({ FCIS: {...initialData, members: FCIS_MEMBERS} });
    const [ selectedProject, setSelectedProject ] = useState('');


    const createProject = (projectName, members) => {
        setProjects({...projects, [projectName]: { ...initialDataNewProject, members: members }});
        setSelectedProject(projectName);
    }

    
    const openProject = (projectName) => setSelectedProject(projectName);

    const clearData = () => {
        setProjects({ FCIS: { ...initialData, members: FCIS_MEMBERS } })
        setSelectedProject('');
    }

    const updateProject = (Data) => {
        const currMembers = projects[selectedProject].members;
        setProjects({ ...projects, [selectedProject]: { ...Data, members: currMembers } })
    }

    const getSelectedProjectData = () => projects[selectedProject];

    return (
        <ProjectsContext.Provider value={{ projects, createProject, openProject, clearData, updateProject, selectedProject, getSelectedProjectData }}>
            {props.children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsContextState;