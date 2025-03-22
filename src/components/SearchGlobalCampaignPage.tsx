import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Instagram,
  Youtube,
  Twitter,
  Star,
  TrendingUp,
  FileSearch2,
} from "lucide-react";
import axios from "axios";
import type { Ambassador, Influencer } from "../types";
import {
  useBusinessStores,
  useUserStore,
  useCampaignStore,
} from "../store/Store";
import { useNavigate } from "react-router-dom";
import { Card, Modal, Spinner } from "react-bootstrap";
import CampaignItem from "./CampaignItem";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export function SearchGlobalCampaign() {
  const { user } = useUserStore();
  const { businessStores } = useBusinessStores();
  const { campaigns } = useCampaignStore();

  const [searchTerm, setSearchTerm] = useState("");

  const [globalCampaigns, setGlobalCampaigns] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string | "all">("all");

  useEffect(() => {
    const fetchGlobalCampaigns = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_SERVER + "/global-campaigns"
        );
        const globalCampaigns = response.data;
        console.log(globalCampaigns);
        setGlobalCampaigns(globalCampaigns);
      } catch (error) {
        console.error("Failed to fetch influencers:", error);
      }
    };

    fetchGlobalCampaigns();
  }, []);

  useEffect(() => {
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

  function handleClickSeeDetails(campaign) {
    console.log("clicked on see details : ", campaign);
    // navigate("/campaign-details");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Trouvez les <span className="text-indigo-500">campages</span> qui vous
          ressemble
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
          Connectez-vous avec des professionels et commencez a diversifier vos
          revenus
        </p>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une campagne..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 bg-white/50 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="flex gap-4 sm:flex-nowrap">
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
          </div> */}
        </div>
      </div>
      {/* 
      <Modal show={success} onHide={() => setSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Succès</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Votre demande a été envoyée avec succès !</p>
        </Modal.Body>
      </Modal> */}

      {/* No campaign */}
      {globalCampaigns.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full space-y-4">
          <FileSearch2 color="blue" className="w-1/2" height={70} />
          <p className="text-gray-600 text-xl">Aucune campagne disponible</p>
        </div>
      ) : (
        <BentoGrid className="max-w-6xl mx-auto">
          {globalCampaigns.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.requirements}
              description={item.commissionPercentage}
              header={Skeleton()}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
