import { useState } from "react";
import Card from "../../TaskCard/Card";

function Column({ tasklist }) {
  const [isdragHoverActive, setIsDragHoverActive] = useState(false);
  return (
    <div className="flex-1 bg-gray-200">
      <div className="p-2 space-y-2">
        {tasklist.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
