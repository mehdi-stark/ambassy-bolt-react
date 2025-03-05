import React, { useEffect, useState } from "react";
import { Button, ProgressBar, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import PlatformItem from "./PlatformItem";
import countries from "../../assets/favorite_countries.json";
import languages from "../../assets/favorite_langues.json";
import { platforms } from "../../types";
import { useBusinessStores, useUserStore } from "../../store/Store";

const NewCampaign = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<string>("");

  const [userData, setUserData] = useState<any>(null);
  const [selectedShop, setSelectedShop] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState(0);
  const [summary, setSummary] = useState("");
  const [expectations, setExpectations] = useState("");
  const navigate = useNavigate();

  const { businessStores, setBusinessStores, addBusinessStore } =
    useBusinessStores();
  const { user } = useBusinessStores();

  const [formDetails, setFormDetails] = useState({
    todoByInfluencer: "",
    offerSummary: "",
    storeUrl: "",
    selectedPlatforms: [],
    additionalInfo: "",
    commission: "",
  });

  // useEffect(() => {
  //   const user = sessionStorage.getItem("userComplete");
  //   if (user) {
  //     const parsedUser = JSON.parse(user);
  //     setUserData(parsedUser);
  //     setBusinessStores(parsedUser.businessStores || []);
  //   }
  // }, []);

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

  const handleCommissionSelect = (commission: string) => {
    setSelectedCommission(commission);
    setFormDetails((prev) => ({
      ...prev,
      commission,
    }));
  };

  const generateLink = () => {
    // TODO: ajouter appel api pour generer lien
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
      type: "global",
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
    <div className="new-campaign flex flex-col p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:w-2/3 w-full md:mx-auto h-full overflow-auto">
      {/* Title */}
      <div className="flex flex-row justify-between items-center mb-4 space-x-3">
        <p className="text-lg text-center font-bold md:text-2xl">
          Créez votre campagne et trouvez immédiatement votre audience grâce à
          notre réseau d'ambassadeurs
        </p>
        <button
          onClick={onClose}
          className="close-button h-6 items-center justify-center flex hover:text-red-500 font-bold"
        >
          X
        </button>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        {/* Progress Bar */}
        <ProgressBar now={(step / 3) * 100} className="w-full" />

        <div className="mb-4"></div>

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
                <div className="card flex justify-content-center bg-slate-200">
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
          <div className="step-3 flex flex-col space-y-4 items-center justify-center p-4 w-full">
            <section className="mb-4 w-full flex flex-col">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Choisir votre shop
              </h2>
              <Dropdown
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.value)}
                options={businessStores}
                optionLabel="storeName"
                placeholder="Sélectionner un shop"
                className="w-full md:w-14rem border border-2 border-gray-200"
              />
            </section>
            {selectedShop && (
              <section className="mb-4 w-full flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  Lien d'affiliation <span className="text-red-500">*</span>
                </h2>
                <input
                  type="text"
                  disabled={true}
                  value="https"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary mb-2"
                />
                {/* <button className="">Generer</button> */}
                <Button
                  onClick={generateLink}
                  className="bg-gradient-primary w-full"
                >
                  Generer
                </Button>
              </section>
            )}
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
            <section className="mb-4 w-full flex flex-col">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Donnez un résumé rapide de votre offre{" "}
                <span className="text-red-500">*</span>
              </h2>
              <textarea
                id="offerSummary"
                required={true}
                placeholder="Fournissez aux influenceurs un bref aperçu de votre marque et des objectifs de la campagne..."
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                value={formDetails.offerSummary}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    offerSummary: e.target.value,
                  })
                }
              />
              <div className="mt-2">
                <p className="text-gray-600 mb-2 text-sm">
                  Vous voudrez peut-être inclure...
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Description du produit
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Positionnement de la marque
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Auto-présentation
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-4 w-full flex flex-col">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Ce qui doit être fait par l'influenceur{" "}
                <span className="text-red-500">*</span>
              </h2>
              <textarea
                id="todoByInfluencer"
                placeholder="Fournissez aux influenceurs la description de votre tâche..."
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                value={formDetails.todoByInfluencer}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    todoByInfluencer: e.target.value,
                  })
                }
              />
              <div className="mt-2">
                <p className="text-gray-600 mb-2 text-sm">
                  Vous voudrez peut-être inclure...
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Type de créatif - post, story, reel etc.
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Nombre de créatifs souhaités
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mentions et hashtags spécifiques
                  </li>
                </ul>
              </div>
            </section>

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
    </div>
  );
};

export default NewCampaign;
