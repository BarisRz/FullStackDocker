import { Input, Typography, Button } from "@material-tailwind/react";
import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAccessToken } from "../../contexts/AccessTokenContext";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/SignIn/api";
import { toast } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const { setAccessToken } = useAccessToken();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate("/");
      toast.success("Logged in");
    },
    onError: (error) => {
      toast.error("An error occurred");
      if (error.response.status === 500) {
        console.error("Server error");
      }
      setError(error.response.status);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.length < 4 || password.length < 8) {
      if (username.length < 4) {
        setUsernameError(true);
      }
      if (password.length < 8) {
        setPasswordError(true);
      }
      return;
    }
    setUsernameError(false);
    setPasswordError(false);

    mutate({ pseudo: username, password });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Typography variant="h6" className="self-center">
        Welcome back
      </Typography>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Username"
          type="text"
          size="lg"
          icon={<UserIcon className="text-blue-700" />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          {...((usernameError || error) && {
            error: username.length < 4 || error === 400,
          })}
          disabled={isPending}
        />
        {usernameError && username.length < 4 && (
          <Typography color="red" variant="small" className="pl-1">
            Username must be at least <span className="font-black">4</span>{" "}
            characters long
          </Typography>
        )}
        {error && error === 400 && (
          <Typography color="red" variant="small" className="pl-1">
            User not found
          </Typography>
        )}
      </div>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Password"
          type="password"
          size="lg"
          icon={<KeyIcon className="text-blue-700" />}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          {...((passwordError || error) && {
            error: password.length < 8 || error === 401,
          })}
          disabled={isPending}
        />
        {passwordError && password.length < 8 && (
          <Typography color="red" variant="small" className="pl-1">
            Password must be at least <span className="font-black">8</span>{" "}
            characters long
          </Typography>
        )}
        {error && error === 401 && (
          <Typography color="red" variant="small" className="pl-1">
            Incorrect password
          </Typography>
        )}
      </div>
      <Button
        type="submit"
        color="blue"
        loading={isPending}
        className="place-content-center"
      >
        {isPending ? "Loading" : "Login"}
      </Button>
      <Typography variant="small" className="pl-1">
        Forgot Password? Click{" "}
        <Link to={"/forgot-password"} className="text-primary-main">
          Here
        </Link>
      </Typography>
    </form>
  );
}

export default Login;
