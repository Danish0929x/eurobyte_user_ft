import React, { useEffect, useState } from "react";
import { getReferralList } from "../../service/User";
import formatDate from "../../utils/formatDate";
import Loader from "../../components/loader/Loader";
import CustomTable from "../../components/custometable/CustomTable";
import "./style.css";

const columns = [
  { Header: "S.no", accessor: "sn" },
  { Header: "Member Id", accessor: "memberId" },
  { Header: "Name", accessor: "name" },
  { Header: "Referrer", accessor: "referrer" },
  { Header: "Registration Date", accessor: "registrationDate" },
  { Header: "Invested Amount (USDT)", accessor: "investmentAmount" },
  { Header: "Level", accessor: "level" },
];

function Team() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [depthLimit, setDepthLimit] = useState(1); // default to Direct Team

  const fetchTeamReferrals = async (selectedDepthLimit) => {
    setIsLoading(true);
    try {
      const referrals = await getReferralList(selectedDepthLimit);
      if (!referrals || referrals.length === 0) {
        setData([]);
        setIsLoading(false);
        return;
      }

      const updatedList = referrals.map((member, i) => ({
        sn: i + 1,
        memberId: member.userId || "none",
        name: member.name || "none",
        referrer: member.referrer || "none",
        registrationDate: formatDate(member.registrationDate) || "none",
        investmentAmount: member.InvestedAmount || 0,
        level: member.level,
      }));

      setData(updatedList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching team referrals:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamReferrals(depthLimit);
  }, [depthLimit]);

  const handleTeamTypeChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "direct") {
      setDepthLimit(1);
    } else if (selectedOption === "full") {
      setDepthLimit(16);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="team-in">
          <h1 className="main-heading">Team</h1>
          <br />

          {/* Team Type Selector */}
          <div className="input-group">
            <label>Select Team Type:&nbsp;</label>
            <select
              onChange={handleTeamTypeChange}
              value={depthLimit === 1 ? "direct" : "full"}
              className="input-field" 
            >
              <option value="direct">Direct Team (Level 1)</option>
              <option value="full">Full Team (Up to Level 16)</option>
            </select>
          </div>

          <br />

          <CustomTable data={data} columns={columns} heading="Team Referrals" />

          </div>
        </div>
      )}
    </>
  );
}

export default Team;
