import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { getTeamBusiness } from "../../service/User"; // Assuming this is your API service
import Loader from "../../components/loader/Loader"; // Assuming this is your Loader component
import { HiUsers } from "react-icons/hi";

function TeamBusiness() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [teamBusiness, setTeamBusiness] = useState(null); // State to store the fetched team business data

  // Function to fetch team business
  const fetchTeamBusiness = async () => {
    try {
      const response = await getTeamBusiness();
      if (response) {
        setTeamBusiness(response.totalBusiness); // Update the state with the total business value
      }
    } catch (error) {
      console.error("Error fetching team business:", error);
    } finally {
      setIsLoading(false); // Hide loader once the request is done
    }
  };

  // Fetch team business data when the component is mounted
  useEffect(() => {
    fetchTeamBusiness();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader /> 
      ) : (
        <div className="dashboard">
          <div className="dashboard-in">
            <h1 className="main-heading">Team Business</h1>
            <div className="dashboard-zero">
              <div className="dz-item">
                <HiUsers className="dz-icon" />{" "}
                <h2>Total Team Business</h2>
                <h1>${teamBusiness || 0}</h1> 
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamBusiness;
