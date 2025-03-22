import { useUserStore, useBusinessStores } from "../../store/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  ProgressBar,
  Form,
  Card,
  Spinner,
  Modal,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlatformItem from "../global_campaigns/PlatformItem";
import { platforms } from "../../types";
import { generateAffiliateLink } from "../../api/affiliateLink";
import { Loader2 } from "lucide-react";
import { set } from "date-fns";
// import { Dropdown } from "primereact/dropdown";

const AmbassadorForm = ({ onReturn, ambassador }) => {
  const { user } = useUserStore();
  const {
    businessStores,
    setBusinessStores,
    addBusinessStore,
    clearBusinessStores,
  } = useBusinessStores();
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [dropDownValue, setDropDownValue] = useState("Selectionnez un shop");
  const [selectedCommission, setSelectedCommission] = useState<string>("");
  const [formDetails, setFormDetails] = useState<{
    ambassadorId: string;
    proId: string;
    // affiliateLink: string;
    affiliateLink: any;
    todoByInfluencer: string;
    offerSummary: string;
    storeId: string;
    storeUrl: string;
    storeName: string;
    selectedPlatforms: string[];
    additionalInfo: string;
    commission: string;
  }>({
    ambassadorId: ambassador._id,
    proId: user._id,
    affiliateLink: "",
    todoByInfluencer: "",
    offerSummary: "",
    storeId: "",
    storeUrl: "",
    storeName: "",
    selectedPlatforms: [],
    additionalInfo: "",
    commission: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    // formDetails.todoByInfluencer &&
    // formDetails.offerSummary &&
    // ((formDetails.storeUrl && formDetails.storeName) || formDetails.storeId) &&
    // formDetails.selectedPlatforms.length > 0 &&
    step !== 3 || formDetails.commission;

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

  const handleBusinessSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const business = {
        proId: user?.userId,
        ambassadorId: ambassador?._id,
        businessType: "ecommerce",
        storeName: formDetails.storeName,
        storeUrl: formDetails.storeUrl,
        platform: "shopify",
        createdBy: user?.userId,
      };

      console.log("Détails du formulaire:", formDetails);
      const response = await axios.post(
        import.meta.env.VITE_API_SERVER + "/business/create",
        business
      );

      console.log("Réponse de l'API:", response);
      addBusinessStore(response.data?.store);
      nextStep();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setError("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const newCampaign = {
        proId: user?.userId,
        ambassadorId: ambassador?._id,
        commissionPercentage: formDetails.commission,
        storeUrl: formDetails.storeUrl,
        campaignSummary: formDetails.offerSummary,
        campaignScript: formDetails.todoByInfluencer,
        type: "ambassador",
        affiliateLink: {
          title: formDetails.offerSummary,
        },
        category: "",
        requirements: "",
        platform:
          selectedPlatforms.length > 0
            ? selectedPlatforms[0]?.toLowerCase()
            : "",
        createdBy: user?.userId,
      };

      console.log("Détails du formulaire:", formDetails);
      const response = await axios.post(
        import.meta.env.VITE_API_SERVER + "/campaigns",
        newCampaign
      );

      console.log("Réponse de l'API:", response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onReturn();
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setError("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShop = (shop) => {
    console.log("print shop", shop);
    setSelectedShop(shop);
    if (shop === "addNew") {
      setFormDetails({ ...formDetails, storeName: "", storeUrl: "" });
    } else {
      const selectedStore = businessStores.find(
        (store) => store.storeName === shop
      );

      console.log("print businessStores", selectedStore);
      setFormDetails({
        ...formDetails,
        storeName: selectedStore.storeName,
        storeUrl: selectedStore.storeUrl,
        storeId: selectedStore._id,
      });
    }
    console.log("formDetails", formDetails);
  };

  const generateLink = (val) => {
    // TODO: ajouter appel api pour generer lien
    setIsLoading(true);
    setError("");
    console.log("generate link form : ", val);
    const newLink = {
      proId: user._id,
      ambassadorId: ambassador._id,
      storeId: formDetails.storeId,
    };
    generateAffiliateLink(newLink)
      .then((response) => {
        console.log("data", response.data);
        // setFormDetails({ ...formDetails, affiliateLink: response.data?.link });
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isOpenGenerateLink =
    (selectedShop && selectedShop !== "addNew") ||
    (selectedShop === "addNew" &&
      formDetails.storeName &&
      formDetails.storeUrl);

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
        <div className="step-1 p-2 w-full">
          <h1 className="text-2xl font-bold mb-4">
            Quelle est votre idée de campagne ?
          </h1>

          <div className="space-y-6">
            <section className="mb-4 w-full flex flex-col">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Choisir votre shop <span className="text-red-500">*</span>
              </h2>
              <select
                value={selectedShop}
                onChange={(e) => handleSelectShop(e.target.value)}
                className="w-full p-3 border text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary appearance-none"
              >
                <option value="" disabled>
                  Sélectionner un shop {" > "}
                </option>
                {businessStores.map((store) => (
                  <option key={store.storeName} value={store.storeName}>
                    {store.storeName}
                  </option>
                ))}
                <option value="addNew">Ajouter un nouveau shop</option>
              </select>
            </section>
            {selectedShop === "addNew" && (
              <section>
                <h2 className="text-xl font-semibold mb-2">
                  Nom de votre boutique <span className="text-red-500">*</span>
                </h2>
                <input
                  type="text"
                  value={formDetails.storeName}
                  placeholder="Exemple : Theires du monde"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary mb-2"
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      storeName: e.target.value,
                    })
                  }
                />

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
            )}
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
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    offerSummary: e.target.value,
                  });
                  console.log("formDetails", formDetails);
                }}
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
                Ce qui doit être fait par l'ambassadeur{" "}
                <span className="text-red-500">*</span>
              </h2>
              <textarea
                id="todoByInfluencer"
                placeholder="Fournissez aux influenceurs la description de votre tâche..."
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
                value={formDetails.todoByInfluencer}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    todoByInfluencer: e.target.value,
                  });
                  console.log("formDetails", formDetails);
                }}
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
                onClick={
                  selectedShop !== "addNew" && formDetails.storeId
                    ? nextStep
                    : handleBusinessSubmit
                }
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-1 p-2 w-full mb-5">
          <h1 className="text-2xl font-bold mb-8">Quelle est le bénéfice</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                Pourcentage de commission{" "}
                <span className="text-red-500">*</span>
              </h2>

              <div className="flex space-x-4">
                {["10", "15", "20", "Custom"].map((commission) => (
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
                        {commission}%
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </section>

            {isOpenGenerateLink && (
              <section className="mb-4 w-full flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  Lien d'affiliation <span className="text-red-500">*</span>
                </h2>
                <input
                  type="text"
                  disabled={true}
                  value={formDetails.affiliateLink}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary mb-2"
                />
                {/* <button className="">Generer</button> */}
                {/* <Button
                  onClick={generateLink}
                  className="bg-gradient-primary w-full"
                >
                  Generer
                </Button> */}

                <Button
                  disabled={isLoading || formDetails.affiliateLink !== ""}
                  onClick={generateLink}
                  className="bg-gradient-primary w-full"
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Generer"
                  )}
                </Button>
              </section>
            )}

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
                {loading ? <Spinner animation="border" size="sm" /> : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal show={success} onHide={() => setSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Succès</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Votre campagne a été créée avec succès !</p>
        </Modal.Body>
      </Modal>

      {error && (
        <Modal show={!!error} onHide={() => setError("")} centered>
          <Modal.Header closeButton>
            <Modal.Title>Erreur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{error}</p>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AmbassadorForm;
