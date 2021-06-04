import React from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import TrelloPage from './components/TrelloPage'
import Home from './components/Home'
import UsersContextState from './Contexts/UsersContext/UsersContextState'
import ProjectsContextState from './Contexts/ProjectsContext/ProjectsContextState'
import TasksContextState from './Contexts/TasksContext/TasksContextState'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'


function App() {
  
  return (
    <UsersContextState>
      <ProjectsContextState>
        <TasksContextState>
          <Router>
 
            <Navbar />
            <Switch>
              
              <Route exact path={['/', '/login']}>
                <SignIn />
              </Route>

              <Route exact path={'/register'}>
                <SignUp />
              </Route>

              <Route exact path={'/home'}>
                <Home />
              </Route>
              
              <Route exact path={'/tasks'}>
                <TrelloPage />
              </Route>
              
            </Switch>
          </Router>

        </TasksContextState>
      </ProjectsContextState>
    </UsersContextState>
  );
}

export default App;
