import React from 'react'
import Home from './Home'
import Differ from './Differ'
import Error from './Error'
import Settings from './Settings'
import './index.css'
import "animate.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
   return (
      <Router>
         <Switch>
            <Route path="/">
               <Home />
            </Route>
            <Route path="/differ">
               <Differ />
            </Route>
            <Route path="/settings">
               <Settings />
            </Route>
            <Route path='*'>
               <Error />
            </Route>
         </Switch>
      </Router>
   );
}

export default App;
