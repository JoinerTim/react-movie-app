import { useState } from "react";
import axios from "axios";
import "./forgot.scss";
import { OutLineButton } from "../../button/Button";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://app-main-react-nghia.herokuapp.com/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password 🛠</h3>
        {error && <span className="error-message"> {success ? '': error}</span>}
        {success && <span className="success-message">{error? '' : success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
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
        <div className="form-submit">
        <OutLineButton type="submit" className="small">
          Send Email
        </OutLineButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;