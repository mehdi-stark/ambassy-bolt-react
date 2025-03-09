import axios from 'axios';

export function getAffiliateLink() {
    return axios.get(import.meta.env.VITE_API_SERVER + '/affiliate/');
}

export function createAffiliateLink(affiliateLink) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/affiliate/', affiliateLink);
}

export function updateAffiliateLink(affiliateLink) {
    return axios.put(import.meta.env.VITE_API_SERVER + '/affiliate/' + affiliateLink.id, affiliateLink);
}

export function deleteAffiliateLink(id) {
    return axios.delete(import.meta.env.VITE_API_SERVER + '/affiliate/' + id);
}

export function generateAffiliateLink(affiliateLink) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/affiliate/generate', affiliateLink);
}