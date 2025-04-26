import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../Assets/Images/logo-main.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { getReferrerName, register } from "../../service/auth/Auth";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    referralId: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [currentReferralName, setCurrentReferralName] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("register");  // Keeps track of the current step

  const token = localStorage.getItem("token");
  
  const location = useLocation();

  // Extract the referral ID from the URL (e.g. /register?r=EUR00001)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const referralId = urlParams.get('r');
    if (referralId) {
      setFormData((prev) => ({
        ...prev,
        referralId: referralId,
      }));
      fetchReferralName(referralId);  // Fetch referral name if referralId is present
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "referralId" && value.length >= 7) {
      fetchReferralName(value);
    }

    if (name === "referralId" && value.length < 7) {
      setCurrentReferralName("");
    }
  };

  const fetchReferralName = async (refId) => {
    try {
      const name = await getReferrerName(refId.toUpperCase(), token);
      if (name) {
        setCurrentReferralName(name);
        toast.success("Referral verified");
      } else {
        setCurrentReferralName("");
      }
    } catch {
      setCurrentReferralName("");
    }
  };

  const handleRegister = async () => {
    const { fullName, email, referralId, phone, password, confirmPassword } = formData;

    if (!fullName || !email || !referralId || !phone || !password || !confirmPassword) {
      toast.warn("All fields are required!");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!currentReferralName) {
      toast.error("Referral ID is invalid or empty!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const registerPayload = {
      fullname: fullName.toUpperCase(),  
      phone,
      email,
      referrer: referralId.toUpperCase(),  
      password,
    };
    
    try {
      const result = await register(registerPayload);
      toast.success(result.message || "Registration successful!");
      setUserId(result?.data?.userId || "");
      setStep("done");  // Move to the 'done' step upon successful registration
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login-first">
        <img className="login-logo" alt="logo" src={logo} />
      </div>

      <div className="login-main">
        {step === "register" && (
          <>
            <div className="loma-first">
              <h2>Register</h2>
              <Link to="/login">Already have an account?</Link>
            </div>

            <div className="loma-second">
              <div className="input-group-2">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group-2">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group-2">
                <label>Referral Id</label>
                <input
                  type="text"
                  name="referralId"
                  placeholder="EUR00012"
                  value={formData.referralId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group-2">
                <label>Referral Name</label>
                <input
                  type="text"
                  name="referralName"
                  placeholder="Referral will auto-populate"
                  value={currentReferralName}
                  disabled
                />
              </div>

              <div className="input-group-2">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                />
                <div className="eye" onClick={() => setVisible((prev) => !prev)}>
                  {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>

              <div className="input-group-2 eye-parent">
                <label>Confirm Password</label>
                <input
                  type={confirmVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <div className="eye" onClick={() => setConfirmVisible((prev) => !prev)}>
                  {confirmVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>

            <div className="loma-fourth">
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </>
        )}

        {step === "done" && userId && (
          <>
            <h2>🎉 Welcome to Eurobyte!</h2>
            <div className="input-group-2">
              <p>
                <strong>Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>User ID:</strong> {userId}
              </p>
              <p>
                <strong>Password:</strong> {formData.password}
              </p>
            </div>
            <p>Thank you for registering with us!</p>
            <div className="loma-fourth" style={{ marginTop: "20px" }}>
              <Link to="/login">
                <button type="button">Go to Login</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
