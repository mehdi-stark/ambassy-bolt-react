import { useUserStore, useBusinessStores } from "../../store/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ProgressBar, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlatformItem from "../global_campaigns/PlatformItem";
import { platforms } from "../../types";

const AmbassadorCampaignForm = ({ onReturn }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<string>("");
  const [formDetails, setFormDetails] = useState({
    todoByInfluencer: "",
    offerSummary: "",
    storeUrl: "",
    selectedPlatforms: [],
    additionalInfo: "",
    commission: "",
  });
  const userData = useUserStore();

  const isFormValid =
    formDetails.todoByInfluencer &&
    formDetails.offerSummary &&
    formDetails.storeUrl &&
    formDetails.selectedPlatforms.length > 0 &&
    formDetails.commission;

  const nextStep = () => {
    setFormDetails((prev) => ({
      ...prev,
      selectedPlatforms,
    }));
    console.log("formDetails", formDetails);
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleReturn = () => {
    if (step === 1) {
      onReturn();
    } else {
      prevStep();
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
    console.log("selectedPlatforms", selectedPlatforms);
  };

  const handleCommissionSelect = (commission: string) => {
    setSelectedCommission(commission);
    setFormDetails((prev) => ({
      ...prev,
      commission,
    }));
  };

  function handleFormSubmit() {
    console.log("Détails du formulaire:", formDetails);
    // axios.post("/api/campaigns", formDetails).then((response) => {
    //   console.log("Réponse de l'API:", response);
    // });
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto h-full overflow-y-auto">
      <div className="mt-2">
        <ProgressBar now={(step / 3) * 100} />
      </div>

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
                    onChange={(checked) => {
                      console.log(
                        "handlePlatformChange",
                        platform.name,
                        checked
                      );
                      handlePlatformChange(platform.name, checked);
                    }}
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
        <div className="step-1  p-2 w-full">
          <h1 className="text-2xl font-bold mb-8">
            Quelle est votre idée de campagne ?
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                URL de votre boutique <span className="text-red-500">*</span>
              </h2>
              <input
                type="text"
                value={formDetails.storeUrl}
                placeholder="Exemple : ma-boutique.shopify.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                onChange={(e) =>
                  setFormDetails({ ...formDetails, storeUrl: e.target.value })
                }
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">
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

            <section>
              <h2 className="text-xl font-semibold mb-2">
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

            <div className="flex justify-between mt-6">
              <button
                onClick={handleReturn}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-lg ${
                  isFormValid
                    ? "bg-gradient-primary text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={nextStep}
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-1  p-2 w-full">
          <h1 className="text-2xl font-bold mb-8">Quelle est le benefice</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                Pourcentage de commission{" "}
                <span className="text-red-500">*</span>
              </h2>

              <div className="flex space-x-4">
                {["10%", "15%", "20%", "Custom"].map((commission) => (
                  <Card
                    key={commission}
                    className={`cursor-pointer w-48 ${
                      selectedCommission === commission ? "border-2" : "border"
                    }`}
                    style={{
                      borderColor:
                        selectedCommission === commission ? "blue" : "red",
                    }}
                    onClick={() => handleCommissionSelect(commission)}
                  >
                    <Card.Body>
                      <Card.Text className="text-md font-bold">
                        {commission}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                Information additionnelle{" "}
              </h2>
              <textarea
                value={formDetails.additionalInfo}
                placeholder="Exemple : ma-boutique.shopify.com"
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    additionalInfo: e.target.value,
                  })
                }
              />
            </section>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleReturn}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Retour
              </button>
              <button
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-lg ${
                  isFormValid
                    ? "bg-gradient-primary text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleFormSubmit}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbassadorCampaignForm;
