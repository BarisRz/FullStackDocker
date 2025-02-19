import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { deleteTaskGroup } from "../../api/TaskGroup/api";
import toast from "react-hot-toast";

function TaskGroupCard({ taskGroup }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteTaskGroupMutation = useMutation({
    mutationFn: (id) => deleteTaskGroup(id),
    onSuccess: () => {
      queryClient.setQueryData(["taskGroupsList"], (old) =>
        old.filter((element) => element.id !== taskGroup.id)
      );
      toast.success("Task group deleted");
    },
    onError: (error) => {
      toast.error("An error occurred");
      console.error(error.response.data.error);
    },
  });

  return (
    <>
      <Link to={`/taskgroups/${taskGroup.id}`} className="flex-1">
        <ListItem>{taskGroup.name}</ListItem>
      </Link>
      <ListItem
        className="w-[3.5%] h-11 flex items-center justify-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <TrashIcon className="w-6 h-6" />
      </ListItem>
      <Dialog
        open={open}
        handler={() => {
          setOpen((prev) => !prev);
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
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              setOpen((prev) => !prev);
              deleteTaskGroupMutation.mutate(taskGroup.id);
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
