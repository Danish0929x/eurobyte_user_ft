import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./pages/PrivateRouter";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Team from "./pages/team/Team";
import TeamBusiness from "./pages/team/TeamBusiness";
import DirectBonus from "./pages/income/DirectBonus";
import ROI from "./pages/income/ROI";
import GrowthLevel from "./pages/income/GrowthLevel";
import USDTWallet from "./pages/wallet/USDTWallet";
import USDTWithdraw from "./pages/wallet/USDTWithdawal";
import Deposit from "./pages/deposit/Deposit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/direct-bonus" element={<DirectBonus />} />
          <Route path="/usdt-wallet" element={<USDTWallet />} />
          <Route path="/usdt-withdraw" element={<USDTWithdraw />} />
          <Route path="/roi" element={<ROI />} />
          <Route path="/growth-level" element={<GrowthLevel />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team-business" element={<TeamBusiness />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
