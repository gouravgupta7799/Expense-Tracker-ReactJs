
import './App.css';
import LoginSignup from './Components/Pages/Authanticaton/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './Components/Pages/Root'
import Profile from './Components/Pages/Profile/Profile';
import Verifaction from './Components/Pages/Varification';
import Welcome from './Components/Pages/Welcome'
import ForgetPassword from './Components/Pages/ForgetPassword/ForgetPassword';
import ExpensesPage from './Components/Expenses/ExpensesPage'
import { useSelector } from 'react-redux';

function App() {

  const isLoggedIn = useSelector((state) => state.authRdx.isLoggedIn)

  return (
    <div className="App">
      <BrowserRouter>
        <Root />
        <Greet />
        <Routes>
          <Route path='/' element={!isLoggedIn && <LoginSignup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/verifaction' element={<Verifaction />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/expense' element={isLoggedIn && <ExpensesPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
