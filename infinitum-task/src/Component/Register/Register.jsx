import React, { useState } from "react";
import "./Register.css";
import { CiMail, CiLock } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    console.log(data);
    try {
      const res = await axios.post("http://localhost:5000/auth/register", data);
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-header">
          <h2>Register</h2>
          <p>Get your account now.</p>
        </div>

        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <CiMail className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  required
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <MdOutlinePerson className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  required
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  id="username"
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <CiLock className="input-icon" />
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <button className="submit-button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="loading">
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                  Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="register-terms">
              By registering, you agree to the <span>Terms of Use</span>.
            </div>
          </form>
        </div>

        <p className="register-signin">
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
