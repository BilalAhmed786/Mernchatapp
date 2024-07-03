import './App.css'
import Registeration from './pages/registeration'
import Login from './pages/login'
import Forgetpassword from './pages/forgetpassword'
import ResetPassword from './pages/resetpassword'
import Chat from './pages/chat'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
     <div className="text-8xl text-orange-500">

      <BrowserRouter>
      <Routes>
      <Route path='/' element= {<Registeration/>}></Route>
      <Route path='/login' element= {<Login/> }></Route>
      <Route path='/forgetpassword' element= {<Forgetpassword/> }></Route>
      <Route path='/resetpassword/:token' element= {<ResetPassword/> }></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
