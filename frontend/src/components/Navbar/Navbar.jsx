import {
  Button,
  Typography,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import {
  UserIcon,
  ArrowRightEndOnRectangleIcon,
  EllipsisHorizontalIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import DrawerContent from "./DrawerContent";
import logo from "../../assets/logo.svg";
import CV from "../../assets/CV.pdf";
import Github from "../../assets/github.svg";
import Linkedin from "../../assets/linkedin.svg";

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
            {user && (
              <Link to={"/taskgroupslist"}>
                <MenuItem color="blue">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="flex items-center text-sm font-bold"
                  >
                    Your work
                  </Typography>
                </MenuItem>
              </Link>
            )}
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
            {user && (
              <Link to={"/taskgroups"}>
                <Button color="blue" variant="gradient">
                  New
                </Button>
              </Link>
            )}
            <div>
              <MenuItem color="blue">
                <Menu allowHover offset={15}>
                  <MenuHandler>
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <a
                        href="https://github.com/BarisRz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <img
                          src={Github}
                          alt="Github Icon"
                          className="w-4 h-4"
                        />
                        Github
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="https://www.linkedin.com/in/gunay-baris/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <img
                          src={Linkedin}
                          alt="Linkedin Icon"
                          className="w-4 h-4"
                        />
                        Linkedin
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href={CV} download className="flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        CV
                      </a>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </MenuItem>
            </div>
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
