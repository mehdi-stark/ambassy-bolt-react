export function getBusinessStore(businessStoreId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/business?id=${businessStoreId}`);
}

export function getBusinessStoreByUserId(userId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/business?userId=${userId}`);
}

export function getBusinessStoreByClerkId(clerkId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/business?clerkId=${clerkId}`);
}

export function createBusinessStore(businessStore) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/business/create', businessStore);
}