import React, { useEffect, useState } from "react";

const SocialForm = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const message = "Veuillez renseigner l'url de vos réseaux sociaux";

  // New business store
  // let newBusinessStore = {
  //   userId,
  //   businessType: "ecommerce",
  //   platform: "shopify",
  //   storeName
  //   storeUrl
  // };

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
  }, [index, text, message, showTitle]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {showTitle ? (
        <h2 className="text-6xl font-bold text-gradient fade-out">
          Bienvenue sur Ambassy
        </h2>
      ) : (
        <div className="flex flex-col text-center items-center justify-center fade-in">
          <h2 className="text-4xl font-bold mb-8 text-gradient">{text}</h2>
          <input
            type="text"
            placeholder="Instagram: https://www.instagram.com/cristiano"
            className="fixed w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-gradient-primary mb-4"
          />

          <input
            type="text"
            placeholder="Tiktok: https://www.tiktok.com/@manutd"
            className="w-full p-3 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:ring-0 focus:border-gradient-primary mb-4"
          />
          <div className="flex justify-between w-full">
            <button className="px-6 py-2 text-gray-600 rounded-lg hover:text-gray-300 text-sm">
              Passez cette étape
            </button>
            <button className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:bg-orange-600 justify-end">
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialForm;
