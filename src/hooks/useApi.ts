import axios, { AxiosInstance } from "axios";
import { refreshTokenFn } from "../services/api/auth";
import { ErrorName } from "../services/utils/BackendEnums";

export function useApi() {

    const headers = { 'Access-Control-Allow-Origin': '*' };

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
        // baseURL: "https://jsonplaceholder.typicode.com",
        //headers
    })

    api.interceptors.request.use((config: any) => {
        //Ajouter le Token dans le header: 
        //NB: ne pas ajouter le token pour sign in, sign up, mot de passe oublié
        const token = localStorage.getItem("accessToken");

        token ? config.headers['Authorization'] = "Bearer " + token : ''
        return config;
    })

    api.interceptors.response.use(

        (response: any) => response,

        async (error: any) => {
            if (error.response && error.response.status === 401 && error.response.data.name === ErrorName.JWT_TOKEN_EXPIRED) {
                const originalRequest = error.config;
                // pour éviter boucle infinie du refreshToken
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                }

                // Récupérer le RefreshToken dans le localstorage
                const refreshToken = localStorage.getItem('refreshToken');

                //retouner à la page d'accueil s'il n'y a pas de refreshToken
                if (refreshToken) {
                    try {
                        // Appeler la route /refreshToken
                        const result = await refreshTokenFn();

                        // stocker mon nouveau token et mon nouveau refreshtoken dans le local storage
                        localStorage.setItem('accessToken', result.token);
                        localStorage.setItem('refreshToken', result.refreshToken);
                        // Réajouter le nouveau Token dans le Header
                        originalRequest.headers['Authorization'] = 'Bearer ' + result.token;
                        // On rappelle la requête originelle
                        return axios(originalRequest);
                    } catch (error) {
                        location.href = "/";
                    }

                } else {
                    location.href = "/";
                }
            }

            if (error.response && error.response.status === 500) {

            }

            return Promise.reject(error)
        }
    )

    return api;
}