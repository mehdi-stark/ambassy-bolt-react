import { useUserStore } from "../store/Store";
import { SearchGlobalCampaign } from "./SearchGlobalCampaignPage";
import { SearchAmbassador } from "./SearchAmbassador";

const SearchPage = () => {
  const { role } = useUserStore();
  return (
    <div className="max-w-7xl mx-auto">
      {role == "pro" ? <SearchAmbassador /> : <SearchGlobalCampaign />}
    </div>
  );
};

export default SearchPage;
