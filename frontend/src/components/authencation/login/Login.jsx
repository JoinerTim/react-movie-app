import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { OutLineButton } from '../../button/Button'
import { useParams } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const {language} = useParams();

  document.title="Login"

  const handleChangeRegister = () => {
    document.title = 'Register'
  }
  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history("/");
    }
    document.title="Login"
    console.log('render')
  }, [history,language]);


  const loginHandler = async (e) => {

    e.preventDefault();
    document.title = 'Movies App'

    
    const config = {
      mode: 'cors',
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      if(localStorage.getItem('authTokenPrev')){

        const { data } = await axios.post(
          // "https://app-main-react-nghia.herokuapp.com/api/auth/login",
          "https://app-main-react-nghia.herokuapp.com/api/auth/login",
          { email, password },
          config
        );


        if(data.token === localStorage.getItem('authTokenPrev')){
          localStorage.setItem("authToken", localStorage.getItem('authTokenPrev'));
          localStorage.setItem("authId", data.user.email);
        }
        else{
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authId", data.user.email);
        }
      }else{
        
        const { data } = await axios.post(
          // "https://app-main-react-nghia.herokuapp.com/api/auth/login",
          "https://app-main-react-nghia.herokuapp.com/api/auth/login",
          { email, password },
          config
        );

        localStorage.setItem("authId", data.user.email);
        localStorage.setItem("authToken", data.token);
      }

      history("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__form__title">Login 💙</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <div className="form-group__align">
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <div className="form-group-remaining">
            <div className="form-group__align">
              <label htmlFor="password">
                Password:
              </label>
            </div>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
          </div>
          <Link to="/forgotpassword" className="login-screen__forgotpassword">
            Forgot Password?
          </Link>
        </div>
        <div className="form-submit">
        <OutLineButton type="submit" className="small">
          Login
        </OutLineButton>
        </div>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register" onClick={handleChangeRegister} target="_self">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;