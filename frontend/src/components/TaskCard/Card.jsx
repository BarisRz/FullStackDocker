import { useState } from "react";
import { Typography, Tooltip, Dialog } from "@material-tailwind/react";
import {
  PencilSquareIcon,
  CalendarIcon,
  FireIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import DateFormatter from "../DateFormatter";
import CardDialog from "./CardDialog";

function Card({ task, onDropPosition, setOnDropPosition }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [canOpenDialog, setCanOpenDialog] = useState(true);

  const creation_date = DateFormatter(task.creation_date);
  const expiration_date = DateFormatter(task.expiration_date);

  const handleCardClick = () => {
    if (canOpenDialog) {
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCanOpenDialog(false);

    setTimeout(() => {
      setCanOpenDialog(true);
    }, 500);
  };

  return (
    <div
      className="rounded-xl p-2 bg-primary-background space-y-2 cursor-pointer active:cursor-grabbing shadow-md"
      draggable="true"
      onClick={handleCardClick}
      onDragStart={() => setOnDropPosition(null)}
      onDragEnd={() => {
        console.log("drag end", task.id);
      }}
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
      <CardDialog task={task} handler={handleCloseDialog} open={isDialogOpen} />
    </div>
  );
}

export default Card;
