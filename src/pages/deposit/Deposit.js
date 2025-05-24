import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { depositUSDT, getTransactions, getWallet } from "../../service/User";
import { FaWallet } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import Loader from "../../components/loader/Loader";

const ADMIN_DEPOSIT_WALLET =
  "0x19a79697c651fe801cccbdf867be37bc5d266a9b".toLowerCase();
const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_DECIMALS = 6;

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
];

// Max allowed amount in USDT (adjust as needed)

function Deposit() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [amount, setAmount] = useState("");
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
      setBalance(walletInfo.depositBalance || 0);

      // Fetch USDT transactions (only credits)
      const transactions = await getTransactions("", "USDTWallet", "");
      const formatted = transactions.map((tx, idx) => {
        const credit = tx.creditedAmount || 0;
        const debit = tx.debitedAmount || 0;
        return {
          sn: idx + 1,
          amount: (
            <span style={{ color: credit > 0 ? "green" : "red" }}>
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

  async function connectWallet() {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    try {
      let prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);

      let network = await prov.getNetwork();
      if (network.chainId !== 56) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
          toast.info("Switched to Binance Smart Chain Mainnet");

          prov = new ethers.BrowserProvider(window.ethereum);
          network = await prov.getNetwork();
        } catch (switchError) {
          console.error("Error switching network", switchError);
          toast.error(
            "Please switch your wallet to Binance Smart Chain Mainnet."
          );
          return;
        }
      }

      const signer = await prov.getSigner();
      const address = await signer.getAddress();

      setProvider(prov);
      setSigner(signer);
      setUserAddress(address);
      toast.success(`Connected wallet: ${address}`);
    } catch (err) {
      console.error("Wallet connect error:", err);
      toast.error("Failed to connect wallet");
    }
  }

  const isValidAmount = (val) => {
    // allow digits and optional one dot, no multiple dots
    return /^\d*\.?\d*$/.test(val) && val !== "";
  };

  const sendUSDT = async () => {
    if (!signer) {
      toast.error("Please connect your wallet first.");
      return;
    }

    if (!isValidAmount(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      toast.info("Preparing transaction...");

      const cleanedAmount = amount.replace(/,/g, "").trim();
      const amountInUnits = ethers.parseUnits(
        (cleanedAmount * 1000000000000).toString(),
        USDT_DECIMALS
      );

      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        ERC20_ABI,
        signer
      );

      const balance = await usdtContract.balanceOf(userAddress);

      if (balance < amountInUnits) {
        toast.error("Insufficient USDT balance");
        setLoading(false);
        return;
      }

      const tx = await usdtContract.transfer(
        ADMIN_DEPOSIT_WALLET,
        amountInUnits
      );
      toast.info(
        `Transaction sent. Waiting for confirmation... TxHash: ${tx.hash}`
      );

      await tx.wait();

      toast.success("Transaction confirmed! Recording deposit...");

      const data = await depositUSDT({
        txHash: tx.hash,
        amount: cleanedAmount,
        userWalletAddress: userAddress,
      });

      toast.success(
        `Deposit recorded successfully! Transaction ID: ${data.transaction._id}`
      );
    } catch (error) {
      console.error(error);
      toast.error(`Transaction failed or rejected. ${error.message || ""}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit">
      <h1 className="main-heading">Deposit USDT</h1>
      <div className="dashboard-zero mb-6">
        <div className="dz-item">
          <FaWallet className="dz-icon" />
          <h2>Deposit Wallet Balance</h2>
            <h1>{balance.toFixed(2)} USDT</h1>
        </div>
      </div>

      {!userAddress ? (
        <div className="adpa-first">
          <div className="adpafi-body">
            <div className="button-group">
              <button onClick={connectWallet} className="connect-button">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="adpa-first">
          <div className="adpafi-top">
            <h2>Send USDT</h2>
          </div>
          <div className="adpafi-body">
            <div className="input-group">
              <label>Your Wallet Address</label>
              <input type="text" value={userAddress} readOnly />
            </div>

            <div className="input-group">
              <label>Amount (USDT)</label>
              <input
                type="text"
                placeholder="Enter USDT amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                pattern="^\d*\.?\d*$"
              />
            </div>

            <div className="button-group">
              <button onClick={sendUSDT} disabled={loading}>
                {loading ? "Processing..." : "Send USDT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;
