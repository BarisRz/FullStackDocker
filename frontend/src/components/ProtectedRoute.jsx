import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
      <section className="flex h-screen2 justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }

  if (isError || accessToken === false) {
    return (
      <section className="flex flex-col h-screen2 justify-center items-center">
        <LockClosedIcon className="w-20 h-20 text-red-500" />
        <p className="mt-2">
          Your session has expired or you are not authorized to access this
          page.
        </p>
        <p className="mb-2">Please refresh the page or log in again.</p>
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
