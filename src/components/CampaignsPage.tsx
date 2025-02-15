import { FileSearch2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Testimonial from "./Testimonial";
import NewCampaignForm from "./NewCampaignForm";

const CampaignsPage = () => {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [archivedCampaigns, setArchivedCampaigns] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<string | "all">("all");

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
        <section
          className="p-5 campaign-info flex flex-row justify-center space-x-4 bg-white w-full h-[150px] 
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

        <section className="filters flex md:mt-[80px] mt-8 flex-col p-5 justify-center">
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

        {campaigns.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <FileSearch2 color="blue" className="w-1/2" height={70} />
            <p className="text-gray-600 text-xl">Aucune campagne disponible</p>
          </div>
        )}

        <section className="campaign-list flex mt-8 w-full mx-auto items-center justify-center">
          <ul id="campaigns">
            {campaigns.map((campaign, index) => (
              <li key={index}>
                {campaign.name} - {campaign.status}
              </li>
            ))}
          </ul>
        </section>

        {showPopup && (
          <div
            className="fixed inset-0 bg-white bg-opacity-80 bg-blur flex items-center justify-center z-[99] popup-overlay bg-gray-600"
            onClick={handleOutsideClick}
          >
            <div className="w-full h-full md:w-1/2 p-4">
              <NewCampaignForm />
            </div>
            <div className="w-full h-full md:w-1/2 p-4">
              <Testimonial />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
