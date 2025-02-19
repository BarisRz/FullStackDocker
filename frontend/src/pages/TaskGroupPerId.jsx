import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Spinner, Tooltip, Button } from "@material-tailwind/react";
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
import Card from "../components/TaskCard/Card";

function TaskGroupPerId() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const taskGroupFetchId = useQuery({
    queryKey: ["taskGroup", id],
    queryFn: () => getTaskGroup(id),
    retry: 1,
  });

  const taskGroupMutation = useMutation({
    mutationFn: (updatedTaskGroup) => updateTaskGroup(id, updatedTaskGroup),

    onMutate: async (variables) => {
      await queryClient.cancelQueries(["taskGroup", id]);

      const previousTaskGroup = queryClient.getQueryData(["taskGroup", id]);

      queryClient.setQueryData(["taskGroup", id], (oldData) => ({
        ...oldData,
        ...variables,
      }));

      return { previousTaskGroup };
    },

    onError: (err, _, context) => {
      console.error(err);
      if (context.previousTaskGroup) {
        queryClient.setQueryData(["taskGroup", id], context.previousTaskGroup);
      }
    },
  });

  const handleUpdate = () => {
    taskGroupMutation.mutate({
      ...taskGroupFetchId.data,
      is_public: !taskGroupFetchId.data.is_public ? 1 : 0,
    });
  };

  if (taskGroupFetchId.isLoading) {
    return (
      <section className="flex h-screen2 justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }

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

  return (
    <section className="mt-[100px] space-y-2">
      <Typography>{taskGroupFetchId.data.id}</Typography>
      <Typography>{taskGroupFetchId.data.user_id}</Typography>
      <Typography>{taskGroupFetchId.data.name}</Typography>
      <Typography>{taskGroupFetchId.data.is_public}</Typography>
      <Typography>{taskGroupFetchId.data.creation_date}</Typography>
      <Button onClick={handleUpdate}>Mutation</Button>
    </section>
  );
}
export default TaskGroupPerId;
