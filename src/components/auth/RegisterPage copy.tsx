import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building, Globe } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useSignUp } from "@clerk/clerk-react";
import { Card } from "../ui/card";
import { useSearchParams } from "react-router-dom";

export function RegisterPageV2() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const [setRole] = useState<"pro" | "ambassador">("pro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(""); // URL du store ou du compte social
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleSignUp = async () => {
    if (!isLoaded) return;

    setIsLoading(true); // Affichage du loader

    try {
      // Étape 1 : Création du compte
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      // Étape 2 : Ajouter le rôle et l'URL associée dans `unsafeMetadata`
      await signUp.update({
        unsafeMetadata: {
          role,
          url, // Stocke l'URL dans les metadata
        },
      });

      // Étape 3 : Envoi du code de vérification par email
      await signUp.prepareEmailAddressVerification();

      // Étape 4 : Finalisation et connexion automatique
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: prompt("Entrez le code reçu par email"),
      });

      if (completeSignUp.status === "complete") {
        setActive({ session: completeSignUp.createdSessionId });
        window.location.href = "/dashboard"; // Redirection après inscription
      }
    } catch (err: any) {
      // Gestion des erreurs
      if (err.errors && err.errors[0]?.code === "form_identifier_exists") {
        setError("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false); // Masquer le loader après la tentative
    }
  };

  return (
    <AuthLayout title="Créer un compte" subtitle="Rejoignez notre communauté">
      <form className="space-y-6">
        {/* Sélection du rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Je suis...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-4 text-center rounded-lg border ${
                role === "pro"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setRole("pro")}
            >
              <Building className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Un Pro</span>
            </button>
            <button
              type="button"
              className={`p-4 text-center rounded-lg border ${
                role === "ambassador"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setRole("ambassador")}
            >
              <User className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Un ambassadeur</span>
            </button>
          </div>
        </div>

        {/* Champ Adresse Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Champ Mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Champ URL spécifique au rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {role === "pro"
              ? "URL de votre boutique en ligne"
              : "Lien Instagram/TikTok"}
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://mon-site.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Bouton d'inscription */}
        <div>
          <button
            type="button"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-primary hover-gradient-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSignUp}
            disabled={isLoading} // Désactiver le bouton pendant le chargement
          >
            {isLoading ? "Création en cours..." : "Créer un compte"}
          </button>
        </div>

        {/* Lien vers connexion */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Déjà un compte?{" "}
            <span className="text-indigo-600 font-medium">Se connecter</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
