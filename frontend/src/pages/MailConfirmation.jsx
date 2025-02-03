import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { emailConfirmation } from "../api/SignIn/api";
import {
  Spinner,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function MailConfirmation() {
  const [query] = useSearchParams();
  const token = query.get("token");

  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailConfirmation", token],
    queryFn: () => emailConfirmation(token),
  });

  if (isPending) {
    return (
      <section className="flex h-screen justify-center items-center">
        <Card className="mt-6 w-72 shadow-lg">
          <CardBody className="flex flex-col items-center gap-4">
            <Spinner color="blue" className="w-10 h-10" />
            <Typography variant="h6" className="font-medium text-gray-700">
              Loading...
            </Typography>
          </CardBody>
        </Card>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex h-screen justify-center items-center">
        <Card className="mt-6 w-72 shadow-lg">
          <CardBody className="flex flex-col items-center gap-4">
            <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
            <Typography
              variant="h6"
              className="font-medium text-gray-700 text-center"
            >
              Wrong or expired link. We couldn't confirm your email.
            </Typography>
          </CardBody>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex h-screen justify-center items-center">
      <Card className="mt-6 w-72 shadow-lg">
        <CardBody>
          <Typography variant="h5" color="blue" className="mb-2 font-semibold">
            Email Verified Successfully!
          </Typography>
          <Typography className="text-gray-700">
            Your email has been successfully verified. You now have full access
            to all the features of our platform.
          </Typography>
        </CardBody>
        <CardFooter className="pt-4">
          <Button color="blue" className="w-full">
            <Link to="/signin" className="text-white">
              Proceed to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default MailConfirmation;
