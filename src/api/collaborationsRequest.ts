import axios, { AxiosResponse } from 'axios';

// export function updateCollaborationStatus(collabId, status) {
//     return axios.put(import.meta.env.VITE_)
// }

export function updateCollaborationStatus(collabId: string, status: string): Promise<AxiosResponse<any>> {
    return axios.put(`${import.meta.env.VITE_API_SERVER}/collaboration-requests/${collabId}/${status}`);
}

const CollaborationApi = {
    updateCollaborationStatus
}

export default CollaborationApi;