import exp from "constants";
import axios from "axios";


export function getCampaign(campaignId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/global-campaigns/${campaignId}`);
}

export function getCampaignByUser(userId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/global-campaigns/user/${userId}`);
}

export function createCampaign(campaign) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/global-campaigns', campaign);
}

export function updateCampaign(campaignId, campaign) {
    return axios.put(import.meta.env.VITE_API_SERVER + `/global-campaigns/${campaignId}`, campaign);
}

export function deleteCampaign(campaignId) {
    return axios.delete(import.meta.env.VITE_API_SERVER + `/global-campaigns/${campaignId}`);
}

export function getCampaigns() {
    return axios.get(import.meta.env.VITE_API_SERVER + '/global-campaigns');
}

const GlobalCampaignsApi = {
    getCampaign,
    getCampaignByUser,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaigns
}

export default GlobalCampaignsApi