import axios from "axios";

// const apiURL = "http://localhost:5000/api";
const apiURL = "https://eurobytebackend.onrender.com/api";

// Authenticated request (requires token)
export const MakeAuthenticationRequest = async (
  endpoint,
  method = "GET",
  data = null
) => {
  try {
    const storedUser = localStorage.getItem("userData");
    if (!storedUser) {
      localStorage.removeItem("userData");
      throw new Error("User is not authenticated");
    }

    const { token } = JSON.parse(storedUser); // ⚡ corrected to authToken
    console.log(token);

    const config = {
      method: method,
      url: `${apiURL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      //   localStorage.removeItem('userData');
      //   window.location.href = '/login';
      //   throw new Error("Failed to make authenticated request!");
    }
  } catch (error) {
    // localStorage.removeItem('userData');
    // window.location.href = '/login';
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Failed to make authenticated request!");
    }
  }
};

// Unauthenticated request (no token)
export const MakeRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const config = {
      method: method,
      url: `${apiURL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Failed to make request with status: " + response.status);
    }
  } catch (error) {
    console.error("Error in MakeRequest:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await MakeAuthenticationRequest(
      `/user/get-profile`,
      "GET"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// UPDATE Profile
export const updateUserProfile = async (updateData) => {
  try {
    const response = await MakeAuthenticationRequest(
      `/user/update-profile`,
      "PUT",
      updateData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReferralList = async (depthLimit) => {
  try {
    const response = await MakeAuthenticationRequest(
      "/referral/getreferrals",
      "POST",
      {
        depthLimit: depthLimit, // Send depthLimit to the API
      }
    );
    return response.data; // Only return the relevant part of the response
  } catch (error) {
    console.error("Error fetching referral list:", error);
    throw error;
  }
};

export const getDashboard = async () => {
  try {
    const response = await MakeAuthenticationRequest(
      "/user/get-dashboard",
      "GET"
    );
    return response.data; // Only return the relevant part of the response
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const getPackages = async () => {
  try {
    const response = await MakeAuthenticationRequest(
      "/package/get-all-package",
      "GET"
    );
    return response.data; // Only return the relevant part of the response
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getTransactions = async (transactionRemark, type) => {
  try {
    const requestBody = {
      transactionRemark: transactionRemark,
      type: type,
    };

    const response = await MakeAuthenticationRequest(
      "/transaction/get-transaction",
      "POST",
      requestBody
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getTeamBusiness = async () => {
  try {
    const response = await MakeAuthenticationRequest(
      "/referral/get-team-business",
      "GET"
    );
    return response.data; // Only return the relevant part of the response
  } catch (error) {
    console.error("Error fetching Team Business:", error);
    throw error;
  }
};


export const getWallet = async () => {
  try {
    const response = await MakeAuthenticationRequest("/user/get-wallet", "GET");

    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const withdrawUSDT = async (amount) => {
  try {
    const response = await MakeAuthenticationRequest(
      "/withdraw/withdraw-request",
      "POST",
      amount
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting withdrawal:", error);
    throw error;
  }
};
