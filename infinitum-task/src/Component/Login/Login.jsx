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
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    console.log(data);

    try {
      const res = await axios.post("https://photography-server-tawny.vercel.app/auth/login", data);
      console.log(res.data, "from login");

      if (res.data) {
        setShowEmailPasswordErrMsg(false);

        let date = new Date();
        date.setMinutes(date.getMinutes() + 60);

        document.cookie = `user=${JSON.stringify(res.data)}; expires=${date.toUTCString()};path='/'`;
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
    <div className="register ">
      <div className="container">
        <div className="chatvia-registeration">
          <div className="chatvia-register-header">
            <div>Sign in</div>
            <div>Sign in to continue.</div>
          </div>
          {showEmailPasswordErrMsg && (
            <div className="text-light">Incorrect email/password</div>
          )}
          <div className="chatvia-register-form animate__animated animate__backInLeft p-5">
            <form onSubmit={handleSubmit}>
              <div className="col-auto">
                <label className="sr-only" htmlFor="inlineFormInputGroup">
                  Email
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <CiMail size={20} />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    required
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              <div className="col-auto">
                <div className="d-flex justify-content-between">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">
                    Password
                  </label>
                  <div className="forgotpassword">
                    <Link style={{ textDecoration: "none" }} to="forgot-password">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <CiLock size={20} />
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
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
                className="form-check "
                style={{ marginRight: "230px", marginTop: "10px" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  style={{ width: "20px", height: "20px" }}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? <div><div class="spinner-border spinner-border-sm me-3" role="status">
  <span class="visually-hidden"></span>
</div>Signing in..</div>  :  "Sign in"}
              </button>
            </form>
          </div>
          <p className="register-signin">
            Don't have an account?{" "}
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
