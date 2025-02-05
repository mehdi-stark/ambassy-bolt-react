import React, { useState } from 'react';

const SearchPage = ({ influencers, shops }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState('');
  const [commission, setCommission] = useState('');
  const [message, setMessage] = useState('');

  const handleConnectClick = (influencer) => {
    setSelectedInfluencer(influencer);
    setFormVisible(true);
  };

  const handleValidateClick = () => {
    // Add the ambassador to the list (implementation depends on your state management)
    // Disable the "Connecter" button (implementation depends on your state management)
    setFormVisible(false);
  };

  return (
    <div>
      {formVisible && (
        <div className="form-modal">
          <div className="form-content">
            <h2>Connecter avec {selectedInfluencer.name}</h2>
            <div>
              <label>Shop:</label>
              <select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)}>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Commission Percentage:</label>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button onClick={handleValidateClick}>Valider</button>
          </div>
        </div>
      )}
      <div className="influencers-list">
        {influencers.map((influencer) => (
          <div key={influencer.id} className="influencer-card">
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
                className="w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
                onClick={() => handleConnectClick(influencer)}
              >
                Connecter
              </button>
              <button className="w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors">
                Ajout Favoris
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;