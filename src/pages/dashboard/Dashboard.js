import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import CustomTable from "../../components/custometable/CustomTable"; // Assuming this component is correct
import {
  FaDollarSign,
  FaUserAlt,
  FaRocket,
  FaGift,
  FaWallet,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi"; // Icon for Direct Team
import { getDashboard, getPackages } from "../../service/User";
import "./style.css"; // Assuming this is the correct path for your CSS
import formatDate from "../../utils/formatDate";

// Helper function to round numbers to 2 decimal places
const formatNumber = (num) => {
  return num.toFixed(2); // Round to 2 decimal places
};

const columns = [
  { Header: "S.No", accessor: "sn" },
  { Header: "Package Amount", accessor: "packageAmount" },
  { Header: "Start Date", accessor: "startDate" },
  { Header: "Status", accessor: "status" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalInvestment: 0,
    usdtBalance: 0,
    directTeamCount: 0,
    totalIncomeEarned: 0,
    bonuses: {
      roi: 0,
      growthLevelRoi: 0,
      directBonus: 0,
      salaryIncome: 0,
      royaltyIncome: 0,
    },
  });
  const [dataFetched, setDataFetched] = useState(false); // To track when all data is fetched

  // Fetch Dashboard and Packages Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboard();
        console.log("Dashboard Data:", data); // Log the data to check its structure
  
        // Check if the data contains bonuses and structure it correctly
        if (data && data.bonuses) {
          setDashboardData({
            totalInvestment: formatNumber(data.totalInvestment || 0),
            usdtBalance: formatNumber(data.usdtBalance || 0),
            directTeamCount: data.directTeamCount || 0, // Direct Team count
            totalIncomeEarned: formatNumber(data.totalIncomeEarned || 0), // Total Income Earned
            bonuses: {
              roi: formatNumber(data.bonuses.roi || 0),
              growthLevelRoi: formatNumber(data.bonuses.growthLevelRoi || 0),
              directBonus: formatNumber(data.bonuses.directBonus || 0),
              salaryIncome: formatNumber(data.bonuses.salaryIncome || 0),
              royaltyIncome: formatNumber(data.bonuses.royaltyIncome || 0),
            },
          });
        } else {
          toast.error("Invalid data structure from dashboard API.");
        }
      } catch (error) {
        toast.error("Error fetching dashboard data");
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    const fetchPackagesData = async () => {
      try {
        const packagesData = await getPackages();
        console.log("Fetched Packages Data:", packagesData); // Log packagesData
        const updatedPackages = packagesData.map((pkg, i) => ({
          sn: i + 1,
          packageAmount: formatNumber(pkg.packageAmount || 0),
          startDate: formatDate(pkg.startDate) || "none",
          status: pkg.status || "none",
        }));
        setPackages(updatedPackages); // Update the packages state
      } catch (error) {
        toast.error("Error fetching packages");
      }
    };
  
    // Fetch both data simultaneously
    Promise.all([fetchDashboardData(), fetchPackagesData()]).then(() => {
      setDataFetched(true);
      setLoading(false); // Set loading to false after both fetches are done
    });
  }, []);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="dashboard-in">
            <h1 className="main-heading">Dashboard</h1>
            <div className="dashboard-zero">
              <div className="dz-item">
                <FaDollarSign className="dz-icon" /> <h2>Total Investment</h2>
                <h1>${dashboardData.totalInvestment}</h1>{" "}
                {/* Display dynamic totalInvestment */}
              </div>
              <div className="dz-item">
                <FaRocket className="dz-icon" /> <h2>Total Bonus Earned</h2>
                <h1>${dashboardData.totalIncomeEarned}</h1>{" "}
                {/* Display dynamic totalIncomeEarned */}
              </div>
              <div className="dz-item">
                <HiUsers className="dz-icon" /> <h2>Direct Team</h2>
                <h1>{dashboardData.directTeamCount}</h1>{" "}
                {/* Display dynamic directTeamCount */}
              </div>
              <div className="dz-item">
                <FaWallet className="dz-icon" /> <h2>USDT Wallet</h2>
                <h1>${dashboardData.usdtBalance}</h1>{" "}
                {/* Display dynamic usdtBalance */}
              </div>
            </div>

            <h1 className="main-heading">Rewards</h1>
            <div className="dashboard-zero">
              <div className="dz-item">
                <FaDollarSign className="dz-icon" /> <h2>ROI Bonus</h2>
                <h1>
                  $
                  {dashboardData.bonuses && dashboardData.bonuses.roi
                    ? dashboardData.bonuses.roi
                    : "0.00"}
                </h1>
              </div>
              <div className="dz-item">
                <FaRocket className="dz-icon" /> <h2>Growth Level Bonus</h2>
                <h1>
                  $
                  {dashboardData.bonuses && dashboardData.bonuses.growthLevelRoi
                    ? dashboardData.bonuses.growthLevelRoi
                    : "0.00"}
                </h1>
              </div>
              <div className="dz-item">
                <FaGift className="dz-icon" /> <h2>Direct Referral Bonus</h2>
                <h1>
                  $
                  {dashboardData.bonuses &&
                    dashboardData.bonuses.directBonus
                    ? dashboardData.bonuses.directBonus
                    : "0.00"}
                </h1>
              </div>
              <div className="dz-item">
                <FaUserAlt className="dz-icon" /> <h2>Salary Income</h2>
                <h1>
                  $
                  {dashboardData.bonuses && dashboardData.bonuses.salaryIncome
                    ? dashboardData.bonuses.salaryIncome
                    : "0.00"}
                </h1>
              </div>
              <div className="dz-item">
                <FaDollarSign className="dz-icon" /> <h2>Royalty Income</h2>
                <h1>
                  $
                  {dashboardData.bonuses && dashboardData.bonuses.royaltyIncome
                    ? dashboardData.bonuses.royaltyIncome
                    : "0.00"}
                </h1>
              </div>
            </div>

            <h1 className="main-heading">Announcement</h1>
            <div className="dashboard-first">
              <div className="df-main">
                <marquee behavior="scroll" direction="left">
                  <div>EuroByte Coming Soon!</div>
                </marquee>
              </div>
            </div>

            {/* Conditionally render Loader or Table */}
            <CustomTable
              columns={columns}
              data={packages}
              heading="My Packages"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
