import React from 'react' 
import TrelloPage from './components/TrelloPage'
import TasksContextState from './Contexts/TasksContext/TasksContextState'

function App() {
  return (
    <TasksContextState>
      <TrelloPage>
        
      </TrelloPage>
    </TasksContextState>
  );
}

export default App;
