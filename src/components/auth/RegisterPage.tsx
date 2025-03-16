import { SignUp } from "@clerk/clerk-react";
import { set } from "date-fns";
import { Building, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/Store";

export function RegisterPage() {
  const { role, setRole } = useUserStore();
  const [tmpRole, setTmpRole] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour l'inscription
  const handleSignUp = async () => {
    try {
      console.log("tmpRole", tmpRole);
      setIsLoading(true);
      setRole(tmpRole);
      setError(null);
    } catch (err) {
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      {/* <SignUp redirectUrl="/user-register" /> */}
      {/* <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-white rounded-full",
            formFieldInput:
              "rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          },
        }}
        afterSignUpUrl="/user-register"
      /> */}
      {/* <SignUp
        signUp={{
          fields: {
            email: true,
            password: true,
            publicMetadata: {
              role: {
                label: "Votre rôle",
                type: "select",
                options: [
                  { label: "Marque", value: "client" },
                  { label: "Influenceur", value: "influencer" },
                ],
              },
            },
          },
        }}
        afterSignUpUrl="/user-register"
      /> */}
      {!role && (
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
                  tmpRole === "pro"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setTmpRole("pro")}
              >
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Un Pro</span>
              </button>
              <button
                type="button"
                className={`p-4 text-center rounded-lg border ${
                  tmpRole === "ambassador"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setTmpRole("ambassador")}
              >
                <User className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Un ambassadeur</span>
              </button>
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
            >
              Demarrer
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
      )}
      {(role === "pro" || role === "ambassador") && (
        <SignUp
          appearance={{
            elements: {
              formFieldInput: "border border-gray-300 rounded-lg px-3 py-2",
              formFieldLabel: "text-gray-700 font-medium mb-2",
            },
          }}
          unsafeMetadata={{
            role: role, // La valeur sera mise à jour lors du signup
          }}
          afterSignUpUrl={
            role === "pro"
              ? "/registration-form-store"
              : "/registration-form-social"
          } // Redirection après inscription
        />
      )}

      {(role === "pro" || role === "ambassador") && (
        <button
          type="button"
          className="border-indigo-600 bg-indigo-50 text-indigo-600 mt-2"
          onClick={() => {
            setTmpRole("");
            setRole("");
          }}
        >
          {"< Modifier role"}
        </button>
      )}
    </div>
  );
}
