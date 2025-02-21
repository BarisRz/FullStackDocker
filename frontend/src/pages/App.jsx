import { useEffect } from "react";
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
  }, [isSuccess, isError, data]);

  return (
    <>
      <Navbar fetching={isLoading} />
      <main className="mt-[60px] max-w-[1400px] mx-auto">
        {isLoading ? (
          <section className="flex h-screen2 justify-center items-center">
            <Spinner color="blue" className="w-12 h-12" />
          </section>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}

export default App;
