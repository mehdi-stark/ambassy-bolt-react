// filepath: /Users/mehdi/code/ambassy-bolt-react/src/api/socialNetwork.ts
import axios, { AxiosResponse } from "axios";

export function getsocialNetwork(socialNetworkId: string): Promise<AxiosResponse<any>> {
  return axios.get(`${import.meta.env.VITE_API_SERVER}/social/${socialNetworkId}`);
}

export function createSocialNetwork(socialNetwork: { socialUrl: string, ambassadorId: any, platform: string }): Promise<AxiosResponse<any>> {
  return axios.post(`${import.meta.env.VITE_API_SERVER}/social/create`, socialNetwork);
}