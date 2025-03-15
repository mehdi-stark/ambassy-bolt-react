import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/Store";

const LogoutButton = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    logout();
    navigate("/login");
  };

  return (
    <button
      className="flex items-center w-full px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg font-medium transition-colors"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5 mr-3" />
      Se deconnecter
    </button>
  );
};

export default LogoutButton;
