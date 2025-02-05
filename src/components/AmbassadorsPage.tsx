import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react';
import type { Influencer } from '../types';

type AmbassadorStatus = 'accepted' | 'pending' | 'rejected';

interface Ambassador extends Influencer {
  status: AmbassadorStatus;
  lastContact?: Date;
  notes?: string;
}

const mockAmbassadors: Ambassador[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    role: 'influencer',
    followers: 150000,
    platforms: [
      { name: 'Instagram', followers: 100000, handle: '@sophiem' },
      { name: 'TikTok', followers: 50000, handle: '@sophiem' }
    ],
    categories: ['Mode', 'Lifestyle'],
    description: 'Créatrice de contenu mode et lifestyle',
    engagementRate: 3.5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.8,
    reviewCount: 124,
    completedCampaigns: 45,
    status: 'accepted',
    lastContact: new Date('2024-03-10'),
    notes: 'Excellente collaboration sur la campagne été'
  },
  {
    id: '2',
    name: 'Lucas Dubois',
    email: 'lucas@example.com',
    role: 'influencer',
    followers: 280000,
    platforms: [
      { name: 'YouTube', followers: 200000, handle: '@lucasdubois' },
      { name: 'Instagram', followers: 80000, handle: '@lucasd' }
    ],
    categories: ['Tech', 'Gaming'],
    description: 'Passionné de tech et gaming, je partage mes découvertes et tests',
    engagementRate: 4.2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 4.9,
    reviewCount: 208,
    completedCampaigns: 67,
    status: 'pending',
    lastContact: new Date('2024-03-15')
  },
  {
    id: '3',
    name: 'Emma Laurent',
    email: 'emma@example.com',
    role: 'influencer',
    followers: 420000,
    platforms: [
      { name: 'Instagram', followers: 320000, handle: '@emmalaurent' },
      { name: 'TikTok', followers: 100000, handle: '@emmalaurent' }
    ],
    categories: ['Beauté', 'Bien-être'],
    description: 'Expert en beauté naturelle et bien-être holistique',
    engagementRate: 5.1,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4.7,
    reviewCount: 156,
    completedCampaigns: 89,
    status: 'rejected',
    lastContact: new Date('2024-03-05'),
    notes: 'Budget non compatible'
  }
];

export function AmbassadorsPage() {
  const [activeTab, setActiveTab] = useState<AmbassadorStatus | 'all'>('all');
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);
  const [shops, setShops] = useState<string[]>(['Shop 1', 'Shop 2', 'Shop 3']);
  const [selectedShop, setSelectedShop] = useState('');
  const [affiliationLink, setAffiliationLink] = useState('');
  const [campaignScript, setCampaignScript] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedAmbassador(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('popup-overlay')) {
      setSelectedAmbassador(null);
    }
  };

  const filteredAmbassadors = mockAmbassadors.filter(
    ambassador => activeTab === 'all' || ambassador.status === activeTab
  );

  const getStatusColor = (status: AmbassadorStatus) => {
    switch (status) {
      case 'accepted': return 'text-emerald-600 bg-emerald-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'rejected': return 'text-rose-600 bg-rose-50';
    }
  };

  const getStatusIcon = (status: AmbassadorStatus) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
    }
  };

  const handleRequestCampaignClick = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador);
  };

  const handleValidateCampaignClick = () => {
    if (selectedAmbassador) {
      // Send request to API
      // Example: 
      // fetch('/api/request-campaign', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     ambassadorId: selectedAmbassador.id,
      //     shop: selectedShop,
      //     affiliationLink,
      //     campaignScript
      //   })
      // });

      setSelectedAmbassador(null);
      setSelectedShop('');
      setAffiliationLink('');
      setCampaignScript('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Mes Ambassadeurs</span>
          </h1>
          <p className="text-gray-600">
            Gérez vos collaborations avec les créateurs de contenu
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === 'accepted'
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Acceptés
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === 'pending'
              ? 'bg-amber-50 text-amber-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === 'rejected'
              ? 'bg-rose-50 text-rose-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Refusés
        </button>
      </div>

      {/* Ambassadors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmbassadors.map((ambassador) => (
          <div key={ambassador.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-40">
              <img
                src={ambassador.avatar}
                alt={ambassador.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-lg font-bold mb-1">{ambassador.name}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {ambassador.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ambassador.status)}`}>
                  {getStatusIcon(ambassador.status)}
                  <span className="ml-2 capitalize">{ambassador.status}</span>
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {ambassador.notes && (
                <p className="text-sm text-gray-600 mb-4">{ambassador.notes}</p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {ambassador.platforms.length} plateformes
                </span>
                <span>
                  Dernier contact: {ambassador.lastContact?.toLocaleDateString()}
                </span>
              </div>

              {ambassador.status === 'accepted' && (
                <button
                  className="mt-4 w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
                  onClick={() => handleRequestCampaignClick(ambassador)}
                >
                  Demande de nouvelle campagne
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedAmbassador && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99] popup-overlay"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Demande de nouvelle campagne avec {selectedAmbassador.name}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Shop</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <option value="">Sélectionner un shop</option>
                {shops.map((shop) => (
                  <option key={shop} value={shop}>{shop}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Lien d'affiliation</label>
              <input
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={affiliationLink}
                onChange={(e) => setAffiliationLink(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Script de campagne</label>
              <textarea
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={campaignScript}
                onChange={(e) => setCampaignScript(e.target.value)}
              />
            </div>
            <button
              className="w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
              onClick={handleValidateCampaignClick}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}