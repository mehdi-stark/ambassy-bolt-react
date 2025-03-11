import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const SupportPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const faqData = [
    {
      question: "Comment puis-je créer une campagne ?",
      answer:
        "Pour créer une campagne, rendez-vous sur la page 'Mes Campagnes' et cliquez sur 'Nouvelle Campagne'. Suivez les instructions pour configurer votre campagne.",
    },
    {
      question: "Comment puis-je contacter un ambassadeur ?",
      answer:
        "Vous pouvez contacter un ambassadeur en allant sur la page 'Rechercher' et en cliquant sur le bouton 'Connecter' sur le profil de l'ambassadeur.",
    },
    {
      question: "Comment puis-je modifier mon profil ?",
      answer:
        "Pour modifier votre profil, allez sur la page 'Profil' et cliquez sur 'Modifier le profil'.",
    },
    {
      question: "Comment puis-je ajouter une boutique ?",
      answer:
        "Pour ajouter une boutique, allez sur la page 'Dashboard' et cliquez sur 'Ajouter une boutique'.",
    },
  ];

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer l'e-mail
    console.log("Email:", email);
    console.log("Message:", message);
    setIsEmailSent(true);
    setEmail("");
    setMessage("");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+33780959100";
    const message = "Bonjour, j'ai besoin d'aide !";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          <span className="text-gradient">Aide et Support</span>
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
          {isEmailSent ? (
            <p className="text-green-500 mb-4">
              Votre message a été envoyé avec succès !
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
              >
                Envoyer
              </button>
            </form>
          )}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">
              Autres moyens de nous contacter
            </h3>
            <div className="flex md:flex-row flex-col items-center md:space-x-4 space-y-4 md:space-y-0">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
              >
                <MessageCircle className="mr-2" />
                WhatsApp
              </button>
              <a
                href="mailto:support@example.com"
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600"
              >
                <Mail className="mr-2" />
                Email
              </a>
              {/* <a
                href="tel:+33780959100"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
              >
                <Phone className="mr-2" />
                Téléphone
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
