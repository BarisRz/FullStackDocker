import { Outlet, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Button } from "@material-tailwind/react";
import { protectedRoute } from "../api/User/api";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAccessToken } from "../contexts/AccessTokenContext";

function ProtectedRoute() {
  const { accessToken } = useAccessToken();

  const { isFetching, isError, isSuccess } = useQuery({
    queryKey: ["protectedRoute"],
    queryFn: () => protectedRoute(accessToken),
    retry: 0,
    enabled: !!accessToken,
  });

  if (isFetching) {
    return (
      <section className="flex h-screen justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }
  if (isError) {
    return (
      <section className="flex flex-col h-screen justify-center items-center gap-4">
        <LockClosedIcon className="w-20 h-20 text-red-500" />
        <p>You are not authorized to access this page. You must be logged</p>
        <Link to={"/signin"}>
          <Button color="blue">Go to login page</Button>
        </Link>
      </section>
    );
  }
  if (isSuccess) {
    return <Outlet />;
  }
}

export default ProtectedRoute;
