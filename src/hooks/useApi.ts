import axios, { AxiosInstance } from "axios";

export function useApi() {

    const headers = { 'Access-Control-Allow-Origin': '*' };

    const api: AxiosInstance = axios.create({
        // baseURL: import.meta.env.VITE_API_BASE_URL_PROD,
        baseURL: "http://localhost:3000/",
        headers
    })

    api.interceptors.request.use((config:any) => {
        //Ajouter le Token dans le header: 
        //NB: ne pas ajouter le token pour sign in, sign up, mot de passe oublié
        /*
            const token = localStorage.getItem("accessToken");
            token ? config.headers['Authorization'] = "Bearer " + token : ''
        */
        return config;
    })

    api.interceptors.response.use(

        (response:any) => response,

        async (error:any) => {

            if(error.response && error.response.status === 401) { 
                // Récupérer le RefreshToken dans le localstorage
                // On va l'ajouter dans le Header
                // On appelle le point d'API refreshToken
                // stocker mon nouveau token et mon nouveau refreshtoken dans le local storage
                // Réajouter le nouveau Token dans le Header
                // On rappelle la requête originelle
            }

            if(error.response && error.response.status === 500) {
                
            }
            
            return Promise.reject(error)
        }
    )

    return api;
}