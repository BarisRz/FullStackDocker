import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useAccessToken } from "../contexts/AccessTokenContext";
import { useUser } from "../contexts/UserContext";
import { handleRefreshToken } from "../api/User/api";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

function App() {
  const { setAccessToken } = useAccessToken();
  const { setUser } = useUser();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: handleRefreshToken,
    retry: 0,
    staleTime: 14 * 60 * 1000, // 14 minutes
    refetchInterval: 14 * 60 * 1000, // Refetch toutes les 14 minutes
  });

  useEffect(() => {
    if (isSuccess) {
      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
    }
    if (isError) {
      console.log("Error while refreshing token");
      setUser(false);
      setAccessToken(false);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Navbar fetching={isLoading} />
      <main className="mt-[60px]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
