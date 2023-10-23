import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forgotpassword' element={<ForgotPasswordPage/>}/>

      </Routes>
    </div>
  );
}

export default App;
