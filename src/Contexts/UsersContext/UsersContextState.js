import React, { useState } from 'react'
import UsersContext from './UsersContext'

const UsersContextState = props => {
    const [ username, setUsername ] = useState('');

    const saveUser = (name) => setUsername(name);

    const ClearUser = () => setUsername('');

    return <UsersContext.Provider value={{ username, saveUser, ClearUser }}>
        {props.children}
    </UsersContext.Provider>
}

export default UsersContextState;