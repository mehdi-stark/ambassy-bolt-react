import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Link as LinkIcon } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export function MerchantRegistrationPage() {
  const navigate = useNavigate();
  const [shopifyDomain, setShopifyDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Shopify integration
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Connectez votre boutique"
      subtitle="Intégrez votre boutique Shopify pour commencer"
    >
      <div className="space-y-6">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-start">
            <Store className="h-5 w-5 text-indigo-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">
                Pourquoi connecter votre boutique?
              </h3>
              <div className="mt-2 text-sm text-indigo-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Synchronisation automatique des produits</li>
                  <li>Suivi des performances des campagnes</li>
                  <li>Attribution précise des ventes</li>
                  <li>Gestion simplifiée des collaborations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="shopify-domain" className="block text-sm font-medium text-gray-700">
              Domaine de votre boutique Shopify
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="shopify-domain"
                name="shopify-domain"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="votre-boutique.myshopify.com"
                value={shopifyDomain}
                onChange={(e) => setShopifyDomain(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-primary hover-gradient-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connecter ma boutique
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}