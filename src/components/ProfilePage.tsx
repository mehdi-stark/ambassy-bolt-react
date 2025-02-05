import React from 'react';
import { Navigation } from './Navigation';

export const ProfilePage = () => {
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
      </div>
    </div>
  );
};
