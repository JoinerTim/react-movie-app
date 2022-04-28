import 'swiper/swiper.min.css';
import './assets/font/fontawesome-free-6.0.0-web/css/fontawesome.min.css'
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Routess from './config/Routess'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {GlobalProvider} from './context/GlobalState'
import LoginScreen from './components/authencation/login/Login';
import RegisterScreen from './components/authencation/register/Register';
import Forgot from './components/authencation/forgot/Forgot'
import ResetPassword from './components/authencation/resetPassword/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';



function WrapComponent( {children} ) {
  return children
}



function App() {

  
  return (
    <GlobalProvider>
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<WrapComponent>
          <ToastContainer className="Toastify" position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
            <Header /> 
            <Routess />
           <Footer /> 
          </WrapComponent>}>
        </Route>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/forgotpassword" element={<Forgot/>}/>
        <Route path="/passwordreset/:resetToken" element={<ResetPassword/>}
      />
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
