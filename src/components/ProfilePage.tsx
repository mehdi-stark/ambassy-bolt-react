import { useUser } from "@clerk/clerk-react";
import { Navigation } from "./Navigation";
import { Instagram, Twitch } from "lucide-react";
import shopifyLogo from "../assets/logo-shopify.png";

export const ProfilePage = () => {
  const user = useUser();

  const handleShopifyLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_KEY;
    const REDIRECT_URI = import.meta.env.VITE_SHOPIFY_REDIRECT_URI;
    const SCOPES = "read_products,read_orders"; // Ajoute d'autres permissions si nécessaire
    const shopUrl = "ambassy-test.myshopify.com";
    const userId = sessionStorage.getItem("userId");
    // const shopUrl = shop.endsWith(".myshopify.com") ? shop : `${shop}.myshopify.com`;
    console.log("CLIENT_ID :", CLIENT_ID);
    console.log("REDIRECT_URI :", REDIRECT_URI);
    // const encodedRedirectUri = encodeURIComponent(
    //   `${REDIRECT_URI}?userId=${user.user?.id}`
    // );
    // console.log("encodedRedirectUri :", encodedRedirectUri);

    window.location.href = `https://${shopUrl}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${userId}`;
  };

  const handleTikTokLogin = () => {
    // Ouvre la fenêtre de connexion TikTok
    // import.meta.env.API_SERVER + '/api/authenticate/tiktok'
    const csrfState = Math.random().toString(36).substring(2);
    // res.cookie('csrfState', csrfState, {maxAge: 60000});

    let url = "https://www.tiktok.com/v2/auth/authorize/";

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${import.meta.env.VITE_TIKTOK_CLIENT_KEY}`;
    url += "&scope=user.info.basic";
    url += "&response_type=code";
    url += `&redirect_uri=${import.meta.env.VITE_SERVER_ENDPOINT_REDIRECT}`;
    url += "&state=" + csrfState;

    // const url = import.meta.env.VITE_API_SERVER + '/api/social/authenticate/tiktok';
    console.log("print URL :", url);
    window.location.href = url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Navigation />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Mon Profil</span>
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et vos paramètres
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Informations du Profil</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID:
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-1"
              disabled
              value={user.user?.emailAddresses[0].emailAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-1"
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Abonnement</h2>
          <p className="text-gray-600">Plan actuel: Premium</p>
        </section>

        {/* Section Pro */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Mes Shops</h2>
          <ul className="text-gray-600">
            <li>Shop 1</li>
            <li>Shop 2</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Invitations Envoyées</h2>
          <ul className="text-gray-600">
            <li>Invitation 1</li>
            <li>Invitation 2</li>
          </ul>
        </section>

        {/* Boutiques
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold">Mes Boutiques</h3>
            <button 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={handleShopifyLogin}
            >
              Ajouter
            </button>
          </div>
          <div className="p-6 space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-col items-center text-sm space-y-3">
                      <div className='flex flex-row items-center'>
                        <Instagram className="w-4 h-4 mr-1" />
                        <button onClick={handleTikTokLogin}>Se connecter a Instagram</button>
                      </div>
                      <div className='flex flex-row items-center'>
                        <Twitch className="w-4 h-4 mr-1" />
                        <button onClick={handleTikTokLogin}>Se connecter a Tiktok</button>       
                      </div>
                      <div className='flex flex-row items-center'>
                        <img src='../assets/logo-shopify.png' className="w-4 h-4 mr-1" />
                        <button onClick={handleShopifyLogin}>Se connecter a Shopify</button>       
                      </div>
                    </div>
              </div>
          </div>
        </div> */}

        {/* Section Ambassador */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="relative h-48 sm:h-56">
            <h3 className="flex items-center justify-center text-center text-gradient text-2xl font-bold">
              Mes réseaux sociaux
            </h3>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center text-sm space-y-3">
                  <div className="flex flex-row items-center">
                    <Instagram className="w-4 h-4 mr-1" />
                    <button onClick={handleTikTokLogin}>
                      Se connecter a Instagram
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <Twitch className="w-4 h-4 mr-1" />
                    <button onClick={handleTikTokLogin}>
                      Se connecter a Tiktok
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <img src={shopifyLogo} className="w-4 h-4 mr-1" />
                    <button onClick={handleShopifyLogin}>
                      Se connecter a Shopify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
