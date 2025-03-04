import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Instagram,
  Youtube,
  Twitter,
  Star,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import type { Ambassador, Influencer } from "../types";
import { useBusinessStores, useUserStore } from "../store/Store";
import PourcentageCommission from "./ambassador_campaign/PourcentageCommission";
import { Card } from "react-bootstrap";

export function SearchPage() {
  const { user } = useUserStore();
  const { businessStores } = useBusinessStores();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "followers" | "engagement">(
    "rating"
  );
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);
  const [selectedAmbassador, setSelectedAmbassador] =
    useState<Ambassador | null>(null);
  const [selectedShop, setSelectedShop] = useState("");
  const [commission, setCommission] = useState("");
  const [message, setMessage] = useState("");
  const [connectedInfluencers, setConnectedInfluencers] = useState<string[]>(
    []
  );
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCommission, setSelectedCommission] = useState<string>("");

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_SERVER + "/users?role=ambassador"
        );
        const filteredAmbassadors = response.data.filter(
          (user: Ambassador) =>
            user.socialMediaLinks && user.socialMediaLinks.length > 0
        );
        console.log("response :", response);
        console.log("filteredAmbassadors :", filteredAmbassadors);
        setAmbassadors(filteredAmbassadors);
        console.log("print ambassadors :", ambassadors);
      } catch (error) {
        console.error("Failed to fetch influencers:", error);
      }
    };

    fetchInfluencers();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedInfluencer(null);
        setSelectedAmbassador(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("popup-overlay")) {
      setSelectedInfluencer(null);
      setSelectedAmbassador(null);
    }
  };

  const handleCommissionSelect = (commission: string) => {
    setSelectedCommission(commission);
    // setFormDetails((prev) => ({
    //   ...prev,
    //   commission,
    // }));
  };

  const sortedAmbassadors = [...ambassadors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "followers":
        return (
          b.socialMediaLinks[0].metrics.followers -
          a.socialMediaLinks[0].metrics.followers
        );
      case "engagement":
        return (
          b.socialMediaLinks[0].metrics.engagement -
          a.socialMediaLinks[0].metrics.engagement
        );
      default:
        return 0;
    }
  });

  const handleConnectClick = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
  };

  const handleConnectClickAmbassador = (influencer: Ambassador) => {
    console.log("print businessStore : ", businessStores);
    console.log("print user : ", user);
    setSelectedAmbassador(influencer);
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setError("");
    await axios
      .post(import.meta.env.VITE_API_SERVER + "/collaboration-requests", {
        proId: sessionStorage.getItem("userId"),
        commission,
        message,
        ambassadorId: selectedAmbassador?._id,
      })
      .then((response) => {
        console.log("Request sent:", response.data);
        setShowPopup(false);
        setSelectedShop("");
        setCommission("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Failed to send request:", error);
        setError("Failed to send request. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleValidateClick = () => {
    if (selectedInfluencer) {
      setConnectedInfluencers([...connectedInfluencers, selectedInfluencer.id]);
      setSelectedInfluencer(null);
      setSelectedShop("");
      setCommission("");
      setMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Trouvez les meilleurs{" "}
          <span className="text-gradient">ambassadeurs</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
          Connectez-vous avec des créateurs de contenu qui partagent vos valeurs
          et peuvent faire rayonner votre marque
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
              onChange={(e) =>
                setSortBy(
                  e.target.value as "rating" | "followers" | "engagement"
                )
              }
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

      {/*  formulaire d'invation des ambassadeur   */}
      {selectedAmbassador && (
        <div
          className="fixed inset-0 bg-slate-100 flex items-center justify-center z-[99] popup-overlay w-full h-screen"
          onClick={handleOutsideClick}
        >
          <div className="flex justify-center items-center w-1/2 shadow-lg h-screen">
            <div className="p-8 rounded-lg w-full h-screen flex justify-center items-center flex-col">
              <h2 className="text-4xl font-bold mb-8">
                Demande de connexion avec {selectedAmbassador.name}
              </h2>
              <div className="mb-4 w-full">
                <h2 className="text-xl font-semibold mb-1">
                  Choissisez votre boutique cible
                </h2>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                  value={selectedShop}
                  onChange={(e) => setSelectedShop(e.target.value)}
                >
                  <option value="">Sélectionner un shop</option>
                  {businessStores.map((shop) => (
                    <option key={shop?._id} value={shop?.storeName}>
                      {shop?.storeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <section className="mb-4 w-full flex flex-col">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">
                    Pourcentage de commission{" "}
                    <span className="text-red-500">*</span>
                  </h2>
                  <div className="flex space-x-4 overflow-x-auto">
                    {["10%", "15%", "20%", "Custom"].map((commission) => (
                      <Card
                        key={commission}
                        className={`cursor-pointer w-32 md:w-48 ${
                          selectedCommission === commission
                            ? "border-2 border-blue-500"
                            : "border border-gray-200"
                        }`}
                        onClick={() => handleCommissionSelect(commission)}
                      >
                        <Card.Body>
                          <Card.Text className="text-sm md:text-md font-bold">
                            {commission}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* <h2 className="text-xl font-semibold mb-1">
                  Pourcentage de commission
                </h2>
                <PourcentageCommission
                  selectedCommission={selectedCommission}
                  onClick={handleCommissionSelect}
                /> */}
                {/* <label className="block text-sm font-medium text-gray-700">
                  Pourcentage de commission
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                /> */}
              </div>
              <div className="mb-4 w-full">
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  Votre message pour l'ambassadeur{" "}
                  <span className="text-red-500">*</span>
                </h2>
                <textarea
                  className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                  value={message}
                  maxLength={1500}
                  placeholder=""
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                className="w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
                onClick={() => handleSendRequest(selectedAmbassador)}
                disabled={loading}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </button>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* {sortedInfluencers.map((influencer) => ( */}
        {sortedAmbassadors.map((influencer) => (
          <div
            key={influencer._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 sm:h-56">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                  {influencer.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  {influencer.socialMediaLinks.map((platform) => (
                    <div
                      key={platform._id}
                      className="flex items-center text-sm"
                    >
                      {platform.platform.valueOf() === "instagram" && (
                        <Instagram className="w-4 h-4 mr-1" />
                      )}
                      {platform.platform.valueOf() === "youtube" && (
                        <Youtube className="w-4 h-4 mr-1" />
                      )}
                      {platform.platform.valueOf() === "tiktok" && (
                        <Twitter className="w-4 h-4 mr-1" />
                      )}
                      {platform.metrics.followers.toLocaleString()}
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
                  <span className="text-emerald-500 font-medium">
                    {influencer.socialMediaLinks[0].metrics.engagement.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {influencer.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-bold">{influencer.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({influencer.reviewCount} avis)
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {influencer.completedCampaigns} campagnes
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  className={`w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors ${
                    connectedInfluencers.includes(influencer.id)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => {
                    handleConnectClickAmbassador(influencer);
                    setShowPopup(true);
                  }}
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

      {/* {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Envoyer une demande</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Shop
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                {shops.map((shop) => (
                  <option key={shop} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pourcentage de commission
              </label>
              <input
                type="number"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={() => setShowPopup(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                onClick={() =>
                  selectedAmbassador && handleSendRequest(selectedAmbassador)
                }
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
