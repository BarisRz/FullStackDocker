import {
  Button,
  Typography,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  MenuHandler,
} from "@material-tailwind/react";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import DrawerContent from "./DrawerContent";
import logo from "../../assets/logo.svg";

function Navbar({ fetching }) {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className=" h-[60px] flex items-center px-4 justify-between border-b border-black/10 fixed w-full top-0 left-0 bg-primary-background z-50">
        <div className="w-[1400px] flex justify-between mx-auto">
          <div className="flex items-center gap-2">
            <Link to={"/"}>
              <img src={logo} alt="logo of the website" className="h-8" />
            </Link>
            <div className="w-[1px] h-6 bg-black/20 mx-2" />
            <Link to={"/"}>
              <MenuItem color="blue">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold"
                >
                  Home
                </Typography>
              </MenuItem>
            </Link>
            <Link to={"/about"}>
              <MenuItem color="blue">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold"
                >
                  About
                </Typography>
              </MenuItem>
            </Link>
            <Link to={"/contact"}>
              <MenuItem color="blue">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex items-center text-sm font-bold"
                >
                  Contact
                </Typography>
              </MenuItem>
            </Link>
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
        </div>
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
