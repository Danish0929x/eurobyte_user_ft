import axios from "axios";

// const apiURL = "http://localhost:5000/api"; 
const apiURL = "https://eurobytebackend.onrender.com/api"; 
// const apiURL = process.env.REACT_APP_API_URL; 

export const login = async (userId, password) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        userId,
        password,
      });
  
      return response.data; // or return response.data.data if needed
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid user ID or password!";
      throw new Error(message);
    }
  };
  


export const register = async (payload) => {
    console.log(payload)
    try {
      const response = await axios.post(`${apiURL}/auth/register`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (error) {
        if (error.response) {
        throw new Error(error.response.data.message || "Registration failed");
      } else {
        throw new Error("Network error or server not responding");
      }
    }
  };
  

  export const getReferrerName = async (referrerId) => {
    try {
      const response = await axios.get(`${apiURL}/referral/getreferralname/${referrerId}`);
  
      if (response.data.success) {
        return response.data.data.fullName;
      } else {
        throw new Error(response.data.message || "Failed to fetch referrer name");
      }
    } catch (error) {
      console.error("Referrer Fetch Error:", error);
      throw new Error(error.response?.data?.message || "Network error");
    }
  };
  

  export const verifyOtp = async ({ userId, otp }) => {
    try {
      const response = await axios.post(`${apiURL}/auth/verify-otp`, {
        userId,
        otp
      });
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "OTP verification failed");
    }
  };