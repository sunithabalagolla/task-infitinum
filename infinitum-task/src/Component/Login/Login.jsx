import { CiMail, CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Services/CreateContext";
import './Login.css';

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const [showEmailPasswordErrMsg, setShowEmailPasswordErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const res = await axios.post("http://localhost:5000/auth/login", data);
      if (res.data) {
        setShowEmailPasswordErrMsg(false);
        let date = new Date();
        date.setMinutes(date.getMinutes() + 60);
        document.cookie = `user=${JSON.stringify(res.data)}; expires=${date.toUTCString()}; path='/'`;
        navigate("/");
        window.location.reload();
      } else {
        setShowEmailPasswordErrMsg(true);
      }
    } catch (error) {
      console.log(error);
      setShowEmailPasswordErrMsg(true);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-title">Welcome Back</h2>
        {showEmailPasswordErrMsg && (
          <div className="error-message">Incorrect email/password</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <CiMail className="input-icon" />
              <input
                type="email"
                className="form-input"
                required
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <CiLock className="input-icon" />
              <input
                type="password"
                className="form-input"
                required
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            <Link to="forgot-password" className="forgot-password-link">Forgot password?</Link>
          </div>

          <div className="form-group remember-me">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? <div>Signing in...</div> : "Sign in"}
          </button>
        </form>
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link">Signup now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
