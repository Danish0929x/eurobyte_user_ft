// menuConfig.js
import {
    FiHome,
    FiUser,
    FiSettings,
    FiLogOut,
    FiShield,
    FiUserCheck
  } from "react-icons/fi";
  
  export const menuItems = [
    {
      label: "Dashboard",
      icon: <FiHome size={18} />,
      path: "/dashboard",
    },
    {
      label: "Profile",
      icon: <FiUser size={18} />,
      path: "/dashboard",
    },
    // {
    //   label: "Settings",
    //   icon: <FiSettings size={18} />,
    //   dropdown: [
    //     { label: "Account", path: "/settings/account", icon: <FiUserCheck size={16} /> },
    //     { label: "Security", path: "/settings/security", icon: <FiShield size={16} /> },
    //   ],
    // },
    {
      label: "Logout",
      icon: <FiLogOut size={18} />,
      path: "/login",
    },
  ];
  