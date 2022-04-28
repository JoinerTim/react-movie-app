import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./resetpassword.scss";
import { OutLineButton } from "../../button/Button";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {resetToken} = useParams()

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `https://app-main-react-nghia.herokuapp.com/api/auth/passwordreset/${resetToken}`,
        {
          password
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <h3 className="resetpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className="form-group">
        <div className="form-group__align">
          <label htmlFor="password">New Password:</label></div>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
        <div className="form-group__align">

          <label htmlFor="confirmpassword">Confirm New Password:</label>
          </div>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Link to="/login" className="resetpassword-screen__login">
            Login
          </Link>
        <div className="form-submit">
        <OutLineButton type="submit" className="small">
          Reset Password
        </OutLineButton>
        </div>
        
      </form>
    </div>
  );
};

export default ResetPasswordScreen;