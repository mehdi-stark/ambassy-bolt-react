const AmbassadorCampaignForm = () => {
  return (
    <div className="flex flex-col max-w-2xl mx-auto h-full">
      {/* <div className="flex items-center mb-8">
        <span className="text-lg font-medium">Nouvelle offre</span>
        <div className="flex-1 h-2 bg-gray-100 mx-4 rounded">
          <div className="w-[42%] h-full bg-gray-600 rounded" />
        </div>
        <span className="text-lg">42%</span>
      </div> */}

      <h1 className="text-2xl font-bold mb-8 mt-4">
        Quelle est votre idée de campagne ?
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">URL de votre boutique</h2>
          {/* <p className="text-gray-600 mb-4">
            Ce compte représentera votre marque auprès de votre ambassadeur
          </p> */}
          <input
            type="text"
            placeholder="Exemple : ma-boutique.shopify.com"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gradient-primary"
          />
        </section>

        {/* <section>
          <h2 className="text-xl font-semibold mb-4">Nom de l'offre</h2>
          <input
            type="text"
            placeholder="Incluez le nom de votre marque..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </section> */}

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Donnez un résumé rapide de votre offre
          </h2>
          <textarea
            placeholder="Fournissez aux influenceurs un bref aperçu de votre marque et des objectifs de la campagne..."
            className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
          />
          <div className="mt-2">
            <p className="text-gray-600 mb-2 text-sm">
              Vous voudrez peut-être inclure...
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Description du produit
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Positionnement de la marque
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Auto-présentation
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Ce qui doit être fait par l'influenceur
          </h2>
          <textarea
            placeholder="Fournissez aux influenceurs la description de votre tâche..."
            className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gradient-primary"
          />
          <div className="mt-2">
            <p className="text-gray-600 mb-2 text-sm">
              Vous voudrez peut-être inclure...
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Type de créatif - post, story, reel etc.
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Nombre de créatifs souhaités
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Mentions et hashtags spécifiques
              </li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between mt-6">
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Retour
          </button>
          <button className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:bg-orange-600">
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorCampaignForm;
