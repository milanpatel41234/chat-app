import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import { useSelector } from "react-redux";
import ChatsPage from "./Pages/ChatsPage";

function App() {
  const Auth = useSelector((state) => state.Auth);
  
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={Auth.LoginState ? <ChatsPage/> :  <Navigate to="/login" />} />
        <Route
          path="/signup"
          element={Auth.LoginState ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={Auth.LoginState ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
