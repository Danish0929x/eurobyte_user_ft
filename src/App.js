import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./pages/PrivateRouter";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
