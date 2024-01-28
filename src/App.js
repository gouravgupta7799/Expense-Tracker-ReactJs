
import './App.css';
import LoginSignup from './Components/Pages/Authanticaton/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './Components/StoreContext/Auth-Context';
import Root from './Components/Pages/Root'
import Profile from './Components/Pages/Profile/Profile';
import Verifaction from './Components/Pages/Varification';
import Welcome from './Components/Pages/Welcome'
import ForgetPassword from './Components/Pages/ForgetPassword/ForgetPassword';

function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Root />

        <Routes>
          <Route path='/' element={!authCtx.isLoggedIn && <LoginSignup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/verifaction' element={<Verifaction />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/welcome' element={<Welcome />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
