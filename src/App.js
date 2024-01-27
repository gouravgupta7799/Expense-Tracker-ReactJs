
import './App.css';
import LoginSignup from './Components/Login/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './Components/StoreContext/Auth-Context';
import Root from './Components/Pages/Root'
import Profile from './Components/Pages/Profile';

function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={!authCtx.isLoggedIn ? <LoginSignup /> : <Root />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
