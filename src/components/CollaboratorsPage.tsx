import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
} from "lucide-react";
import type { Ambassador } from "../types";
import axios from "axios";
import AmbassadorCampaign from "./ambassador_campaign/AmbassadorCampaign";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/Store";
import { isNull } from "util";
import CollaborationApi from "../api/collaborationsRequest";
export function CollaboratorsPage() {
  const { user, collaborationRequests, setCollaborationRequests } =
    useUserStore();
  const [activeTab, setActiveTab] = useState<string | "all">("all");
  const [selectedAmbassador, setSelectedAmbassador] =
    useState<Ambassador | null>(null);
  const [selectedProId, setSelectedProId] = useState<any>();
  const [shops, setShops] = useState<string[]>(["Shop 1", "Shop 2", "Shop 3"]);
  const [selectedShop, setSelectedShop] = useState("");
  const [affiliationLink, setAffiliationLink] = useState("");
  const [campaignScript, setCampaignScript] = useState("");
  const [invitationData, setInvitationData] = useState<any>(null);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [filteredAmbassadors, setFilteredAmbassadors] = useState<any>([]);
  const [filteredPro, setFilteredPro] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAmbassador(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function onReturn() {
    setSelectedAmbassador(null);
    setSelectedProId(null);
  }

  useEffect(() => {
    fetchUserData().then((storedData) => {
      if (storedData) {
        const parsedData = storedData.data;
        console.log("storedData", parsedData);
        setInvitationData(parsedData);
        setSelectedAmbassador(parsedData.ambassadorId);
        setSelectedProId(parsedData.proId);
        setSelectedShop(parsedData.shop || "");

        if (parsedData?.length > 0) {
          setFilteredAmbassadors(
            parsedData.filter(
              (item) => activeTab === "all" || item.status === activeTab
            )
          );
          setFilteredPro(
            parsedData.filter(
              (item) => activeTab === "all" || item.status === activeTab
            )
          );
        }
      }
    });
  }, [activeTab]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("popup-overlay")) {
      setSelectedAmbassador(null);
      setSelectedProId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-emerald-600 bg-emerald-50";
      case "pending":
        return "text-amber-600 bg-amber-50";
      case "rejected":
        return "text-rose-600 bg-rose-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const handleAcceptInvitationClick = (ambassador) => {
    setSelectedAmbassador(ambassador);
    CollaborationApi.updateCollaborationStatus(ambassador._id, "accepted").then(
      (response) => {
        console.log("update collaboration status", response);
        window.location.reload();
      }
    );
  };

  const handleRejectInvitationClick = (ambassador) => {
    setSelectedAmbassador(ambassador);
    CollaborationApi.updateCollaborationStatus(ambassador._id, "rejected").then(
      (response) => {
        console.log("update collaboration status", response);
        window.location.reload();
      }
    );
  };
  const handleValidateCampaignClick = () => {
    if (selectedAmbassador) {
      fetch("/request-campaign", {
        method: "POST",
        body: JSON.stringify({
          ambassadorId: selectedAmbassador.id,
          shop: selectedShop,
          affiliationLink,
          campaignScript,
        }),
      });

      setSelectedAmbassador(null);
      setSelectedShop("");
      setAffiliationLink("");
      setCampaignScript("");
    }
  };

  async function fetchUserData() {
    return axios.get(
      import.meta.env.VITE_API_SERVER +
        "/collaboration-requests/" +
        user.userId +
        "?type=ambassador",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  console.log("filteredPro", filteredPro);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Mes Collaborateurs</span>
          </h1>
          <p className="text-gray-600">
            Gérez vos collaborations avec les créateurs de contenu
          </p>
        </div>
      </div>

      {/* filters */}
      <div className="flex md:space-x-2 mb-6 overflow-x-auto pb-2 text-sm md:text-base">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "all"
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "accepted"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Acceptés
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "pending"
              ? "bg-amber-50 text-amber-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "rejected"
              ? "bg-rose-50 text-rose-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Refusés
        </button>
      </div>

      {filteredPro.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <Users className="w-12 h-12 text-gray-400" />
          <p className="text-gray-600 text-center text-xl">
            Aucun collaborateur...
          </p>{" "}
          <br />
          <p className="text-gray-600 text-center text-md">
            Commencez à développer votre réseau en cherchant des campagnes
          </p>
          <button
            className="px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
            onClick={() => navigate("/search")}
          >
            Trouver des campagnes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPro &&
            filteredPro.map((ambassador) => (
              <div
                key={ambassador._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <img
                    src={ambassador.proId.avatar || ""}
                    alt={ambassador.proId.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold mb-1">
                      {ambassador.proId.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {ambassador.proId.categories &&
                        ambassador.proId.categories.map((category) => (
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
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        ambassador.status
                      )}`}
                    >
                      {getStatusIcon(ambassador.status)}
                      <span className="ml-2 capitalize">
                        {ambassador.status}
                      </span>
                    </div>
                    {ambassador.status === "accepted" && (
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {ambassador.proId.notes && (
                    <p className="text-sm text-gray-600 mb-4">
                      {ambassador.proId.notes}
                    </p>
                  )}

                  <div className="flex flex-col items-center justify-between text-md text-gray-500">
                    <span>
                      {ambassador.proId.platforms?.length} plateformes
                    </span>
                    <span>
                      Date invitation:{" "}
                      {new Date(
                        ambassador.proId?.createdAt || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-center mt-1">
                    <p className="text-gray-600">
                      Comission:{" "}
                      <span className="font-bold" id="commission">
                        {ambassador.commission}%
                      </span>
                    </p>
                  </div>

                  {ambassador.status === "pending" && (
                    <div className="flex justify-center space-x-4 mt-2">
                      <button
                        className="w-1/2 px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
                        onClick={() => {
                          handleAcceptInvitationClick(ambassador);
                        }}
                      >
                        Accepter
                      </button>

                      <button
                        className="w-1/3 px-6 py-2.5 bg-red-800 hover-gradient-primary text-white rounded-full font-medium transition-colors"
                        onClick={() => handleRejectInvitationClick(influencer)}
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                  {ambassador.status === "accepted" && (
                    <div className="flex justify-center space-x-4 mt-2">
                      <button className="w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors">
                        Voir details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
