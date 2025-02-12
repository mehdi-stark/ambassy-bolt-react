import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export function AuthLoadingPage() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn || !user) {
      navigate("/login"); // Redirection si l'utilisateur n'est pas connecté
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_SERVER + "/api/users?clerkId=" + user.id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération de l'utilisateur");

        const data = await response.json();
        console.log("data user", data);
        // Stocker userId + clerkId en sessionStorage
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            userId: data[0].id || data[0]._id,
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            avatar: user.imageUrl,
          })
        );
        sessionStorage.setItem("userId", data[0].id || data[0]._id);

        // stocker les invitations en attente dans le sessionStorage depuis l'API /api/collaboration-requests
        const collaborationRequests = await fetch(
          import.meta.env.VITE_API_SERVER +
            "/api/collaboration-requests?userId=" +
            data[0].id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!collaborationRequests.ok)
          throw new Error("Erreur lors de la récupération des invitations");

        const requests = await collaborationRequests.json();
        sessionStorage.setItem(
          "collaborationRequests",
          JSON.stringify(requests)
        );

        navigate("/dashboard"); // Redirection finale
      } catch (error) {
        console.error("Erreur :", error);
        signOut(); // Déconnecte l'utilisateur en cas d'erreur
        navigate("/login"); // Retour à la connexion en cas de problème
      }
    };

    fetchUserData();
  }, [isSignedIn, user, navigate, signOut]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Chargement de votre compte...
        </p>
      </div>
    </div>
  );
}
