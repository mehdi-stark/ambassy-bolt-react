import axios from "axios";

// API calls for user

export function getUser(userId) {
    const response = axios.get(import.meta.env.VITE_API_SERVER + `/users?id=${userId}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error('Error fetching user', error);
        throw error;
    });
    return response;
}

export function getUserByClerkId(clerkId) {
    return axios.get(import.meta.env.VITE_API_SERVER + `/users?clerkId=${clerkId}`);
}

export function createUser(user) {
    return axios.post(import.meta.env.VITE_API_SERVER + '/users', user);
}

export function updateUser(userId, user) {
    return axios.put(import.meta.env.VITE_API_SERVER + `/users/${userId}`, user);
}

export function deleteUser(userId) {
    return axios.delete(import.meta.env.VITE_API_SERVER + `/users/${userId}`);
}

export function getUsers() {
    return axios.get(import.meta.env.VITE_API_SERVER + '/users');
}

export async function updateUserSubscription(userId, clerkId, subscription) {
    // const user = getUser(userId);
    const user = getUserByClerkId(userId);
    console.log('user from API ', user);
    if (!user) {
        return Promise.reject(new Error('User not found'));
    }
    let subscriptionFromUser = user.data.subscription;
    console.log('subscriptionFromUser', subscriptionFromUser);
    if (!subscriptionFromUser) {
        subscription = [];
    }

    return axios.put(import.meta.env.VITE_API_SERVER + `/users/${userId}`, { subscription });
}