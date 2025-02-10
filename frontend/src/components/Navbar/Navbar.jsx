import {
  Button,
  Typography,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import DrawerContent from "./DrawerContent";

function Navbar({ fetching }) {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className=" h-[60px] flex items-center px-4 justify-between border-b border-black/10 fixed w-full top-0 left-0 bg-primary-background z-50">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <img src="logo.svg" alt="logo of the website" className="h-8" />
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
          <p>{user && user.email}</p>
        </div>
        {!fetching &&
          (user ? (
            <IconButton
              color="blue"
              variant="gradient"
              onClick={() => setDrawerOpen(true)}
            >
              <UserIcon className="text-white w-6 h-6" />
            </IconButton>
          ) : (
            <Link to={"/signin"}>
              <Button
                color="blue"
                variant="gradient"
                className="flex gap-2 px-3 items-center"
              >
                <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                <p className="pr-2">Sign In</p>
              </Button>
            </Link>
          ))}
      </nav>
      {user && (
        <Drawer
          placement="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <DrawerContent close={() => setDrawerOpen(false)} />
        </Drawer>
      )}
    </>
  );
}

export default Navbar;
