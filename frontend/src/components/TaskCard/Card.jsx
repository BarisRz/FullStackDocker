import { Card as C } from "@material-tailwind/react";
import { Typography, Tooltip } from "@material-tailwind/react";
import {
  PencilSquareIcon,
  CalendarIcon,
  FireIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import DateFormatter from "../DateFormatter";

function Card({ task }) {
  console.log(task);
  const creation_date = DateFormatter(task.creation_date);
  const expiration_date = DateFormatter(task.expiration_date);
  return (
    <C
      className="rounded-xl p-2 bg-primary-background space-y-2 cursor-grab active:cursor-grabbing"
      draggable="true"
    >
      <Typography variant="h5">{task.title}</Typography>
      <div className="flex justify-between">
        <Tooltip content={`${task.priority} priority`}>
          <FireIcon
            className={`w-6 h-6 ${
              task.priority === "Low" && "text-primary-main"
            } ${task.priority === "Medium" && "text-orange-500"} ${
              task.priority === "High" && "text-red-500"
            }`}
          />
        </Tooltip>
        <div className="flex items-center gap-1">
          <Tooltip content={`Created the ${creation_date}`}>
            <ClockIcon className="w-6 h-6 text-primary-main" />
          </Tooltip>
          {task.expiration_date && (
            <Tooltip content={`Expire the ${expiration_date}`}>
              <CalendarIcon className="w-6 h-6 text-primary-main" />
            </Tooltip>
          )}
        </div>
      </div>
    </C>
  );
}

export default Card;
