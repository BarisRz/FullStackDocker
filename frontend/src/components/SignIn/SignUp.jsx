import { useState } from "react";
import { Input, Typography, Button, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../../components/emailRegex";
import { signUp } from "../../api/SignIn/api";
import { toast } from "react-hot-toast";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success("Email Sent!");
    },
    onError: (error) => {
      if (error.response.status !== 201) {
        toast.error("An error occurred");
      }
      setError(error.response.status);
    },
  });

  const isEmailValid = verifyEmail(email);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 4 || password.length < 8 || !isEmailValid) {
      if (username.length < 4) {
        setUsernameError(true);
      }
      if (password.length < 8) {
        setPasswordError(true);
      }
      if (!isEmailValid) {
        setEmailError(true);
      }
      return;
    }

    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);

    mutate({ pseudo: username, email, password });
  };

  if (isPending) {
    return (
      <div className="flex w-full h-96 justify-center items-center">
        <Spinner color="blue" className="h-10 w-10" />
        <Typography className="pl-1">Loading...</Typography>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col w-full h-96 justify-center items-center gap-2">
        <InboxIcon className="h-10 w-10 text-blue-700" />
        <Typography className="pl-1 text-center">
          A verification email has been sent to{" "}
          <span className="text-black">{email}</span>. Please check your inbox
          and follow the instructions to verify your email address.
        </Typography>
      </div>
    );
  }

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Typography variant="h6" className="self-center">
        Create your account
      </Typography>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Username"
          type="text"
          size="lg"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          icon={<UserIcon className="text-blue-700" />}
          error={usernameError && username.length < 4}
        />
        {usernameError && username.length < 4 && (
          <Typography color="red" variant="small" className="pl-1">
            Username must be at least <span className="font-black">4</span>{" "}
            characters long
          </Typography>
        )}
      </div>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Email"
          type="email"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<EnvelopeIcon className="text-blue-700" />}
          error={emailError && !isEmailValid}
        />
        {emailError && !isEmailValid && (
          <Typography color="red" variant="small" className="pl-1">
            Please enter a valid email address
          </Typography>
        )}
      </div>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Password"
          type="password"
          size="lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<KeyIcon className="text-blue-700" />}
          error={passwordError && password.length < 8}
        />
        {passwordError && password.length < 8 && (
          <Typography color="red" variant="small" className="pl-1">
            Password must be at least <span className="font-black">8</span>{" "}
            characters long
          </Typography>
        )}
        {password.length < 8 && !passwordError && (
          <Typography variant="small" className="pl-1">
            Password must be at least <span className="font-black">8</span>{" "}
            characters long
          </Typography>
        )}
      </div>
      <Button type="submit" color="blue">
        Sign Up
      </Button>
      <Typography className="text-xs">
        By signing up, you agree to our terms conditions and privacy policy.{" "}
        <Link to={"/about"} className="text-primary-main">
          Here
        </Link>
      </Typography>
    </form>
  );
}

export default SignUp;
