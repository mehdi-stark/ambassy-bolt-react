import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

export const ProfilePage = () => {
  useEffect(() => {
    // Initialise le SDK TikTok
  
  }, []);


  const handleTikTokLogin = () => {
    // Ouvre la fenêtre de connexion TikTok
    // import.meta.env.API_SERVER + '/api/authenticate/tiktok'
    const url = import.meta.env.VITE_API_SERVER + '/api/social/authenticate/tiktok';
    console.log('print URL :', url);
    axios.post(url)
    .then((response) => {
      const { url } = response.data;
      window.open(url, '_blank');
    })
    .catch((error) => {
      console.error('Failed to initiate TikTok integration', error);
    });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Informations du Profil</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID:</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" disabled value="User123" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe:</label>
            <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Abonnement</h2>
          <p className="text-gray-600">Plan actuel: Premium</p>
        </section>

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

        <div>
        <button onClick={handleTikTokLogin}>Se connecter avec TikTok</button>

{/* <a href={import.meta.env.API_SERVER + '/api/authenticate/tiktok'}>Se connecter avec TikTok</a> */}
    </div>
      </div>
    </div>
  );
};
