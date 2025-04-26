import { FaBriefcase, FaMoneyCheck, FaWallet } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FiCopy, FiLink, FiTwitter } from "react-icons/fi";
import { RiFacebookCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiFillDatabase } from "react-icons/ai";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./style.css";
import CustomTable from "../../components/custometable/CustomTable";

const columns = [
  { Header: "S.No", accessor: "sn" },
  { Header: "Investment Date", accessor: "date" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Token Rate", accessor: "tokenRate" },
  { Header: "Tokens (ADVB)", accessor: "tokens" },
  { Header: "Profit", accessor: "profit" },
  { Header: "Status", accessor: "status" },
];

const dummyData = Array.from({ length: 5 }, (_, index) => ({
  sn: index + 1,
  date: "01/01/2024",
  amount: "$0.00",
  tokenRate: "$0.00",
  tokens: "$0.00",
  profit: "$0.00",
  status: <h4 style={{ color: "green" }}>Active</h4>
}));

function Dashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = localStorage.getItem("userId");

  // Function to copy the referral link
  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/register?r=${userId}`;

    const textField = document.createElement("textarea");
    textField.innerText = referralLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-in">
        <h1 className="main-heading">Dashboard</h1>
        <div className="dashboard-zero">
          <div className="dz-item">
            <FaMoneyCheck />
            <h2>Total Investment</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaBriefcase />
            <h2>Total Bonus Earned</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaWallet />
            <h2>Total Team Business</h2>
            <h1>$0.00</h1>
          </div>
          <div className="dz-item">
            <FaWallet />
            <h2>USDT Wallet</h2>
            <h1>$0.00</h1>
          </div>
        </div>

        <div className="dashboard-first">
          <div className="df-top">
            <h2 className="top-head">Announcement</h2>
          </div>
          <div className="df-main">
            <marquee behavior="scroll" direction="left">
              <div>EuroByte Coming Soon!</div>
            </marquee>
          </div>
        </div>

        <div className="dashboard-second">
          <div className="ds-left">
            <img
              src="https://res.cloudinary.com/dev6cpp4u/image/upload/v1696426462/refer-earn-2_zdlybk.png"
              alt="ds-left"
            />
            <div className="dsl-down">
              <div className="dsl-down-1" onClick={copyReferralLink}>
                Referral Link <FiLink />
              </div>
              <div className="dsl-down-2">
                Invite friends <FiCopy />
                <div className="dsld-icons">
                  <BsWhatsapp />
                  <RiFacebookCircleLine />
                  <FiTwitter />
                </div>
              </div>
            </div>
          </div>

          <div className="ds-right">
            <div className="dsr-top">
              <h2 className="top-head">Statistics</h2>
            </div>
            <div className="dsr-body">
              <div className="dsr-item">
                <Link className="dsri-left" to="#">
                  <AiFillDatabase />
                  <h2>Package Staking</h2>
                </Link>
                <span>$0.00</span>
              </div>
              <div className="dsr-item">
                <Link className="dsri-left" to="#">
                  <AiFillDatabase />
                  <h2>Direct Referral Bonus</h2>
                </Link>
                <span>$0.00</span>
              </div>
              <div className="dsr-item">
                <Link className="dsri-left" to="#">
                  <AiFillDatabase />
                  <h2>Growth Level ROI</h2>
                </Link>
                <span>$0.00</span>
              </div>
              <div className="dsr-item">
                <Link className="dsri-left" to="#">
                  <AiFillDatabase />
                  <h2>Salary Income</h2>
                </Link>
                <span>$0.00</span>
              </div>
              <div className="dsr-item">
                <Link className="dsri-left" to="#">
                  <AiFillDatabase />
                  <h2>Royalty Income</h2>
                </Link>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Component */}
        {/* <CustomTable columns={columns} data={dummyData} heading="My Packages" /> */}
      </div>
    </div>
  );
}

export default Dashboard;
