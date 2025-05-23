// src/components/Login/index.jsx
import React, { useState, useEffect } from "react";
import logo from "../../Assets/Images/logo-main.png";
import "./style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../../service/Auth.js";

/**
 * submitLogin
 * - handles the core login flow
 * - returns true if login succeeded
 */
export async function submitLogin(
  { userId, password },
  { setIsPending, navigate, toast }
) {
  if (!userId || !password) {
    toast.warn("All fields are required!");
    return false;
  }

  setIsPending(true);
  try {
    console.log("Submitting login form with:", { userId, password });
    const userData = await login(userId.toUpperCase(), password);

    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userId", userId);
      toast.success("Login successful!");
      navigate("/dashboard");
      return true;
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsPending(false);
  }

  return false;
}

function Login() {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () =>
    submitLogin(formData, { setIsPending, navigate, toast });

  // On mount: read ?userId=…&password=… and auto-login
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    const password = params.get("password");

    if (userId && password) {
      setFormData({ userId, password });
      submitLogin({ userId, password }, { setIsPending, navigate, toast });
    }
  }, [location.search]);

  return (
    <div className="login">
      <div className="login-first">
        <img className="login-logo" alt="logo" src={logo} />
      </div>
      <div className="login-main">
        <div className="loma-first">
          <h2>Login</h2>
          <Link to="/register">Don't have an account?</Link>
        </div>

        <div className="loma-second">
          <div className="input-group-2">
            <label>User Id</label>
            <input
              type="text"
              name="userId"
              placeholder="EUR00123"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group-2 eye-parent">
            <label>Password</label>
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="eye" onClick={() => setVisible((v) => !v)}>
              {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
        </div>

        <div className="loma-third">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="loma-fourth">
          <button type="button" onClick={handleLogin} disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
