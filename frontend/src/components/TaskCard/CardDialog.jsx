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

function CardDialog({ task, open, handler }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const date = DateFormatter(task.creation_date);
  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <DocumentIcon className="w-6 h-6 text-primary-main" />
          <Typography variant="h4">{task.title}</Typography>
          <PencilIcon className="w-5 h-5 text-primary-text" />
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
            <Button className="rounded-lg flex gap-1 p-1 pl-2 items-center bg-green-50 text-primary-text">
              <CheckIcon className="w-6 h-6 text-primary-main" />
              Done?
            </Button>
            <Button className="rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2 items-center">
              <CalendarDateRangeIcon className="w-6 h-6 text-primary-main" />
              Expiration
            </Button>
            <Button className="rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2 items-center">
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
                <Button className="rounded-lg bg-red-400/10 text-primary-text flex gap-1 p-1 pl-2 items-center">
                  <TrashIcon className="w-6 h-6 text-primary-main" />
                  Delete
                </Button>
              </PopoverHandler>
              <PopoverContent className="z-[10000] flex items-center gap-2">
                Are you sure you want to delete this task?
                <Button onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button color="red">Delete</Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default CardDialog;
