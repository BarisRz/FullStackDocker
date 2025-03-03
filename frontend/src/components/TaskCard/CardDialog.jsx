import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  Tooltip,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  Bars3BottomLeftIcon,
  DocumentIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  CalendarIcon,
  CalendarDateRangeIcon,
  PencilIcon,
  XMarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import DateFormatter from "../DateFormatter";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask, addTask } from "../../api/Task/api";
import toast from "react-hot-toast";

function CardDialog({ task, open, handler }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [taskCopy, setTaskCopy] = useState(task);
  const queryClient = useQueryClient();
  const date = DateFormatter(task.creation_date);

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => deleteTask(id),
    onMutate: async (id) => {
      const previousTaskGroupList = queryClient.getQueryData([
        "tasks-all",
        task.task_group_id,
      ]);
      const newTaskGroupList = previousTaskGroupList.filter(
        (element) => element.id !== id
      );
      queryClient.setQueryData(
        ["tasks-all", task.task_group_id],
        newTaskGroupList
      );
      return { previousTaskGroupList };
    },
    onSuccess: () => {
      toast.success("Task deleted");
    },
    onError: (err, _, context) => {
      toast.error("An error occurred");
      if (context.previousTaskGroupList) {
        queryClient.setQueryData(
          ["tasks-all", task.task_group_id],
          context.previousTaskGroupList
        );
      }
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, newTask }) => updateTask(taskId, newTask),
    onMutate: async ({ taskId, newTask }) => {
      await queryClient.cancelQueries(["tasks-all", task.task_group_id]);
      const previousTaskGroupList = queryClient.getQueryData([
        "tasks-all",
        task.task_group_id,
      ]);
      const newTaskGroupList = previousTaskGroupList.map((element) =>
        element.id == taskId ? { ...element, ...newTask } : element
      );
      console.log(newTaskGroupList);
      queryClient.setQueryData(
        ["tasks-all", task.task_group_id],
        newTaskGroupList
      );
      return { previousTaskGroupList };
    },
    onSuccess: () => {
      toast.success("Task updated");
    },
    onError: (err, _, context) => {
      toast.error("An error occurred");
      if (context.previousTaskGroupList) {
        queryClient.setQueryData(
          ["tasks-all", task.task_group_id],
          context.previousTaskGroupList
        );
      }
    },
  });

  const copyTaskMutation = useMutation({
    mutationFn: (taskCopy) => addTask(taskCopy),
    onSuccess: async (data) => {
      await queryClient.cancelQueries(["tasks-all", task.task_group_id]);
      const previousTaskGroupList = queryClient.getQueryData([
        "tasks-all",
        task.task_group_id,
      ]);
      const newTask = { ...taskCopy, id: data?.insertId };
      queryClient.setQueryData(
        ["tasks-all", task.task_group_id],
        [...previousTaskGroupList, newTask]
      );
      console.log(data?.insertId);
      toast.success("Task copied");
    },
    onError: () => {
      toast.error("Could not copy the task");
    },
  });

  const handleTitleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  const handleTitleChange = (e) => {
    setTaskCopy({ ...taskCopy, title: e.target.value });
  };

  const handleTitleBlur = () => {
    if (taskCopy.title.trim().length < 3) return;
    console.log(taskCopy.title);
    handleUpdateTask(taskCopy.title, "title");
    setIsInputOpen(false);
  };

  const handleUpdateTask = (value, key) => {
    const beforeChangeTask = task;
    const changedTask = { ...beforeChangeTask, [key]: value };
    updateTaskMutation.mutate({ taskId: task.id, newTask: changedTask });
  };

  const handleCopyTask = (e) => {
    const newTask = task;
    delete newTask.creation_date;
    copyTaskMutation.mutate(newTask);
    e.stopPropagation();
    handler();
  };

  const handleDoneTask = (e) => {
    const newTask = { ...task, status: "Done" };
    handleUpdateTask(newTask.status, "status");
    e.stopPropagation();
    handler();
  };

  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <DocumentIcon className="w-6 h-6 text-primary-main" />
          {isInputOpen ? (
            <input
              className="p-0 m-0 outline-none"
              value={taskCopy.title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              size={taskCopy.title || 1}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === "Escape") && handleTitleBlur()
              }
              maxLength={20}
              autoFocus
            ></input>
          ) : (
            <h4>{task.title}</h4>
          )}
          <PencilIcon
            className="w-5 h-5 text-primary-text cursor-pointer"
            onClick={handleTitleInput}
          />
          <Tooltip content={`Created the ${date}`} className="fixed z-[10000]">
            <CalendarIcon className="w-6 h-6 text-primary-main" />
          </Tooltip>
        </div>
        <div
          className="hover:bg-gray-200 cursor-pointer rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handler();
          }}
        >
          <XMarkIcon className="w-8 h-8" />
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="flex">
          <div className="flex gap-2 flex-col flex-[9]">
            <div className="flex gap-2">
              <Bars3BottomLeftIcon className="w-6 h-6 text-primary-main" />
              <Typography variant="h5" className="text-primary-text">
                Description
              </Typography>
            </div>
            <div className="pr-10">
              {task.content ? (
                <Typography variant="paragraph" className="text-primary-text">
                  {task.content}
                </Typography>
              ) : (
                <Typography variant="paragraph" className="text-primary-text">
                  No description
                </Typography>
              )}
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-2">
            {task.status !== "Done" && (
              <div
                className="card-button rounded-lg flex gap-1 p-1 pl-2 items-center bg-green-50 text-primary-text cursor-pointer font-semibold text-xs uppercase hover:shadow"
                onClick={handleDoneTask}
              >
                <CheckIcon className="w-6 h-6 text-primary-main" />
                Move to Done?
              </div>
            )}
            <Button className="card-button rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2 items-center">
              <CalendarDateRangeIcon className="w-6 h-6 text-primary-main" />
              Expiration
            </Button>
            <Button
              className="card-button rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2 items-center"
              onClick={handleCopyTask}
            >
              <DocumentDuplicateIcon className="w-6 h-6 text-primary-main" />
              Copy
            </Button>
            <Popover
              placement="bottom-end"
              open={isDeleteDialogOpen}
              handler={setIsDeleteDialogOpen}
              offset={10}
            >
              <PopoverHandler>
                <Button className="card-button rounded-lg bg-red-400/10 text-primary-text flex gap-1 p-1 pl-2 items-center">
                  <TrashIcon className="w-6 h-6 text-primary-main" />
                  Delete
                </Button>
              </PopoverHandler>
              <PopoverContent className="z-[10000] flex items-center gap-2">
                Are you sure you want to delete this task?
                <Button onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    setIsDeleteDialogOpen(false);
                    deleteTaskMutation.mutate(task.id);
                  }}
                >
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default CardDialog;
