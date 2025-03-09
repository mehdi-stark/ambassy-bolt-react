import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { Envelope, MessageCircle, Phone } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">Support</span>
            </h1>
            <p className="text-gray-600">
              Gérez vos informations personnelles et vos paramètres
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">FAQ</h2>
            <ul className="text-gray-600">
              <li></li>
            </ul>
          </section>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default SupportPage;
