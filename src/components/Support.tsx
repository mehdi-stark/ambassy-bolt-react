import { useUser } from "@clerk/clerk-react";
import { Navigation } from "./Navigation";
import { Instagram, Twitch } from "lucide-react";
import shopifyLogo from "../assets/logo-shopify.png";
import axios from "axios";
import { useUserStore } from "../store/Store";

export const ProfilePage = () => {
  const { user } = useUserStore();
  const userClerk = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Navigation />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Mon Profil</span>
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et vos paramètres
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Informations du Profil</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID:
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

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Abonnement</h2>
          <p className="text-gray-600">Plan actuel: Premium</p>
        </section>

        {/* Section Pro */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Mes Shops</h2>
          <ul className="text-gray-600">
            <li>Shop 1</li>
            <li>Shop 2</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Invitations Envoyées</h2>
          <ul className="text-gray-600">
            <li>Invitation 1</li>
            <li>Invitation 2</li>
          </ul>
        </section>

        {/* Section Ambassador */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="relative h-48 sm:h-56">
            <h3 className="flex items-center justify-center text-center text-gradient text-2xl font-bold">
              Mes réseaux sociaux
            </h3>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center text-sm space-y-3">
                  <div className="flex flex-row items-center">
                    <Instagram className="w-4 h-4 mr-1" />
                    <button onClick={handleMeta}>
                      Se connecter a Instagram
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <Twitch className="w-4 h-4 mr-1" />
                    <button onClick={handleTikTokLogin}>
                      Se connecter a Tiktok
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <img src={shopifyLogo} className="w-4 h-4 mr-1" />
                    <button onClick={handleShopifyLogin}>
                      Se connecter a Shopify
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <img src={shopifyLogo} className="w-4 h-4 mr-1" />
                    <button onClick={fetchShopifyData}>
                      Recup data Shopify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
