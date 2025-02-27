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
  const navigate = useNavigate();
  const [selectedCities, setSelectedCities] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [businessStores, setBusinessStores] = useState<any[]>([]);
  const [selectedShop, setSelectedShop] = useState("");

  // const [newCampaign, setNewCampaign] = useState({
  //   platform: "",
  //   country: "",
  //   percentageCommission: 0,
  //   summary: "",
  //   expectations: "",
  // });

  let newCampaign = {
    platform: "",
    country: "",
    percentageCommission: 0,
    summary: "",
    expectations: "",
  };

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

  // const closeForm = () => {
  //   // Logic to close the form
  //   console.log("Closing form...");
  //   // navigate("/dashboard");
  //   window.location.reload();
  // };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  return (
    <div className="new-campaign p-4 bg-white rounded-xl border border-gray-100 shadow-sm w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex justify-between space-x-6 mb-4">
        <p className="text-lg">
          Creer votre campagne et trouver immediatemment votre audience grace a
          notre reseau d'ambassadeur
        </p>
        <button
          onClick={onClose}
          className="close-button h-6 items-center justify-center flex hover-red-200"
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
                  placeholder="Selectionnez"
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
                  placeholder="Selectionnez"
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
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group controlId="summary">
              <Form.Label>Résumé de l'offre/produit</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="expectations">
              <Form.Label>Ce qu'on attend de l'ambassadeur</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="bg-grey-100 border border-2 py-2 px-2 rounded-xl"
            >
              Retour
            </button>
            <Button
              onClick={() => console.log("Form submitted")}
              className="bg-gradient-primary"
            >
              Valider
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCampaign;
