import { NoSymbolIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="h-screen2 flex items-center justify-center flex-col gap-4">
      <div className="flex flex-col items-center">
        <NoSymbolIcon className="h-20 w-20 text-red-500" />
        <h1 className="text-4xl font-bold text-center">
          404 : <span className="font-medium">Page not found</span>
        </h1>
      </div>
      <Link to="/">
        <Button color="red">Go back to Home</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
