import { useState } from "react";
import {
  ListItem,
  ListItemSuffix,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function TaskGroupCard({ taskGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link to={`/taskgroups/${taskGroup.id}`} className="flex-1">
        <ListItem>{taskGroup.name}</ListItem>
      </Link>
      <ListItem
        className="w-[3.5%] h-11"
        onClick={() => setOpen((prev) => !prev)}
      >
        <TrashIcon className="w-6 h-6" />
      </ListItem>
      <Dialog
        open={open}
        handler={(e) => {
          setOpen((prev) => !prev);
          e.preventDefault();
          e.stopPropagation();
        }}
        className="pt-1 pl-1"
        size="xs"
      >
        <DialogHeader className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          This action is irreversible
        </DialogHeader>
        <DialogBody>
          By doing this, you will delete the task group :{" "}
          <span className="font-bold text-black">{taskGroup.name}</span> and all
          the tasks inside, are you sure you want to do this?
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            color="black"
            onClick={(e) => {
              setOpen((prev) => !prev);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={(e) => {
              setOpen((prev) => !prev);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default TaskGroupCard;
