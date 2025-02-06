import {
  Button,
  Typography,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccessToken } from "../../contexts/AccessTokenContext";
import { useUser } from "../../contexts/UserContext";

function Navbar() {
  const { accessToken } = useAccessToken();
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <nav className=" h-[60px] flex items-center px-4 justify-between border-b border-black/10 fixed w-full top-0 left-0 bg-primary-background z-50">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <img src="logo.svg" alt="logo of the website" className="h-8" />
          </Link>
          <Link to={"/"}>
            <Typography variant="h3">Lorga</Typography>
          </Link>
          <div className="w-[1px] h-6 bg-black/20 mx-2" />
          <Link to={"/"}>
            <Typography variant="h6">Home</Typography>
          </Link>
          <Link to={"/about"}>
            <Typography variant="h6">About</Typography>
          </Link>
          <Link to={"/contact"}>
            <Typography variant="h6">Contact</Typography>
          </Link>
          <p className="text-ellipsis w-20 overflow-hidden whitespace-nowrap">
            {accessToken}
          </p>
          <p>{user && user.email}</p>
        </div>
        {user ? (
          <IconButton color="blue" onClick={() => setDrawerOpen(true)}>
            <UserIcon className="text-white w-6 h-6" />
          </IconButton>
        ) : (
          <Link to={"/signin"}>
            <Button color="blue">Sign In</Button>
          </Link>
        )}
      </nav>
      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="flex items-center justify-center h-full">Test</div>
      </Drawer>
    </>
  );
}

export default Navbar;
