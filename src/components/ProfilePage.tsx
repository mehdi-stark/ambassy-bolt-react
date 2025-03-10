import { useUser } from "@clerk/clerk-react";
import { Navigation } from "./Navigation";
import { Instagram, Store, Twitch } from "lucide-react";
import shopifyLogo from "../assets/logo-shopify.png";
import axios from "axios";
import {
  useUserStore,
  useBusinessStores,
  useCampaignStore,
} from "../store/Store";

export const ProfilePage = () => {
  const { user, subscription } = useUserStore();
  const { businessStores } = useBusinessStores();
  const { campaigns } = useCampaignStore();
  const userClerk = useUser();
  const shopUrl = "e5jqg8-y2.myshopify.com";

  const handleShopifyLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_KEY;
    const REDIRECT_URI = import.meta.env.VITE_SHOPIFY_REDIRECT_URI;
    const SCOPES = "read_products,read_orders"; // Ajoute d'autres permissions si nécessaire
    // const shopUrl = "ambassy-test.myshopify.com";
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

  const handleMeta = () => {
    const CLIENT_ID = import.meta.env.VITE_META_APP_ID;
    const REDIRECT_URI = import.meta.env.VITE_META_REDIRECT_URI;
    const SCOPES = "instagram_basic,instagram_content_publish,pages_show_list"; // Ajoute d'autres permissions si nécessaire
    const userId = sessionStorage.getItem("userId");
    console.log("CLIENT_ID :", CLIENT_ID);
    console.log("REDIRECT_URI :", REDIRECT_URI);
    // const encodedRedirectUri = encodeURIComponent(
    //   `${REDIRECT_URI}?userId=${user.user?.id}`
    // );
    // console.log("encodedRedirectUri :", encodedRedirectUri);

    // window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${userId}&response_type=code`;
    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${userId}&response_type=code`;
  };

  const handleTikTokLogin = () => {
    // Ouvre la fenêtre de connexion TikTok
    // import.meta.env.API_SERVER + '/authenticate/tiktok'
    const CLIENT_ID = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    const REDIRECT_URI = import.meta.env.VITE_TIKTOK_REDIRECT_URI;
    const SCOPES = "user.info.basic"; // Ajoute d'autres permissions si nécessaire
    // const userId = sessionStorage.getItem("userId");
    // const shopUrl = shop.endsWith(".myshopify.com") ? shop : `${shop}.myshopify.com`;
    console.log("CLIENT_ID :", CLIENT_ID);
    console.log("REDIRECT_URI :", REDIRECT_URI);
    const csrfState = Math.random().toString(36).substring(2);
    // res.cookie('csrfState', csrfState, {maxAge: 60000});

    // let url = "https://www.tiktok.com/v2/auth/authorize/";

    // // the following params need to be in `application/x-www-form-urlencoded` format.
    // url += `?client_key=${CLIENT_ID}`;
    // url += `&scope=${SCOPES}`;
    // url += "&response_type=code";
    // url += `&redirect_uri=${REDIRECT_URI}`;
    // url += "&state=" + csrfState;

    let url =
      "https://www.tiktok.com/v2/auth/authorize/" +
      "client_key=" +
      encodeURIComponent(CLIENT_ID) +
      "&scope=" +
      encodeURIComponent("user.info.basic") +
      "&response_type=" +
      encodeURIComponent("code") +
      "&redirect_uri=" +
      encodeURIComponent(REDIRECT_URI) +
      "&state=" +
      encodeURIComponent(csrfState);

    // const url = import.meta.env.VITE_API_SERVER + '/social/authenticate/tiktok';
    console.log("print URL :", url);
    window.location.href = url;
  };

  const fetchShopifyData = () => {
    axios
      .get(import.meta.env.VITE_API_SERVER + "/ecommerce/get-stats", {
        auth: {
          username: "db1f62f484dc61ff91a25df8eef571f9",
          password: "755d1b747f79c9485a30ad184754ef2f",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // const url = `https://${shopUrl}/admin/api/2025-01/orders.json?status=any`;

    // axios
    //   .get(url, {
    //     auth: {
    //       username: "db1f62f484dc61ff91a25df8eef571f9",
    //       password: "755d1b747f79c9485a30ad184754ef2f",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleAddStoreClick = () => {
    console.log("handleAddStoreClick");
  };

  console.log("print subscription", subscription);

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

      <div className="flex flex-col space-y-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Informations du Profil</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Adresse email:
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-2"
              disabled
              value={userClerk.user?.emailAddresses[0].emailAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 p-1">
              Mot de passe actuel:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nouveau Mot de passe:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 p-2"
            />
          </div>
          <button className="px-4 py-2 bg-gradient-primary hover-gradient-primary text-white rounded-xl font-medium transition-colors w-full">
            Modifier
          </button>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Abonnement</h2>
          <p className="text-gray-600">Plan actuel: {subscription.plan}</p>
        </section>

        {/* Section Pro */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Mes Shops</h2>
          <div className="p-6 space-y-4 flex flex-col">
            {businessStores.map((store) => (
              <div
                key={store.id}
                className="flex items-center p-4 bg-gray-50 rounded-xl"
              >
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <Store className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h5 className="font-medium text-gray-900">
                    {store.storeName}
                  </h5>
                  <p className="text-sm text-gray-500">{store.storeUrl}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {store.stats.totalProducts} produits
                  </div>
                  <div className="text-sm text-gray-500">
                    {store.stats.monthlyOrders} commandes/mois
                  </div>
                </div>
              </div>
            ))}
            <button
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              onClick={handleAddStoreClick}
            >
              Ajouter
            </button>
          </div>
          {/* <ul className="text-gray-600">
            <li>Shop 1</li>
            <li>Shop 2</li>
          </ul> */}
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Invitations Envoyées</h2>
          <ul className="text-gray-600">
            <li>Invitation 1</li>
            <li>Invitation 2</li>
          </ul>
        </section>

        {/* Section Ambassador */}
        {user.role === "ambassador" && (
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
                      <button onClick={handleMeta}>
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
                    <div className="flex flex-row items-center">
                      <img src={shopifyLogo} className="w-4 h-4 mr-1" />
                      <button onClick={fetchShopifyData}>
                        Recup data Shopify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
