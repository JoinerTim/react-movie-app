import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './register.scss'
import { OutLineButton } from "../../button/Button";


const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const history = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("https://app-main-react-nghia.herokuapp.com/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      console.log({data})

      localStorage.setItem("authTokenPrev", data.token);

      history("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register 💙</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <div className="form-group__align">
            <label htmlFor="name">Username:</label>
          </div>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-group__align">
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-group__align">
            <label htmlFor="password">Password:</label>
          </div>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-group__align">
            <label htmlFor="confirmpassword">Confirm Password:</label>
          </div>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-submit">
        <OutLineButton type="submit" className="small">
          Register
        </OutLineButton>
        </div>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form >
    </div >
  );
};

export default RegisterScreen;