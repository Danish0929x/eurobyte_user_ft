import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import CustomTable from "../../components/custometable/CustomTable";
import {
  getTransactions,
  getWallet,
  withdrawUSDT,
  getUserProfile,
} from "../../service/User";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";
import Loader2 from "../../components/loader/Loader2";

const columns = [
  { Header: "S.No", accessor: "sn" },
  { Header: "Amount (USDT)", accessor: "amount" },
  { Header: "Date", accessor: "date" },
  { Header: "Remark", accessor: "transactionRemark" },
  { Header: "Status", accessor: "status" },
  { Header: "To Address", accessor: "toAddress" },
  { Header: "Txn Hash", accessor: "txHash" },
];

const USDTWithdraw = () => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [history, setHistory] = useState([]);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch user profile for wallet address
      const profileRes = await getUserProfile();
      setWithdrawAddress(profileRes.data.withdrawAddress || "");

      // Fetch wallet balance
      const wallet = await getWallet();
      setBalance(wallet.USDTBalance || 0);

      // Fetch withdrawal history
      const txs = await getTransactions("USDT Withdraw", "USDTWallet", "");
      const formatted = txs.map((tx, i) => ({
        sn: i + 1,
        amount: tx.debitedAmount || 0,
        date: formatDate(tx.createdAt),
        transactionRemark: tx.transactionRemark || "-",
        status: (
          <span
            style={{
              color:
                tx.status === "Completed"
                  ? "green"
                  : tx.status === "Pending"
                  ? "orange"
                  : "red",
            }}
          >
            {tx.status}
          </span>
        ),
        toAddress: tx.toAddress,
        txHash: tx.txHash,
      }));
      setHistory(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    // Ensure user has set a withdrawal address
    if (!withdrawAddress) {
      return toast.warn(
        "Please update your withdrawal address in your profile"
      );
    }
    if (!withdrawAmt || isNaN(withdrawAmt) || withdrawAmt <= 0) {
      return toast.warn("Enter a valid amount");
    }
    if (withdrawAmt > 1000) {
      return toast.warn("Maximum withdrawal amount is 1000 USDT");
    }
    if (withdrawAmt < 10) {
      return toast.error("Minimum withdrawal amount is 10 USDT");
    }

    if (withdrawAmt > balance) {
      return toast.warn("Amount exceeds balance");
    }
    setIsSubmitting(true);
    try {
      await withdrawUSDT({ amount: parseFloat(withdrawAmt) });
      toast.success("Withdrawal request submitted");
      setWithdrawAmt("");
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Withdrawal failed or limit exceeded"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="deposit">
      {isSubmitting && <Loader2 />}

      <h1 className="main-heading">USDT Withdraw</h1>
      <form onSubmit={handleWithdraw} className="adpa-first">
        <div className="adpafi-top">
          <h2>Withdraw Funds</h2>
        </div>
        <div className="adpafi-body">
          {/* Display user's withdraw address */}
          <div className="input-group">
            <label>
              Withdraw Address <Link to="/profile">Update Address?</Link>
            </label>
            <input
              type="text"
              value={withdrawAddress}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          {/* Available balance */}
          <div className="input-group">
            <label>Available Balance</label>
            <input
              type="text"
              value={`${balance.toFixed(2)} USDT`}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          {/* Withdraw amount input */}
          <div className="input-group">
            <label>Withdraw Amount</label>
            <input
              type="number"
              value={withdrawAmt}
              onChange={(e) => setWithdrawAmt(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter USDT to withdraw"
            />
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <CustomTable
        columns={columns}
        data={history}
        heading="Withdrawal History"
      />
    </div>
  );
};

export default USDTWithdraw;
