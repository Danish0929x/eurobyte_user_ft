import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import CustomTable from "../../components/custometable/CustomTable"; // Assuming this component is correct
import { FaDollarSign, FaUserAlt, FaRocket, FaGift, FaWallet } from "react-icons/fa";
import { HiUsers } from "react-icons/hi"; // Icon for total team business
import { getDashboard, getPackages } from "../../service/User";
import "./style.css"; // Assuming this is the correct path for your CSS
import formatDate from "../../utils/formatDate";

const columns = [
  { Header: "S.No", accessor: "sn" },
  { Header: "Package Amount", accessor: "packageAmount" },
  { Header: "Start Date", accessor: "startDate" },
  { Header: "Status", accessor: "status" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [dashboardData, setDashboardData] = useState({ totalInvestment: 0, usdtBalance: 0 });
  const [dataFetched, setDataFetched] = useState(false); // To track when all data is fetched

  // Fetch Dashboard and Packages Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboard(); 
        console.log("Dashboard Data:", data); 
        setDashboardData({
          totalInvestment: data.totalInvestment,
          usdtBalance: data.usdtBalance,
        });
      } catch (error) {
        toast.error("Error fetching dashboard data");
      }
    };

    const fetchPackagesData = async () => {
      try {
        const packagesData = await getPackages();
        console.log("Fetched Packages Data:", packagesData); // Log packagesData
        const updatedPackages = packagesData.map((pkg, i) => ({
          sn: i + 1, 
          packageAmount: pkg.packageAmount || 0,
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
            <FaDollarSign className="dz-icon" />{" "}
            <h2>Total Investment</h2>
            <h1>${dashboardData.totalInvestment}</h1> {/* Display dynamic totalInvestment */}
          </div>
          <div className="dz-item">
            <FaRocket className="dz-icon" />{" "}
            <h2>Total Bonus Earned</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <HiUsers className="dz-icon" />{" "}
            <h2>Total Team Business</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaWallet className="dz-icon" />{" "}
            <h2>USDT Wallet</h2>
            <h1>${dashboardData.usdtBalance}</h1> {/* Display dynamic usdtBalance */}
          </div>
        </div>

        <h1 className="main-heading">Rewards</h1>
        <div className="dashboard-zero">
          <div className="dz-item">
            <FaDollarSign className="dz-icon" />{" "}
            <h2>ROI Bonus</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaRocket className="dz-icon" />{" "}
            <h2>Growth Level Bonus</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaGift className="dz-icon" />{" "}
            <h2>Direct referral Bonus</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaUserAlt className="dz-icon" />{" "}
            <h2>Salary Income</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaDollarSign className="dz-icon" />{" "}
            <h2>Royalty Income</h2>
            <h1>$0.00</h1>
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
        <CustomTable columns={columns} data={packages} heading="My Packages" />
      </div>
    </div>
    )}
    </>
  );
}

export default Dashboard;
