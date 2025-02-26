export function getsocialNetwork(socialNetworkId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/socialNetworks/${socialNetworkId}`);
}