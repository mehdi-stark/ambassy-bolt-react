import React, { useState } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div
      className={`h-screen  w-screen p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md ${theme}`}
    >
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Theme</h2>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Notifications</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700 dark:text-gray-300">
            Enable Notifications
          </span>
        </label>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Language</h2>
        <select
          value={language}
          onChange={changeLanguage}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;
