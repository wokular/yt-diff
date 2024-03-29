import React from 'react'
import Home from './pageRouters/Home'
import Differ from './pageRouters/Differ'
import Error from './pageRouters/Error'
import Settings from './pageRouters/Settings'
import Test from './pageRouters/Test'
import './index.css'
import "animate.css"
import { Routes, Switch, Route, Link } from 'react-router-dom'


function App() {
   return (

      <Routes>

         <Route path="/" element={<Home />}></Route>
         <Route path="differ" element={<Differ />}></Route>
         <Route path="settings" element={<Settings />}></Route>
         <Route path='*' element={<Error />}></Route>

      </Routes>
   );
}

export default App;
