import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import AllTasks from './pages/AllTasks'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'
import ProtectedLayout from './layout/ProtectedLayout'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<ProtectedLayout/>}>
          <Route path='/' element={<AllTasks/>}/>
          <Route path='/task' element={<AddTask/>}/>
          <Route path='/task/:id' element={<EditTask/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
