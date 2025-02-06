import {
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Switch,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  Square3Stack3DIcon,
  LockClosedIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "../../contexts/UserContext";

function DrawerContent({ close }) {
  const { user } = useUser();
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
        <ListItem color="blue">
          <ListItemPrefix>
            <MoonIcon className="w-5 h-5" />
          </ListItemPrefix>
          Dark mode
          <ListItemSuffix>
            <Switch color="blue" />
          </ListItemSuffix>
        </ListItem>
        <ListItem color="blue">
          <ListItemPrefix>
            <Square3Stack3DIcon className="w-5 h-5" />
          </ListItemPrefix>
          Task group
        </ListItem>
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
        <ListItem color="blue">
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
