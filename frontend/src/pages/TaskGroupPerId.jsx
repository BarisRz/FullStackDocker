import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Spinner, Tooltip } from "@material-tailwind/react";
import { getTaskGroup, updateTaskGroup } from "../api/TaskGroup/api";
import { getAllTasksFromGroup } from "../api/Task/api";
import DateFormatter from "../components/DateFormatter";
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  PencilIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

function TaskGroupPerId() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [taskGroup, setTaskGroup] = useState({});
  const [inputTitle, setInputTitle] = useState(false);

  const taskGroupFetch = useQuery({
    queryKey: ["taskGroup", id],
    queryFn: () => getTaskGroup(id),
    retry: 0,
  });

  useEffect(() => {
    if (taskGroupFetch.data) {
      setTaskGroup(taskGroupFetch.data.data);
    }
  }, [taskGroupFetch.data]); // ✅ Réagit uniquement aux changements de `data`

  const updateTaskGroupMutation = useMutation({
    mutationFn: (taskGroup) => updateTaskGroup(id, taskGroup),
    onSuccess: () => {
      // queryClient.invalidateQueries(["taskGroup", id]);
      toast.success("Task Group updated");
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  console.log(taskGroup);
  console.log(inputTitle);

  const handleUpdate = (changedKey, value) => {
    const updatedTaskGroup = { ...taskGroup, [changedKey]: value };

    if (updatedTaskGroup.name.trim() === "") return; // ✅ Vérifie après mise à jour locale

    setTaskGroup(updatedTaskGroup);
    updateTaskGroupMutation.mutate(updatedTaskGroup);
  };

  const date = taskGroupFetch.data?.data.creation_date;
  const dateFr = DateFormatter(date);

  if (taskGroupFetch.isLoading) {
    return (
      <section className="flex h-screen justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }
  if (taskGroupFetch.isError) {
    return (
      <section className="flex h-screen justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
          <Typography variant="h5">Not found.</Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="flex gap-2 items-center">
        {inputTitle ? (
          <input
            type="text"
            name="TaskGroupTitle"
            className="p-2 text-xl focus:outline-none border border-primary-main rounded-lg"
            autoFocus
            value={taskGroup?.name}
            onChange={(e) =>
              setTaskGroup({ ...taskGroup, name: e.target.value })
            }
            onBlur={() => {
              handleUpdate("name", taskGroup?.name);
              setInputTitle(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          />
        ) : (
          <Typography variant="h3">{taskGroup?.name}</Typography>
        )}
        <Tooltip color="blue" content="Edit">
          <PencilIcon
            className="w-6 h-6 text-primary-main cursor-pointer"
            onClick={() => setInputTitle((prev) => !prev)}
          />
        </Tooltip>
        <Tooltip
          color="blue"
          content={taskGroup?.is_public ? "Public" : "Private"}
        >
          {taskGroup?.is_public ? (
            <EyeIcon
              className="w-6 h-6 text-primary-main cursor-pointer"
              onClick={() => handleUpdate("is_public", 0)}
            />
          ) : (
            <EyeSlashIcon
              className="w-6 h-6 text-primary-main cursor-pointer"
              onClick={() => handleUpdate("is_public", 1)}
            />
          )}
        </Tooltip>
        <Tooltip color="blue" content={`Created the ${dateFr}`}>
          <CalendarIcon className="w-6 h-6 text-primary-main" />
        </Tooltip>
      </div>
      <div className="flex">
        <div className="task-colmun bg-red-100">1</div>
        <div className="task-colmun bg-red-200">2</div>
        <div className="task-colmun bg-red-300">3</div>
      </div>
    </section>
  );
}

export default TaskGroupPerId;
