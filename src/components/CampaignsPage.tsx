import { FileSearch2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import NewCampaign from "./global_campaigns/GobalCampaignForm";
import axios from "axios";
import CampaignItem from "./CampaignItem";
import { useCampaignStore, useUserStore } from "../store/Store";
// import { campaigns } from "@/store/useStore";
const CampaignsPage = () => {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [archivedCampaigns, setArchivedCampaigns] = useState(0);
  // const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<string | "all">("all");
  // const user = sessionStorage.getItem("user")
  //   ? JSON.parse(sessionStorage.getItem("user") as string)
  //   : null;
  const { user } = useUserStore();
  const { campaigns, setCampaigns, addCampaign } = useCampaignStore();

  console.log("campaigns", campaigns);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_SERVER +
          `/campaigns/ambassador/${user?.userId}`
      ); // Remplace par ton endpoint
      const data = response.data;

      // Stocke dans le sessionStorage
      sessionStorage.setItem("campaigns", JSON.stringify(data));
      updateCampaignsState(data);
      setCampaigns(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des campagnes :", error);
    }
  };

  const updateCampaignsState = (data: any[]) => {
    // setCampaigns(data);
    setTotalCampaigns(data.length);
    setActiveCampaigns(data.filter((c) => c.status === "active").length);
    setArchivedCampaigns(data.filter((c) => c.status === "archived").length);
  };

  useEffect(() => {
    // Vérifie si les campagnes sont dans le sessionStorage
    sessionStorage.removeItem("campaigns");
    const storedCampaigns = sessionStorage.getItem("campaigns");
    if (storedCampaigns) {
      console.log("Stored campaigns:", storedCampaigns);
      updateCampaignsState(JSON.parse(storedCampaigns));
    } else {
      console.log("No stored campaigns, fetching from API");
      fetchCampaigns(); // Sinon, envoie une requête API
    }
  }, []);

  const handleCreateCampaign = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newCampaign = {
      name: form["campaign-name"].value,
      status: form["campaign-status"].value,
    };
    setCampaigns([...campaigns, newCampaign]);
    setTotalCampaigns(totalCampaigns + 1);
    if (newCampaign.status === "active") {
      setActiveCampaigns(activeCampaigns + 1);
    }
    setShowPopup(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("popup-overlay")) {
      setShowPopup(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mx-auto flex flex-col">
        {/* Title nb of campaigns */}
        <section
          className="p-5 campaign-info flex flex-row justify-center space-x-4 bg-white w-full h-[130px] 
        shadow-sm items-center rounded-xl border border-gray-100"
        >
          <p className="text-center text-gray-600 font-light text-sm text-custom-grey">
            Total de campagnes: <br />
            <span id="total-campaigns" className="font-bold text-lg">
              {totalCampaigns}
            </span>
          </p>
          <p className="text-center text-gray-600 font-light text-sm text-custom-grey">
            Campagnes actives: <br />
            <span id="active-campaigns" className="font-bold text-lg">
              {activeCampaigns}
            </span>
          </p>
          <p className="text-center text-gray-600 font-light text-sm text-custom-grey">
            Campagnes archivées: <br />
            <span id="archived-campaigns" className="font-bold text-lg">
              {archivedCampaigns}
            </span>
          </p>
        </section>

        {/* Filters */}
        <section className="filters flex md:mt-[40px] mt-8 flex-col p-5 justify-center">
          <div className="flex flex-col mb-6 items-center">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">Mes Campagnes</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-wrap items-center justify-center space-x-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === "all"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setActiveTab("accepted")}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === "accepted"
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Actives
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === "pending"
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Archivées
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === "rejected"
                      ? "bg-rose-50 text-rose-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Refusées
                </button>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="px-4 py-2 rounded-lg font-medium whitespace-nowrap bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Créer campagne
              </button>
            </div>
          </div>
        </section>

        {/* No campaign */}
        {campaigns.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <FileSearch2 color="blue" className="w-1/2" height={70} />
            <p className="text-gray-600 text-xl">Aucune campagne disponible</p>
          </div>
        ) : (
          <section className="campaign-list flex w-full bg-white p-8 rounded-xl border border-gray-100">
            <CampaignItem campaigns={campaigns} status={activeTab} />
            {/* <ul id="campaigns">
            {campaigns.map((campaign, index) => (
              <li key={index}>
                {campaign.commissionPercentage} - {campaign.status}
              </li>
            ))}
          </ul> */}
          </section>
        )}

        {/* Form new campaign */}
        {showPopup && (
          <div
            className="fixed w-screen md:inset-0 bg-slate-100 bg-blur flex items-center justify-center z-[99] popup-overlay h-screen"
            onClick={handleOutsideClick}
          >
            <NewCampaign onClose={() => setShowPopup(false)} />

            {/* <div className="w-full h-full md:w-1/2 p-4">
              <NewCampaignForm />
            </div>
            <div className="w-full h-full md:w-1/2 p-4">
              <Testimonial />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
