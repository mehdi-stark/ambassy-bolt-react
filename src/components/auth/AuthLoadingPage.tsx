import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore, useBusinessStores } from "../../store/Store";
import { set } from "date-fns";
export function AuthLoadingPage() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Récupération des setters depuis Zustand
  const { setUser, setCollaborationRequests, clearUser, setSubscription } =
    useUserStore();
  const { setBusinessStores } = useBusinessStores();

  useEffect(() => {
    if (!isSignedIn || !user) {
      navigate("/login"); // Redirection si l'utilisateur n'est pas connecté
      return;
    }

    const fetchUserData = async () => {
      try {
        await axios
          .get(import.meta.env.VITE_API_SERVER + "/users?clerkId=" + user.id, {
            headers: { "Content-Type": "application/json" },
          })
          .then(async (data) => {
            // Stocker userId + clerkId en sessionStorage
            const userResponse = data.data[0];
            console.log("data user", userResponse);
            console.log("subscription :", userResponse?.subscription);

            // Stocker les données dans Zustand
            setUser({
              userId: userResponse.id || userResponse._id,
              avatar: userResponse.avatar,
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName,
              completeUser: userResponse,
            });

            setSubscription(userResponse?.subscription || {});

            setBusinessStores(userResponse.businessStores || []);

            sessionStorage.setItem(
              "user",
              JSON.stringify({
                userId: userResponse.id || userResponse._id,
                avatar: userResponse.avatar,
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName,
              })
            );
            sessionStorage.setItem(
              "userComplete",
              JSON.stringify(userResponse)
            );
            sessionStorage.setItem(
              "userId",
              userResponse.id || userResponse._id
            );

            // stocker les invitations en attente dans le sessionStorage depuis l'API /collaboration-requests
            await axios
              .get(
                import.meta.env.VITE_API_SERVER +
                  "/collaboration-requests/" +
                  userResponse._id,
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then((data) => {
                console.log("data collaborationRequests", data);

                sessionStorage.setItem(
                  "collaborationRequests",
                  JSON.stringify(data?.data)
                );

                // Stocker les invitations dans Zustand
                setCollaborationRequests(data?.data);

                navigate("/dashboard"); // Redirection finale
                // return data;
              })
              .catch((err) => {
                console.log("err collaborationRequests", err);
                throw new Error(
                  "Erreur lors de la récupération des invitations"
                );
              });
          })
          .catch((err) => {
            console.log("err", err);
            throw new Error("Erreur lors de la récupération de l'utilisateur");
          });
      } catch (error) {
        console.error("Erreur :", error);
        signOut(); // Déconnecte l'utilisateur en cas d'erreur
        localStorage.clear(); // Supprime les données du localStorage
        clearUser(); // Déconnecte l'utilisateur et supprime les données du store Zustand
        navigate("/login"); // Retour à la connexion en cas de problème
      }
    };

    fetchUserData();
  }, [isSignedIn, user, navigate, signOut, setUser, setCollaborationRequests]);

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
