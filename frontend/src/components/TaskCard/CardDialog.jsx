import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import {
  Bars3BottomLeftIcon,
  DocumentIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  CalendarIcon,
  PencilIcon,
  XMarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
function CardDialog({ task, open, handler }) {
  return (
    <Dialog open={open} handler={handler} className="rounded-xl">
      <DialogHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <DocumentIcon className="w-6 h-6 text-primary-main" />
          <Typography variant="h4">{task.title}</Typography>
          <PencilIcon className="w-5 h-5 text-primary-text" />
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
          <div className="flex gap-2 flex-[3]">
            <Bars3BottomLeftIcon className="w-6 h-6 text-primary-main" />
            <Typography variant="h5" className="text-primary-text">
              Description
            </Typography>
          </div>
          <div className="flex-[1] flex flex-col gap-2">
            <div className="rounded-lg bg-green-50 flex gap-1 p-1 pl-2">
              <CheckIcon className="w-6 h-6 text-primary-main" />
              Done?
            </div>
            <div className="rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2">
              <CalendarIcon className="w-6 h-6 text-primary-main" />
              Date
            </div>
            <div className="rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2">
              <Squares2X2Icon className="w-6 h-6 text-primary-main" />
              Category
            </div>
            <div className="rounded-lg bg-primary-main/10 text-primary-text flex gap-1 p-1 pl-2">
              <DocumentDuplicateIcon className="w-6 h-6 text-primary-main" />
              Copy
            </div>
            <div className="rounded-lg bg-red-400/10 text-primary-text flex gap-1 p-1 pl-2">
              <TrashIcon className="w-6 h-6 text-primary-main" />
              Delete
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default CardDialog;
