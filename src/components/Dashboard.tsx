import React from 'react';
import { BarChart, Users, TrendingUp, DollarSign, Store } from 'lucide-react';
import type { Campaign } from '../types';

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    clientId: '1',
    influencerId: '2',
    status: 'active',
    amount: 1500,
    startDate: new Date(),
    description: 'Campagne Mode Été 2024'
  }
];

const mockStores = [
  {
    id: '1',
    name: 'Ma Boutique Mode',
    domain: 'ma-boutique-mode.myshopify.com',
    status: 'active',
    products: 156,
    monthlyOrders: 234
  },
  {
    id: '2',
    name: 'Accessoires Luxe',
    domain: 'accessoires-luxe.myshopify.com',
    status: 'active',
    products: 89,
    monthlyOrders: 167
  }
];

export function Dashboard() {
  const handleAddStoreClick = async () => {
    try {
      const response = await fetch('/api/shopify/integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Failed to initiate Shopify integration');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          <span className="text-gradient">Tableau de Bord</span>
        </h2>
        <button className="px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors">
          Nouvelle Campagne
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-50 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total des revenus</span>
          </div>
          <div className="text-2xl font-bold mb-1">15,000€</div>
          <div className="text-sm text-emerald-500 font-medium">+12% ce mois</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-xl">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Campagnes actives</span>
          </div>
          <div className="text-2xl font-bold mb-1">8</div>
          <div className="text-sm text-emerald-500 font-medium">+3 nouvelles</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Taux d'engagement</span>
          </div>
          <div className="text-2xl font-bold mb-1">4.2%</div>
          <div className="text-sm text-emerald-500 font-medium">+0.8% ce mois</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-xl">
              <BarChart className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Performance</span>
          </div>
          <div className="text-2xl font-bold mb-1">92%</div>
          <div className="text-sm text-emerald-500 font-medium">+5% ce mois</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campagnes */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold">Campagnes en cours</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Campagne</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Montant</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-100">
                    <td className="py-4 px-6">{campaign.description}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full">
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">{campaign.amount}€</td>
                    <td className="py-4 px-6">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Boutiques */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold">Mes Boutiques</h3>
            <button 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={handleAddStoreClick}
            >
              Ajouter
            </button>
          </div>
          <div className="p-6 space-y-4">
            {mockStores.map((store) => (
              <div key={store.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <Store className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">{store.name}</h4>
                  <p className="text-sm text-gray-500">{store.domain}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{store.products} produits</div>
                  <div className="text-sm text-gray-500">{store.monthlyOrders} commandes/mois</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}