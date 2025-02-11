import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Typography, Button, Tooltip } from "@material-tailwind/react";
import { getTaskGroup } from "../api/TaskGroup/api";
import { getAllTasksFromGroup } from "../api/Task/api";
import DateFormatter from "../components/DateFormatter";
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

function TaskGroupPerId() {
  const { id } = useParams();

  const taskGroupFetch = useQuery({
    queryKey: ["taskGroup", id],
    queryFn: () => getTaskGroup(id),
  });
  console.log(taskGroupFetch.data?.data);

  const date = taskGroupFetch.data?.data.creation_date;
  const dateFr = DateFormatter(date);
  return (
    <section className="p-6">
      <div className="flex gap-2 items-center">
        <Typography variant="h3">{taskGroupFetch.data?.data.name}</Typography>
        <Tooltip color="blue" content="Edit">
          <PencilIcon className="w-6 h-6 text-primary-main" />
        </Tooltip>
        <Tooltip
          color="blue"
          content={taskGroupFetch.data?.data.is_public ? "Public" : "Private"}
        >
          {taskGroupFetch.data?.data.is_public ? (
            <EyeIcon className="w-6 h-6 text-primary-main" />
          ) : (
            <EyeSlashIcon className="w-6 h-6 text-primary-main" />
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
