
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {


  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/register' element={<Signup/>}/>
           <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
