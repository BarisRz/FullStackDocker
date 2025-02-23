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
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import {
  TrashIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { deleteTaskGroup } from "../../api/TaskGroup/api";
import toast from "react-hot-toast";
import DateFormatter from "../DateFormatter";

function TaskGroupCard({ taskGroup }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const date = taskGroup.creation_date;
  const dateFr = DateFormatter(date);

  const deleteTaskGroupMutation = useMutation({
    mutationFn: (id) => deleteTaskGroup(id),
    onSuccess: () => {
      queryClient.setQueryData(["taskGroupsList"], (old) =>
        old.filter((element) => element.id !== taskGroup.id)
      );
      queryClient.removeQueries(["taskGroup"], taskGroup.id);
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
        <ListItem className="bg-primary-main/10 hover:bg-primary-main/25">
          <Typography variant="h5">{taskGroup.name}</Typography>
          <ListItemSuffix className="flex gap-2 items-center">
            <Tooltip content="Visibility">
              {taskGroup.is_public ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </Tooltip>
            <hr className="w-px h-5 bg-gray-400" />
            <Tooltip content="Creation date">
              <Typography variant="paragraph" className="w-[140px]">
                {dateFr}
              </Typography>
            </Tooltip>
          </ListItemSuffix>
        </ListItem>
      </Link>
      <ListItem
        className="w-[49px] h-[51.5px] flex items-center justify-center bg-red-100 hover:bg-red-300"
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
            color="gray"
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
