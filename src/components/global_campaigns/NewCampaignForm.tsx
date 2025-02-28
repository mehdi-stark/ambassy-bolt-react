import React, { useEffect, useState } from "react";
import { Button, ProgressBar, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TikTok from "../../assets/TikTok.svg";
import Youtube from "../../assets/Youtube.svg";
import Facebook from "../../assets/Facebook.svg";
import Twitter from "../../assets/Twitter.svg";
import Snap from "../../assets/logo-snapchat.png";
import Instagram from "../../assets/logo-instagram.jpg";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import PlatformItem from "./PlatformItem";
import countries from "../../assets/countries.json";
import languages from "../../assets/langues.json";

const platforms = [
  { name: "Instagram", logo: Instagram },
  { name: "TikTok", logo: TikTok },
  { name: "YouTube", logo: Youtube },
  { name: "Facebook", logo: Facebook },
  { name: "Twitter", logo: Twitter },
  { name: "Snapchat", logo: Snap },
];

const NewCampaign = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [businessStores, setBusinessStores] = useState<any[]>([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState(0);
  const [summary, setSummary] = useState("");
  const [expectations, setExpectations] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("userComplete");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setBusinessStores(parsedUser.businessStores || []);
    }
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  const handleSubmit = () => {
    const newCampaign = {
      proId: userData._id,
      ambassadorId: userData._id, // Assuming the same user is the ambassador
      businessId: selectedShop,
      amount: 0, // You need to set this value
      affiliateLink: {
        title: summary,
      },
      campaignScript: expectations,
      commissionPercentage,
      status: "active",
      category: "", // You need to set this value
      requirements: "", // You need to set this value
      platform: selectedPlatforms.length > 0 ? selectedPlatforms[0] : "",
      targetCountries: selectedCountries,
      targetAudience: "", // You need to set this value
      targetLanguages: selectedLanguages,
      createdBy: userData._id,
    };

    // Send newCampaign to your API
    console.log("New Campaign Data:", newCampaign);
  };

  return (
    <div className="new-campaign p-4 bg-white rounded-xl border border-gray-100 shadow-sm w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">
          Créez votre campagne et trouvez immédiatement votre audience grâce à
          notre réseau d'ambassadeurs
        </p>
        <button
          onClick={onClose}
          className="close-button h-6 items-center justify-center flex hover:text-red-500"
        >
          X
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <ProgressBar now={(step / 3) * 100} />
      </div>

      {/* Form Content */}
      {step === 1 && (
        <div className="step-1 flex flex-col space-y-4 items-center justify-center p-4">
          <h2 className="text-xl font-semibold mb-4">
            Choisir la/les plateformes cible
          </h2>
          <Form className="w-full">
            <Form.Group controlId="platforms">
              <div className="flex flex-col w-full space-y-5 min-w-[250px]">
                {platforms.map((platform) => (
                  <PlatformItem
                    key={platform.name}
                    logo={platform.logo}
                    name={platform.name}
                    checked={selectedPlatforms.includes(platform.name)}
                    onChange={(checked) =>
                      handlePlatformChange(platform.name, checked)
                    }
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
          <Button onClick={nextStep} className="bg-gradient-primary">
            Suivant
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="step-2 flex flex-col space-y-4 items-center justify-center p-4">
          <h2 className="text-xl font-semibold mb-4">
            Décrire votre audience cible
          </h2>
          <Form className="w-full">
            <Form.Group controlId="country">
              <Form.Label>Choisissez le(s) pays cible(s)</Form.Label>
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={selectedCountries}
                  onChange={(e) => setSelectedCountries(e.value)}
                  filter
                  options={countries}
                  optionLabel="name"
                  display="chip"
                  placeholder="Sélectionnez"
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem bg-grey-100"
                />
              </div>
            </Form.Group>
          </Form>
          <Form className="w-full">
            <Form.Group controlId="language">
              <Form.Label>Choisissez la langue cible</Form.Label>
              <div className="card flex justify-content-center">
                <MultiSelect
                  value={selectedLanguages}
                  onChange={(e) => setSelectedLanguages(e.value)}
                  filter
                  options={languages}
                  optionLabel="name"
                  display="chip"
                  placeholder="Sélectionnez"
                  maxSelectedLabels={3}
                  className="w-full md:w-20rem bg-grey-100"
                />
              </div>
            </Form.Group>
          </Form>
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="bg-grey-100 border border-2 py-2 px-2 rounded-xl"
            >
              Retour
            </button>
            <Button onClick={nextStep} className="bg-gradient-primary">
              Suivant
            </Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="step-3 flex flex-col space-y-4 items-center justify-center p-4">
          <h2 className="text-xl font-semibold mb-4">Choisir votre shop</h2>
          <Form className="w-full">
            <Form.Group controlId="shop">
              <Form.Label>Shop</Form.Label>
              <Dropdown
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.value)}
                options={businessStores}
                optionLabel="storeName"
                placeholder="Sélectionner un shop"
                className="w-full md:w-14rem"
              />
            </Form.Group>
            <Form.Group controlId="commission">
              <Form.Label>Pourcentage de commission</Form.Label>
              <Form.Control
                type="number"
                value={commissionPercentage}
                onChange={(e) =>
                  setCommissionPercentage(Number(e.target.value))
                }
              />
            </Form.Group>
            <Form.Group controlId="summary">
              <Form.Label>Résumé de l'offre/produit</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="expectations">
              <Form.Label>Ce qu'on attend de l'ambassadeur</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="bg-grey-100 border border-2 py-2 px-2 rounded-xl"
            >
              Retour
            </button>
            <Button onClick={handleSubmit} className="bg-gradient-primary">
              Valider
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCampaign;
