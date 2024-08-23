import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Services/CreateContext";


const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  



  const [data, setData] = useState(initialState);
  const [showEmailPasswordErrMsg, setShowEmailPasswordErrMsg] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
   try {
    const res = await axios.post("https://photography-server-tawny.vercel.app/auth/login", data);
    console.log(res.data ,"from login")
    if (res.data != undefined) {
      setShowEmailPasswordErrMsg(false);

     
      let date = new Date();
      date.setMinutes(date.getMinutes() + 60);

      document.cookie = `user=${JSON.stringify(
        res.data
      )}; expires=${date.toUTCString()};path='/'`;
      navigate("/");

      window.location.reload();
    } else {
      setShowEmailPasswordErrMsg(true);
    }
   } catch (error) {
    console.log(error)
   }
    
  };


  

  return (
    <div className="register ">
      <div className="container">
        <div className="chatvia-registeration">
          
          <div className="chatvia-register-header">
            <div>Sign in</div>
            <div>Sign in to continue.</div>
          </div>
          {showEmailPasswordErrMsg && (
              <div className="text-danger">Incorrect email/password</div>
            )}
          <div className="chatvia-register-form animate__animated animate__backInLeft p-5">
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
                    id="inlineFormInputGroup"
                    required
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              <div class="col-auto">
                <div className="d-flex justify-content-between">
                  <label class="sr-only" for="inlineFormInputGroup">
                    Password
                  </label>
                  <div className="forgotpassword">
                    {" "}
                    <Link
                      style={{ textDecoration: "none" }}
                      to="forgot-password"
                    >
                      Forgot password?
                    </Link>{" "}
                  </div>
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CiLock size={20} />
                    </div>
                  </div>
                  <input
                    type="password"
                    class=""
                    required
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    id="inlineFormInputGroup"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div
                class="form-check "
                style={{ marginRight: "300px", marginTop: "10px" }}
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  style={{ width: "20px", height: "20px" }}
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Remember me
                </label>
              </div>

              <button type="submit" >
                Sign in
              </button>
            </form>
          </div>
          <p className="register-signin">
            Don't have an account ?{" "}
            <Link style={{ textDecoration: "none" }} to="/register">
              <span style={{ color: "#7269ef" }}>Signup now</span>
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

export default Login;
