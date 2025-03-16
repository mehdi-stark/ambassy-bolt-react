import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import UsersApi from "../../../api/user";
import BusinessApi from "../../../api/businessStore";
import { useUser } from "@clerk/clerk-react";

const StoreForm = () => {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [userDb, setUserDb] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const message = "Veuillez renseigner l'url de votre boutique";

  useEffect(() => {
    if (showTitle) {
      setTimeout(() => {
        setShowTitle(false);
      }, 2000); // Adjust the duration as needed
    } else if (index < message.length) {
      setTimeout(() => {
        setText(text + message[index]);
        setIndex(index + 1);
      }, 100);
    }

    if (user?.id) {
      UsersApi.getUserByClerkId(user.id).then((res) => {
        console.log("RES DATA:", res.data);
        setUserDb(res.data);
      });
    }
  }, [index, text, message, showTitle]);

  async function handlePassStep() {
    setLoading(true);
    console.log("userDb", userDb);
    const store = {
      userId: userDb?._id, // Sophie Martin
      businessType: "ecommerce",
      platform: "shopify",
      storeUlr: url,
    };
    await BusinessApi.createBusinessStore(store).then((res) => {
      console.log(res);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Simulate a delay for loading
    });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {showTitle ? (
        <h2 className="text-4xl md:text-6xl font-bold text-gradient fade-out items-center justify-center flex">
          Bienvenue sur Ambassy
        </h2>
      ) : (
        <div className="flex flex-col text-center items-center justify-center fade-in p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
            {text}
          </h2>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Par exemple: ma-boutique.shopify.com"
            className="md:w-[680px] w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-gradient-primary mb-4"
          />
          <div className="flex justify-between w-full">
            <button
              onClick={handlePassStep}
              className="px-6 py-2 text-gray-600 rounded-lg hover:text-gray-300 text-sm"
              disabled={loading}
            >
              Passez cette étape
            </button>
            <button
              onClick={handlePassStep}
              className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:bg-orange-600 justify-end flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
              ) : (
                "Suivant"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreForm;
