import React, { useState, useEffect } from 'react';
import { Search, Filter, Instagram, Youtube, Twitter, Star, TrendingUp } from 'lucide-react';
import type { Influencer } from '../types';

const mockInfluencers: Influencer[] = [
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
    completedCampaigns: 45
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
    completedCampaigns: 67
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
    completedCampaigns: 89
  }
];

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'followers' | 'engagement'>('rating');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [shops, setShops] = useState<string[]>(['Shop 1', 'Shop 2', 'Shop 3']);
  const [selectedShop, setSelectedShop] = useState('');
  const [commission, setCommission] = useState('');
  const [message, setMessage] = useState('');
  const [connectedInfluencers, setConnectedInfluencers] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedInfluencer(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('popup-overlay')) {
      setSelectedInfluencer(null);
    }
  };

  const sortedInfluencers = [...mockInfluencers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'followers':
        return b.followers - a.followers;
      case 'engagement':
        return b.engagementRate - a.engagementRate;
      default:
        return 0;
    }
  });

  const handleConnectClick = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
  };

  const handleValidateClick = () => {
    if (selectedInfluencer) {
      setConnectedInfluencers([...connectedInfluencers, selectedInfluencer.id]);
      setSelectedInfluencer(null);
      setSelectedShop('');
      setCommission('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Trouvez les meilleurs <span className="text-gradient">ambassadeurs</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
          Connectez-vous avec des créateurs de contenu qui partagent vos valeurs et peuvent faire rayonner votre marque
        </p>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un influenceur..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 bg-white/50 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4 sm:flex-nowrap">
            <select
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 transition-colors font-medium text-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'followers' | 'engagement')}
            >
              <option value="rating">Meilleurs notes</option>
              <option value="followers">Plus d'abonnés</option>
              <option value="engagement">Meilleur engagement</option>
            </select>
            
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 transition-colors flex items-center justify-center">
              <Filter className="w-5 h-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">Filtres</span>
            </button>
          </div>
        </div>
      </div>

      {selectedInfluencer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99] popup-overlay"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Connecter avec {selectedInfluencer.name}</h2>
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
              <label className="block text-sm font-medium text-gray-700">Pourcentage de commission</label>
              <input
                type="number"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              className="w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
              onClick={handleValidateClick}
            >
              Valider
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {sortedInfluencers.map((influencer) => (
          <div key={influencer.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 sm:h-56">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-1">{influencer.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  {influencer.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center text-sm">
                      {platform.name === 'Instagram' && <Instagram className="w-4 h-4 mr-1" />}
                      {platform.name === 'YouTube' && <Youtube className="w-4 h-4 mr-1" />}
                      {platform.name === 'Twitter' && <Twitter className="w-4 h-4 mr-1" />}
                      {platform.followers.toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-wrap gap-2">
                  {influencer.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm whitespace-nowrap">
                  <TrendingUp className="w-4 h-4 mr-1 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">{influencer.engagementRate}%</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{influencer.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-bold">{influencer.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({influencer.reviewCount} avis)</span>
                </div>
                <div className="text-sm text-gray-500">
                  {influencer.completedCampaigns} campagnes
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  className={`w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors ${connectedInfluencers.includes(influencer.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleConnectClick(influencer)}
                  disabled={connectedInfluencers.includes(influencer.id)}
                >
                  Connecter
                </button>

                <button className="w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors">
                  Ajout Favoris
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}