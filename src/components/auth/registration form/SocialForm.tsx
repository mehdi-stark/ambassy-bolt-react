import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSocialNetwork } from "../../../api/socialNetwork";
import UsersApi from "../../../api/user";
import { useUser } from "@clerk/clerk-react";
const SocialForm = () => {
  const { user } = useUser();
  const [userDb, setUserDb] = useState<any>(null);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [index, setIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const message = "Veuillez renseigner l'url de vos réseaux sociaux";

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    console.log("e", e);
    const social = {
      ambassadorId: userDb?._id, // Sophie Martin
      platform: "instagram",
      socialUrl: url,
    };
    await createSocialNetwork(social).then((res) => {
      console.log(res);
      navigate("/dashboard");
    });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {showTitle ? (
        <h2 className="text-6xl font-bold text-gradient fade-out">
          Bienvenue sur Ambassy
        </h2>
      ) : (
        <div className="flex flex-col space-y-8 text-center items-center justify-center fade-in">
          <h2 className="text-4xl font-bold mb-8 text-gradient">{text}</h2>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Entrer l'url de votre compte Instagram ou Tiktok: https://www.instagram.com/cristiano"
            className="fixed w-1/3  p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-gradient-primary mb-4"
          />

          {/* <input
            type="text"
            placeholder="Tiktok: https://www.tiktok.com/@manutd"
            className="w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-gradient-primary mb-4"
          /> */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex justify-between w-full mt-5">
              <button className="px-6 py-2 text-gray-600 rounded-lg hover:text-gray-300 text-sm">
                Passez cette étape
              </button>
              <button
                className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:bg-orange-600 justify-end"
                onClick={handleSubmit}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialForm;
