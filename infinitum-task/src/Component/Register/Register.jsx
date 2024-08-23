import React, { useState } from "react";
import "./Register.css";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
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


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post("http://localhost:5000/auth/register", data);
      console.log(res);
      navigate('/')
    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <div className="register ">
      <div className="container">
        <div className="chatvia-registeration">
          <div className="chatvia-logo">
            
          </div>
          <div className="chatvia-register-header">
            <div>Register</div>
            <div>Get your account now.</div>
          </div>
          <div className="chatvia-register-form animate__animated animate__backInLeft">
            <form onSubmit={handleSubmit}>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Email
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      {" "}
                      <CiMail size={20} />{" "}
                    </div>
                  </div>
                  <input
                    type="text"
                    class=""
                    required
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    id="inlineFormInputGroup"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Username
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <MdOutlinePerson size={20} />
                    </div>
                  </div>
                  <input
                    type="text"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder=" Enter Username"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Password
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CiLock size={20} />
                    </div>
                  </div>
                  <input
                    type="password"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                </div>
              </div>

              <button type="submit" >
                Register
              </button>

              <div className="register-terms">
                By registering you agree {" "}
                <span>Terms of Use</span>{" "}
              </div>
            </form>
          </div>
          <p className="register-signin">
            Already have an account ?{" "}
            <Link to="/login">
              <span>Signin</span>
            </Link>
          </p>
          <p className="register-signin">
            © 2024 Photography. Crafted with ❤️ by OutDoor Adventure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

