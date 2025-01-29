import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const AccessTokenContext = createContext(null);
export const useAccessToken = () => useContext(AccessTokenContext);

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(false);

  const value = useMemo(() => {
    return { accessToken, setAccessToken };
  }, [accessToken, setAccessToken]);

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
}

AccessTokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
