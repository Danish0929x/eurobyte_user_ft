import React, { useEffect, useState } from "react";
import { getTransactions } from "../../service/User";  // Assuming getTransactions is already available
import formatDate from "../../utils/formatDate"; // Helper to format dates (if needed)
import Loader from "../../components/loader/Loader"; // Assuming Loader is your loading spinner
import CustomTable from "../../components/custometable/CustomTable"; // Assuming CustomTable is your table component

const columns = [
  { Header: "S.no", accessor: "sn" },
  { Header: "Amount (USDT)", accessor: "amount" },
  { Header: "Date", accessor: "date" },
  { Header: "Type", accessor: "type" },
  { Header: "Transaction Remark", accessor: "transactionRemark" },
];

function DirectBonus() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const transactions = await getTransactions("Direct Bonus", "credited"); // Example: Fetch transactions with remark 'Growth Level' and type 'credited'
      
      if (!transactions || transactions.length === 0) {
        setData([]);
        setIsLoading(false);
        return;
      }

      // Assuming the response from getTransactions has the correct fields
      const updatedList = transactions.map((transaction, i) => ({
        sn: i + 1,
        transactionRemark: transaction.transactionRemark || "none",
        type: "Direct Bonus",
        amount: transaction.creditedAmount || 0,
        date: formatDate(transaction.date) || "none", // Format date if needed
      }));

      setData(updatedList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="team-in">
            <h1 className="main-heading">Direct Bonus</h1>
            <br />
            
            {/* Transactions Table */}
            <CustomTable data={data} columns={columns} heading="Direct Bonus" />
          </div>
        </div>
      )}
    </>
  );
}

export default DirectBonus