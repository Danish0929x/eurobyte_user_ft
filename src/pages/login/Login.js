import React, { use, useState } from "react";
import logo from "../../Assets/Images/logo-main.png";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../../service/Auth.js";

function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: ""
  });

  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    const { userId, password } = formData;

    if (userId === "" || password === "") {
      toast.warn("All fields are required!");
      return;
    }

    setIsPending(true);

    try {
      console.log("Submitting login form with:", formData); // ✅ Console log added
      const userData = await login(userId.toUpperCase(), password);

      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userId", userId);  // Save userId

        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect after login
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="login">
      <div className="login-first">
        <img className="login-logo" alt="logo-i" src={logo} />
      </div>
      <div className="login-main">
        <div className="loma-first">
          <h2>Login</h2>
          <Link to="/register">Don't have an account?</Link>
        </div>

        <div className="loma-second">
          <div className="input-group-2">
            <label>Member Id</label>
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
            <div className="eye" onClick={() => setVisible(prev => !prev)}>
              {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
        </div>

        <div className="loma-third">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="loma-fourth">
          <button
            type="button"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
