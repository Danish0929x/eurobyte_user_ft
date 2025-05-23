import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import CustomTable from "../../components/custometable/CustomTable";
import { FaWallet } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import { getTransactions, getWallet } from "../../service/User";

const columns = [
    { Header: "S.No",           accessor: "sn" },
    { Header: "Amount (USDT)", accessor: "amount" },
    { Header: "Date",           accessor: "date" },
    { Header: "Remark",         accessor: "transactionRemark" },
  ];
  
  const USDTWallet = () => {
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      loadWalletData();
    }, []);
  
    const loadWalletData = async () => {
      setLoading(true);
      try {
        // Fetch wallet balance
        const walletInfo = await getWallet();
        setBalance(walletInfo.USDTBalance || 0);
  
        // Fetch USDT transactions (only credits)
        const transactions = await getTransactions("", "USDTWallet", "");
        const formatted = transactions.map((tx, idx) => {
            const credit = tx.creditedAmount || 0;
            const debit = tx.debitedAmount || 0;
            return {
              sn: idx + 1,
              amount: (
                <span style={{ color: credit > 0 ? 'green' : 'red' }}>
                  {credit > 0 ? `+${credit}` : `-${debit}`}
                </span>
              ),
              date: formatDate(tx.createdAt),
              type: credit > 0 ? "Credit" : "Debit",
              transactionRemark: tx.transactionRemark || "-",
            };
          });
        setData(formatted);
      } catch (err) {
        console.error("Error loading USDT wallet data:", err);
        toast.error("Failed to load USDT wallet data");
      } finally {
        setLoading(false);
      }
    };
  
  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <div className="dashboard-in">
        <div className="dashboard-zero mb-6">
          <div className="dz-item">
            <FaWallet className="dz-icon" />
            <h2>USDT Wallet Balance</h2>
            <h1>{balance.toFixed(2)} USDT</h1>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={data}
          heading="USDT Transactions"
        />
      </div>
    </div>
  );
};

export default USDTWallet;
