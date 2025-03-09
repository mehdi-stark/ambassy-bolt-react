import React from "react";
import { Navigation } from "./Navigation";
import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "../store/Store";

const SettingsPage = () => {
  const { user } = useUserStore();
  const userClerk = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">Paramètres</span>
            </h1>
            <p className="text-gray-600">
              Gérez les paramètres de votre compte
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Informations du Compte</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-1"
                disabled
                value={userClerk.user?.emailAddresses[0].emailAddress}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe:
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-1"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
