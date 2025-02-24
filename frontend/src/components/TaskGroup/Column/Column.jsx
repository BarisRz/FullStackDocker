import { useState } from "react";
import Card from "../../TaskCard/Card";
import { Typography, Chip, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

function Column({ tasklist, title }) {
  const [isdragHoverActive, setIsDragHoverActive] = useState(false);
  const [onDropPosition, setOnDropPosition] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragHoverActive(false);
    setOnDropPosition(title);
    console.log(e.target.id);
  };

  return (
    <div
      className={`flex-1 ${
        isdragHoverActive ? "bg-primary-main/25" : "bg-primary-main/15"
      } rounded-xl transition-colors`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragHoverActive(true);
      }}
      onDragLeave={() => setIsDragHoverActive(false)}
      onDrop={handleDrop}
      id={title}
    >
      <div className="px-4 py-3 flex justify-between">
        <Typography variant="h4">{title}</Typography>
        <Chip
          color="blue"
          value={tasklist.length}
          className="h-8 self-center text-lg flex justify-center items-center"
        />
      </div>
      <div className="p-2 space-y-2 max-h-[70vh] overflow-auto">
        {tasklist.map((task) => (
          <Card
            key={task.id}
            task={task}
            onDropPosition={onDropPosition}
            setOnDropPosition={setOnDropPosition}
          />
        ))}
      </div>
      <div className="p-2 flex gap-2 overflow-auto">
        <Button
          className="flex p-2 gap-2 pr-5 hover:shadow-none shadow-none rounded-xl"
          color="blue"
          variant="gradient"
        >
          <PlusIcon className="w-6 h-6" />
          <Typography>Add a task</Typography>
        </Button>
      </div>
    </div>
  );
}

export default Column;
