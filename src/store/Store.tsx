import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: any | null;
  collaborationRequests: any[];
  setUser: (user: any) => void;
  setCollaborationRequests: (requests: any[]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      collaborationRequests: [],
      setUser: (user) => set({ user }),
      setCollaborationRequests: (requests) =>
        set({ collaborationRequests: requests }),
      clearUser: () => set({ user: null, collaborationRequests: [] }),
    }),
    {
      name: "user-store", // unique name for the storage key
    }
  )
);

interface BusinessState {
  businessStores: any[];
  setBusinessStores: (stores: any[]) => void;
  addBusinessStore: (store: any) => void;
  removeBusinessStore: (id: string) => void;
}

export const useBusinessStores = create<BusinessState>(
  persist(
    (set) => ({
      businessStores: [],
      setBusinessStores: (stores) => set({ businessStores: stores }),
      addBusinessStore: (store) =>
        set((state) => ({
          businessStores: [...state.businessStores, store],
        })),
      removeBusinessStore: (id) =>
        set((state) => ({
          businessStores: state.businessStores.filter(
            (store) => store.id !== id
          ),
        })),
    }),
    {
      name: "business-store", // unique name for the storage key
    }
  )
);
interface CampaignState {
  campaigns: any[];
  setCampaigns: (campaigns: any[]) => void;
  addCampaign: (campaign: any) => void;
  removeCampaign: (id: string) => void;
}

export const useCampaignStore = create<CampaignState>(
  persist(
    (set) => ({
      campaigns: [],
      setCampaigns: (campaigns) => set({ campaigns }),
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [...state.campaigns, campaign],
        })),
      removeCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
        })),
    }),
    {
      name: "campaign-store", // unique name for the storage key
    }
  )
);

// export const CampaignStore = create<CampaignState>(
//   persist(
//     (set, get) => ({
//       campaigns: [],
//       socials: [],
//       lastUpdated: {},
//       setCampaigns: (campaign) => set({ campaigns : ca }),

//       setUser: (user) => set({ user }),

//       fetchData: async (key, apiCall) => {
//         const lastUpdated = get().lastUpdated[key];
//         const isExpired =
//           !lastUpdated || Date.now() - lastUpdated > 2 * 60 * 60 * 1000;

//         if (isExpired) {
//           const data = await apiCall();
//           set((state) => ({
//             [key]: data,
//             lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
//           }));
//         }
//       },

//       refreshData: async (key, apiCall) => {
//         const data = await apiCall();
//         set((state) => ({
//           [key]: data,
//           lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
//         }));
//       },

//       logout: () =>
//         set({
//           user: null,
//           campaigns: [],
//           socials: [],
//           stores: [],
//           lastUpdated: {},
//         }),
//     }),
//     {
//       name: "campaign-store", // unique name for the storage key
//     }
//   )
// );
