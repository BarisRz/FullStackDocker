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

function TaskGroupCard({ taskGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem>
        {taskGroup.name}
        <ListItemSuffix>
          <TrashIcon
            className="w-6 h-6"
            onClick={() => setOpen((prev) => !prev)}
          />
        </ListItemSuffix>
      </ListItem>
      <Dialog
        open={open}
        handler={() => setOpen((prev) => !prev)}
        className="pt-1 pl-1"
        size="xs"
      >
        <DialogHeader className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          This action is irreversible
        </DialogHeader>
        <DialogBody>
          By doing this, you will delete the task group and all the tasks
          inside, are you sure you want to do this?
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button color="black" onClick={() => setOpen((prev) => !prev)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => setOpen((prev) => !prev)}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default TaskGroupCard;
