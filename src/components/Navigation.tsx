import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HelpCircle,
  Search,
  LayoutDashboard,
  Users,
  FileSearch2,
  ReceiptText,
  LogOut,
  Menu,
  Settings,
  X,
  UserCheck,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { UserButton, UserProfile } from "@clerk/clerk-react";
import {
  useUserStore,
  useBusinessStores,
  useCampaignStore,
} from "../store/Store";

export function Navigation() {
  const { user, role } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  console.log("print role", role);

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="text-2xl font-bold text-gradient">Ambassy</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-100 transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ width: "240px" }}
      >
        {/* Logo - desktop only */}
        <div className="hidden lg:flex h-16 items-center px-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gradient">Ambassy</h1>
        </div>

        {/* Navigation items */}
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between p-2">
          <div className="space-y-1 md:mt-[32px] mt-12">
            {/* <div className="space-y-1" style={{ marginTop: "64px" }}> */}
            {role === "pro" && (
              <button
                onClick={() => {
                  navigate("/global-campaign");
                }}
                className="w-full mt-4 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-lg font-medium transition-colors"
              >
                Nouvelle Campagne
              </button>
            )}
            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/search");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors mt-2 ${
                isActive("/search")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Search className="w-5 h-5 mr-3" />
              Rechercher
            </button>

            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/campaigns");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive("/campaigns")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ReceiptText className="w-5 h-5 mr-3" />
              Mes Campagnes
            </button>

            {role === "pro" ? (
              <button
                onClick={() => {
                  toggleSidebar();
                  handleNavigation("/ambassadors");
                }}
                className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive("/ambassadors")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <UserCheck className="w-5 h-5 mr-3" />
                Mes Ambassadeurs
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleSidebar();
                  handleNavigation("/collaborators");
                }}
                className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive("/collaborators")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <UserCheck className="w-5 h-5 mr-3" />
                Mes Collaborateurs
              </button>
            )}
            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/dashboard");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Tableau de bord
            </button>
          </div>

          <div className="space-y-1 p-2">
            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/profile");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive("/profile")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Profil
            </button>

            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/help");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive("/help")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Aide/Support
            </button>

            <button
              onClick={() => {
                toggleSidebar();
                handleNavigation("/settings");
              }}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive("/settings")
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Reglages
            </button>

            <LogoutButton />
            {/* <UserButton /> */}
            {/* <button className="flex items-center w-full px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </button> */}

            {role === "pro" && (
              <button
                onClick={() => {
                  toggleSidebar();
                  handleNavigation("/pricing");
                }}
                className="px-4 py-2 bg-gradient-primary hover-gradient-primary text-white rounded-xl font-medium transition-colors w-full"
              >
                Devenez VIP
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
