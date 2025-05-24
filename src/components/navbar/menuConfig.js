import { FaMoneyBillAlt, FaRegChartBar, FaLayerGroup, FaUserAlt, FaWallet, FaDollarSign } from "react-icons/fa"; // Hollow icons
import { FaRegCircleUser } from "react-icons/fa6";
import { FiHome, FiUser, FiLogOut, FiUsers } from "react-icons/fi"; // Outline icons
import { HiOutlineUsers } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri"; // Hollow money icon

export const menuItems = [
  {
    label: "Dashboard",
    icon: <FiHome size={18} />, // Outline home icon
    path: "/dashboard",
  },
  {
    label: "Profile",
    icon: <FaRegCircleUser size={18} />, // Outline user icon
    path: "/profile",
  },
  {
    label: "Income",  // Dropdown item
    icon: <RiMoneyDollarCircleLine size={18} />, // Hollow money dollar icon
    dropdown: [
      {
        label: "Direct Bonus",
        path: "/direct-bonus",
        icon: <MdAttachMoney size={18} /> // Hollow money bill icon for Direct Bonus
      },
      {
        label: "ROI Income",
        path: "/roi",
        icon: <FaRegChartBar size={18} /> // Hollow chart icon for ROI Income
      },
      {
        label: "Growth Level Bonus",
        path: "/growth-level",
        icon: <HiOutlineUsers size={18} /> // Hollow group icon for Growth Level Bonus
      },
    ]
  },
  {
    label: "Team",  
    icon: <FiUsers size={18} />, // Outline users icon for Team
    dropdown: [
      {
        label: "My Team",
        path: "/team",
        icon: <FaUserAlt size={18} /> // Hollow user icon for My Team
      },
      {
        label: "Team Business",
        path: "/team-business",
        icon: <FaRegChartBar size={18} /> // Hollow chart icon for Team Business
      }
    ]
  },
  {
    label: "Wallet",               // New Wallet dropdown
    icon: <FaWallet size={18} />,
    dropdown: [
      {
        label: "USDT Wallet",
        path: "/usdt-wallet",
        icon: <FaDollarSign size={18} />,
      },
      {
        label: "USDT Withdraw",
        path: "/usdt-withdraw",
        icon: <FaDollarSign size={18} />,
      },
    ]
  },
  {
    label: "Deposit",               // New Wallet dropdown
    icon: <FaWallet size={18} />,
    dropdown: [
      {
        label: "Deposit Wallet",
        path: "/deposit",
        icon: <FaDollarSign size={18} />,
      },
      {
        label: "Buy Package",
        path: "/buy-package",
        icon: <FaDollarSign size={18} />,
      },
    ]
  },
  {
    label: "Logout",
    icon: <FiLogOut size={18} />, // Outline log-out icon
    path: "/login",
  },
];
