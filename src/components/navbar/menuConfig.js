import { FiHome, FiUser, FiSettings, FiLogOut, FiShield, FiUserCheck, FiUsers } from "react-icons/fi";

export const menuItems = [
  {
    label: "Dashboard",
    icon: <FiHome size={18} />,
    path: "/dashboard",
  },
  {
    label: "Profile",
    icon: <FiUser size={18} />,
    path: "/profile",
  },
  {
    label: "Team",  // Added Team section
    icon: <FiUsers size={18} />,  // Using FiUsers icon for Team
    path: "/team",  // The path to the Team page
  },
  {
    label: "Logout",
    icon: <FiLogOut size={18} />,
    path: "/login",
  },
];
