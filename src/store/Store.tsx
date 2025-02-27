import { create } from "zustand";

interface UserState {
  user: any | null;
  collaborationRequests: any[];
  setUser: (user: any) => void;
  setCollaborationRequests: (requests: any[]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  collaborationRequests: [],
  setUser: (user) => set({ user }),
  setCollaborationRequests: (requests) =>
    set({ collaborationRequests: requests }),
  clearUser: () => set({ user: null, collaborationRequests: [] }),
}));

interface BusinessState {
  businessStores: any[];
  setBusinessStores: (stores: any[]) => void;
  addBusinessStore: (store: any) => void;
  removeBusinessStore: (id: string) => void;
}

export const useBusinessStores = create<BusinessState>((set) => ({
  businessStores: [],
  setBusinessStores: (stores) => set({ businessStores: stores }),
  addBusinessStore: (store) =>
    set((state) => ({
      businessStores: [...state.businessStores, store],
    })),
  removeBusinessStore: (id) =>
    set((state) => ({
      businessStores: state.businessStores.filter((store) => store.id !== id),
    })),
}));

interface CampaignState {
  campaigns: any[];
  socials: any[];
  stores: any[];
  lastUpdated: Record<string, number>;
  setUser: (user: any) => void;
  fetchData: (key: string, apiCall: () => Promise<any>) => void;
  refreshData: (key: string, apiCall: () => Promise<any>) => void;
  logout: () => void;
}

export const campaignStore = create<CampaignState>((set) => ({
  user: null,
  campaigns: [],
  socials: [],
  stores: [],
  lastUpdated: {},

  setUser: (user) => set({ user }),

  fetchData: async (key, apiCall) => {
    const lastUpdated = get().lastUpdated[key];
    const isExpired =
      !lastUpdated || Date.now() - lastUpdated > 2 * 60 * 60 * 1000;

    if (isExpired) {
      const data = await apiCall();
      set((state) => ({
        [key]: data,
        lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
      }));
    }
  },

  refreshData: async (key, apiCall) => {
    const data = await apiCall();
    set((state) => ({
      [key]: data,
      lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
    }));
  },

  logout: () =>
    set({
      user: null,
      campaigns: [],
      socials: [],
      stores: [],
      lastUpdated: {},
    }),
}));

const useStore = create((set, get) => ({
  user: null,
  campaigns: [],
  socials: [],
  stores: [],
  lastUpdated: {},

  setUser: (user) => set({ user }),

  fetchData: async (key, apiCall) => {
    const lastUpdated = get().lastUpdated[key];
    const isExpired =
      !lastUpdated || Date.now() - lastUpdated > 2 * 60 * 60 * 1000;

    if (isExpired) {
      const data = await apiCall();
      set((state) => ({
        [key]: data,
        lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
      }));
    }
  },

  refreshData: async (key, apiCall) => {
    const data = await apiCall();
    set((state) => ({
      [key]: data,
      lastUpdated: { ...state.lastUpdated, [key]: Date.now() },
    }));
  },

  logout: () =>
    set({
      user: null,
      campaigns: [],
      socials: [],
      stores: [],
      lastUpdated: {},
    }),
}));

export default useStore;
