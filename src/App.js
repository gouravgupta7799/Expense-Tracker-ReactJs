
import './App.css';
import LoginSignup from './Components/Login/LoginSignup';
import HomePage from './Components/Home/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
