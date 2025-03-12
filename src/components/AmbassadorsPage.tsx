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

export function AmbassadorsPage() {
  const [activeTab, setActiveTab] = useState<string | "all">("all");
  const [selectedAmbassador, setSelectedAmbassador] =
    useState<Ambassador | null>(null);
  const [shops, setShops] = useState<string[]>(["Shop 1", "Shop 2", "Shop 3"]);
  const [selectedShop, setSelectedShop] = useState("");
  const [affiliationLink, setAffiliationLink] = useState("");
  const [campaignScript, setCampaignScript] = useState("");
  const [invitationData, setInvitationData] = useState<any>(null);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [filteredAmbassadors, setFilteredAmbassadors] = useState<any>([]);
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
  }

  useEffect(() => {
    fetchUserData().then((storedData) => {
      if (storedData) {
        const parsedData = storedData.data;
        console.log("storedData", parsedData);
        setInvitationData(parsedData);
        setSelectedAmbassador(parsedData.ambassadorId);
        setSelectedShop(parsedData.shop || "");

        if (parsedData?.length > 0) {
          setFilteredAmbassadors(
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

  const handleRequestCampaignClick = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador);
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
    const userId = sessionStorage.getItem("userId");
    return axios
      .get(
        import.meta.env.VITE_API_SERVER + "/collaboration-requests/" + userId,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((data) => {
        console.log("data collaborationRequests", data);
        sessionStorage.setItem(
          "collaborationRequests",
          JSON.stringify(data?.data)
        );
        return data;
      })
      .catch((err) => {
        console.log("err collaborationRequests", err);
        throw new Error("Erreur lors de la récupération des invitations");
      });
  }

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

      {filteredAmbassadors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <Users className="w-12 h-12 text-gray-400" />
          <p className="text-gray-600 text-center text-xl">
            Aucun ambassadeur...
          </p>{" "}
          <br />
          <p className="text-gray-600 text-center text-md">
            Commencez à développer votre réseau en invitant des créateurs de
            contenu <br /> à rejoindre votre programme.
          </p>
          <button
            className="px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
            onClick={() => navigate("/search")}
          >
            Trouver des ambassadeurs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmbassadors &&
            filteredAmbassadors.map((ambassador) => (
              <div
                key={ambassador._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <img
                    src={ambassador.ambassadorId.avatar || ""}
                    alt={ambassador.ambassadorId.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-bold mb-1">
                      {ambassador.ambassadorId.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {ambassador.ambassadorId.categories &&
                        ambassador.ambassadorId.categories.map((category) => (
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
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {ambassador.ambassadorId.notes && (
                    <p className="text-sm text-gray-600 mb-4">
                      {ambassador.ambassadorId.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {ambassador.ambassadorId.platforms?.length} plateformes
                    </span>
                    <span>
                      Dernier contact:{" "}
                      {new Date(
                        ambassador.ambassadorId?.lastContact || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {ambassador.status === "accepted" && (
                    <button
                      className="mt-4 w-full px-6 py-2.5 bg-gradient-primary hover-gradient-primary text-white rounded-full font-medium transition-colors"
                      onClick={() =>
                        handleRequestCampaignClick(ambassador.ambassadorId)
                      }
                    >
                      Demande de nouvelle campagne
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedAmbassador && (
        // <div
        //   className="fixed inset-0 bg-slate-200 bg-blur flex items-center justify-center z-[99] popup-overlay
        //   p-4 rounded-xl"
        //   onClick={handleOutsideClick}
        // >
        <div
          className="fixed inset-0 bg-slate-200 bg-blur flex items-center justify-center z-[99] popup-overlay
        rounded-xl"
          onClick={handleOutsideClick}
        >
          <AmbassadorCampaign
            ambassador={selectedAmbassador}
            onReturn={onReturn}
          ></AmbassadorCampaign>
        </div>
      )}
    </div>
  );
}
