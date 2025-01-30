import { Input, Typography, Button } from "@material-tailwind/react";
import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
    // Effectuer une action, comme un fetch
    console.log("Form submitted");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Typography variant="h6">Welcome back!</Typography>
      <div className="space-y-2">
        <Input
          color="blue"
          label="Username"
          type="text"
          size="lg"
          icon={<UserIcon className="text-blue-700" />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          {...(usernameError && {
            error: username.length < 4,
          })}
        />
        {usernameError && username.length < 4 && (
          <Typography color="red" variant="small">
            Username must be at least <span className="font-black">4</span>{" "}
            characters long
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
          {...(passwordError && {
            error: password.length < 8,
          })}
        />
        {passwordError && password.length < 8 && (
          <Typography color="red" variant="small">
            Password must be at least <span className="font-black">8</span>{" "}
            characters long
          </Typography>
        )}
      </div>
      <Button type="submit" color="blue">
        Submit
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
