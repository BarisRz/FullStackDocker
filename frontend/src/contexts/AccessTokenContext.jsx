import { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { protectedApi } from "../api/protectedApi";
import axios from "axios";

const AccessTokenContext = createContext(null);
export const useAccessToken = () => useContext(AccessTokenContext);

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Intercepteur des requêtes pour ajouter le token
    const requestInterceptor = protectedApi.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur des réponses pour gérer le refresh token
    const responseInterceptor = protectedApi.interceptors.response.use(
      (response) => response, // On renvoie la réponse si tout va bien
      async (error) => {
        const originalRequest = error.config;

        // Si c'est une erreur 403 et qu'on n'a pas encore essayé de refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true; // On marque la requête comme ayant déjà tenté un refresh

          try {
            setIsRefreshing(true);

            // Appel à /refreshtoken pour obtenir un nouveau accessToken
            const { data } = await axios.get(`${API_BASE_URL}/refresh`, {
              withCredentials: true, // Assure que les cookies sont bien envoyés
            });

            setAccessToken(data.accessToken); // Mise à jour du token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            return protectedApi(originalRequest); // Relance la requête d'origine avec le nouveau token
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            return Promise.reject(refreshError); // Si le refresh échoue, on rejette l'erreur
          } finally {
            setIsRefreshing(false);
          }
        }

        return Promise.reject(error); // Autres erreurs → on les gère normalement
      }
    );

    return () => {
      protectedApi.interceptors.request.eject(requestInterceptor);
      protectedApi.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  const value = useMemo(() => {
    return { accessToken, setAccessToken };
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
}

AccessTokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
