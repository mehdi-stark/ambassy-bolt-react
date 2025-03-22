import exp from "constants";
import axios from "axios";


export function getCampaign(campaignId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/campaigns/${campaignId}`);
}

export function getCampaignByUser(userId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/campaigns/user/${userId}`);
}

export function createCampaign(campaign) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/campaigns', campaign);
}

export function updateCampaign(campaignId, campaign) {
    return axios.put(import.meta.env.VITE_API_SERVER + `/campaigns/${campaignId}`, campaign);
}

export function deleteCampaign(campaignId) {
    return axios.delete(import.meta.env.VITE_API_SERVER + `/campaigns/${campaignId}`);
}

export function getCampaigns() {
    return axios.get(import.meta.env.VITE_API_SERVER + '/campaigns');
}

const CampaignsApi = {
    getCampaign,
    getCampaignByUser,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaigns
}

export default CampaignsApi 