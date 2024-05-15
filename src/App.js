import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegisterForm/RegistrationForm";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingTicket from "./components/BookingTicket/BookingTicket";


function App() {
  return (
    <Router>
      <div>
      <ToastContainer />
        <Routes>
          <Route exact path="/register" element={<RegistrationForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/resetPassword" element={<ResetPassword />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/booking" element={<BookingTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
