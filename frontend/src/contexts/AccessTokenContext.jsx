import { createContext, useState, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { protectedApi } from "../api/protectedApi";

const AccessTokenContext = createContext(null);
export const useAccessToken = () => useContext(AccessTokenContext);

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Ajouter l’interceptor pour modifier les requêtes avant l’envoi
    const requestInterceptor = protectedApi.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Nettoyage de l’interceptor quand le contexte est démonté
    return () => {
      protectedApi.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]); // Se met à jour lorsque le token change

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
