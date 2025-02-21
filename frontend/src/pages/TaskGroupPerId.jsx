import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Spinner, Tooltip } from "@material-tailwind/react";
import { getTaskGroup, updateTaskGroup } from "../api/TaskGroup/api";
import { getAllTasksFromGroup } from "../api/Task/api";
import DateFormatter from "../components/DateFormatter";
import DeleteComponent from "../components/TaskGroup/DeleteComponent";
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  PencilIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Column from "../components/TaskGroup/Column/Column";

function TaskGroupPerId() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Query to get the task group
  const taskGroupFetchId = useQuery({
    queryKey: ["taskGroup", id],
    queryFn: () => getTaskGroup(id),
    retry: 1,
  });

  const allTasksFetch = useQuery({
    queryKey: ["tasks-all", id],
    queryFn: () => getAllTasksFromGroup(id),
  });

  // Mutation to update the task group
  const taskGroupMutation = useMutation({
    mutationFn: (updatedTaskGroup) => updateTaskGroup(id, updatedTaskGroup),

    // Optimistic update
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["taskGroup", id]);

      const previousTaskGroup = queryClient.getQueryData(["taskGroup", id]);

      queryClient.setQueryData(["taskGroup", id], (oldData) => ({
        ...oldData,
        ...variables,
      }));

      return { previousTaskGroup };
    },

    // Canceling the optimistic update
    onError: (err, _, context) => {
      console.error(err);
      if (context.previousTaskGroup) {
        queryClient.setQueryData(["taskGroup", id], context.previousTaskGroup);
      }
    },
  });

  // function to handle the update of the task group
  const handleUpdate = (changedKey, value) => {
    queryClient.setQueryData(["taskGroup", id], (oldData) => ({
      ...oldData,
      [changedKey]: value,
    }));
    if (changedKey === "name" && value.trim().length < 3) return;
    taskGroupMutation.mutate({ ...taskGroupFetchId.data, [changedKey]: value });
  };

  // function to handle the input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // function to force the input to stay open if inputValue is less than 3
  const handleBlur = () => {
    if (inputValue.trim().length >= 3) {
      handleUpdate("name", inputValue);
      setIsInputOpen(false); // Fermer l'input seulement si valide
    }
  };

  // function to set the inputValue to the fetched one
  const handleEditClick = () => {
    setInputValue(taskGroupFetchId.data.name);
    setIsInputOpen(true);
  };

  // handling when the data is loading
  if (taskGroupFetchId.isLoading) {
    return (
      <section className="flex h-screen2 justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }

  // handling when the data is not found
  if (taskGroupFetchId.isError) {
    return (
      <section className="flex h-screen2 flex-col justify-center items-center text-center gap-4">
        <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
        <Typography variant="h5" color="red">
          Task Group not found
        </Typography>
        <Typography variant="paragraph" color="gray">
          The requested Task Group does not exist or the link may be incorrect.
        </Typography>
        <Typography variant="small" color="gray">
          (if the issue persists, contact the administrator)
        </Typography>
      </section>
    );
  }

  // Date formatting
  const date = taskGroupFetchId.data.creation_date;
  const dateFr = DateFormatter(date);

  if (allTasksFetch.isLoading) {
    return (
      <section className="flex h-screen2 justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }

  console.log(
    queryClient
      .getQueryData(["tasks-all", id])
      .filter((element) => element.status === "Todo")
  );

  return (
    <section className="mt-[100px] space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isInputOpen ? (
            <input
              type="text"
              size={inputValue.length || 1}
              className="text-4xl focus:outline-none rounded-lg bg-primary-background font-bold p-0 m-0 w-auto"
              autoFocus
              value={inputValue}
              onBlur={handleBlur}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleBlur()}
            />
          ) : (
            <Typography variant="h2">{taskGroupFetchId.data.name}</Typography>
          )}
          <Tooltip content="Edit">
            <PencilIcon
              className="w-6 h-6 cursor-pointer text-primary-main"
              onClick={handleEditClick}
            />
          </Tooltip>
          <Tooltip
            content={taskGroupFetchId.data.is_public ? "Public" : "Private"}
          >
            {taskGroupFetchId.data.is_public ? (
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
          <Tooltip content={`Created the ${dateFr}`}>
            <CalendarIcon className="w-6 h-6 text-primary-main" />
          </Tooltip>
        </div>
        <DeleteComponent
          task={{
            name: taskGroupFetchId.data.name,
            id: taskGroupFetchId.data.id,
          }}
        />
      </div>
      <div className="flex gap-4">
        <Column
          tasklist={allTasksFetch.data.filter(
            (element) => element.status === "Todo"
          )}
        />
        <Column
          tasklist={allTasksFetch.data.filter(
            (element) => element.status === "In progress"
          )}
        />
        <Column
          tasklist={allTasksFetch.data.filter(
            (element) => element.status === "Done"
          )}
        />
      </div>
    </section>
  );
}
export default TaskGroupPerId;
