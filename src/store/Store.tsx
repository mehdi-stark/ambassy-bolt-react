import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: any | null;
  role: string;
  collaborationRequests: any[];
  subscription: any;
  setUser: (user: any) => void;
  setRole: (role: string) => void;
  setSubscription: (subsciption: any) => void;
  setCollaborationRequests: (requests: any[]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      role: "",
      collaborationRequests: [],
      subscription: null,
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setSubscription: (subscription) => set({ subscription }),
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
  clearBusinessStores: () => void;
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
      clearBusinessStores: () => set({ businessStores: [] }), // Implémentation de la fonction clearBusinessStores
    }),
    {
      name: "business-store", // unique name for the storage key
    }
  )
);

interface SocialState {
  socials: any[];
  setSocials: (socials: any[]) => void;
  addSocial: (social: any) => void;
  removeSocial: (id: string) => void;
}

export const useSocialStore = create<SocialState>(
  persist(
    (set) => ({
      socials: [],
      setSocials: (socials) => set({ socials }),
      addSocial: (social) =>
        set((state) => ({
          socials: [...state.socials, social],
        })),
      removeSocial: (id) =>
        set((state) => ({
          socials: state.socials.filter((social) => social.id !== id),
        })),
    }),
    {
      name: "social-store", // unique name for the storage key
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

interface StoreState {
  stores: any[];
  setStores: (stores: any[]) => void;
  addStore: (store: any) => void;
  removeStore: (id: string) => void;
  clearStores: () => void;
  updateStore: (id: string, updatedStore: any) => void;
}

export const Store = {
  persist(
    (set) => ({
    logout: () =>
      set({
        user: null,
        campaigns: [],
        socials: [],
        stores: [],
        lastUpdated: {},
      }),
})
  )
}

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
