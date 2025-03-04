import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Switch,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  Square3Stack3DIcon,
  LockClosedIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { logout } from "../../api/User/api";
import { useUser } from "../../contexts/UserContext";
import { useAccessToken } from "../../contexts/AccessTokenContext";
import { Link } from "react-router-dom";

function DrawerContent({ close }) {
  const { user, setUser } = useUser();
  const { setAccessToken } = useAccessToken();
  const [darkMode, setDarkMode] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(false);
      setAccessToken(false);
      toast.success("Logged out");
      window.location.replace("/");
      queryClient.clear();
      close();
    },
    onError: (error) => {
      toast.error("An error occurred");
    },
  });

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner color="blue" className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <IconButton className="rounded-full" size="lg" color="blue">
            {user.pseudo[0].toUpperCase()}
          </IconButton>
          <Typography variant="lead">{user.pseudo}</Typography>
        </div>
        <IconButton variant="text" onClick={close}>
          <XMarkIcon className="w-4 h-w-4 text-black" />
        </IconButton>
      </div>
      <hr className="mb-4 mt-3 w-10/12 place-self-center" />
      <List>
        <ListItem color="blue">
          <ListItemPrefix>
            <IdentificationIcon className="w-5 h-5" />
          </ListItemPrefix>
          Profil
        </ListItem>
        <ListItem
          color="blue"
          onClick={() => setDarkMode((prev) => !prev)}
          disabled={true}
        >
          <ListItemPrefix>
            <MoonIcon className="w-5 h-5" />
          </ListItemPrefix>
          Dark mode
          <ListItemSuffix>
            <Switch
              color="blue"
              checked={darkMode}
              onChange={(e) => {
                e.stopPropagation();
                setDarkMode((prev) => !prev);
              }}
            />
          </ListItemSuffix>
        </ListItem>
        <Link to={"/taskgroupslist"} onClick={close}>
          <ListItem color="blue">
            <ListItemPrefix>
              <Square3Stack3DIcon className="w-5 h-5" />
            </ListItemPrefix>
            Task group
          </ListItem>
        </Link>
        {user.role === "admin" && (
          <ListItem color="blue">
            <ListItemPrefix>
              <LockClosedIcon className="w-5 h-5" />
            </ListItemPrefix>
            Admin panel
          </ListItem>
        )}
        <ListItem color="blue">
          <ListItemPrefix>
            <Cog6ToothIcon className="w-5 h-5" />
          </ListItemPrefix>
          Manage account
        </ListItem>
        <hr className="my-2 w-10/12 place-self-center" />
        <ListItem
          onClick={() => mutate()}
          className="hover:bg-red-400 hover:text-white"
        >
          <ListItemPrefix>
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
          </ListItemPrefix>
          Logout
        </ListItem>
      </List>
    </div>
  );
}

export default DrawerContent;
