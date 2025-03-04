import { useState } from "react";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { deleteTaskGroup } from "../../api/TaskGroup/api";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DeleteComponent({ task }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deleteTaskGroupMutation = useMutation({
    mutationFn: (id) => deleteTaskGroup(id),
    onSuccess: () => {
      toast.success("Task group deleted");
      setOpen((prev) => !prev);
      navigate("/taskgroupslist");
    },
    onError: (error) => {
      toast.error("An error occurred");
    },
  });
  return (
    <>
      <Tooltip content="Delete task group">
        <Button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="bg-gray-300 p-2 hover:bg-gray-400 group"
        >
          <TrashIcon className="w-6 h-6 cursor-pointer text-black group-hover:text-red-500 transition-colors" />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        handler={() => {
          setOpen((prev) => !prev);
        }}
        className="pt-1 pl-1"
        size="xs"
      >
        {deleteTaskGroupMutation.isPending ? (
          <div className="flex justify-center items-center w-full h-[200px]">
            <Spinner color="blue" className="w-12 h-12" />
          </div>
        ) : (
          <>
            <DialogHeader className="flex items-center gap-2">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
              This action is irreversible
            </DialogHeader>
            <DialogBody>
              By doing this, you will delete the task group :{" "}
              <span className="font-bold text-black">{task.name}</span> and all
              the tasks inside, are you sure you want to do this?
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                color="gray"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
                disabled={deleteTaskGroupMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  deleteTaskGroupMutation.mutate(task.id);
                }}
                disabled={deleteTaskGroupMutation.isPending}
              >
                Delete
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
}

export default DeleteComponent;
