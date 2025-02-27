import { useState } from "react";
import { motion } from "motion/react";
import Card from "../../TaskCard/Card";
import { Typography, Chip, Button } from "@material-tailwind/react";
import { PlusIcon, FolderPlusIcon } from "@heroicons/react/24/solid";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateTask } from "../../../api/Task/api";
import toast from "react-hot-toast";
import dragStore from "../../TaskCard/DragStore";

function Column({ tasklist, title, taskGroupId }) {
  const [isdragHoverActive, setIsDragHoverActive] = useState(false);
  const [onDropPosition, setOnDropPosition] = useState(null);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }) => updateTask(id, task),
    onMutate: async ({ id, task }) => {
      const previousTaskGroupList = queryClient.getQueryData([
        "tasks-all",
        taskGroupId,
      ]);
      const newTaskGroupList = previousTaskGroupList.map((element) =>
        element.id == id ? { ...element, ...task } : element
      );
      queryClient.setQueryData(["tasks-all", taskGroupId], newTaskGroupList);
      return { previousTaskGroupList };
    },
    onError: (err, _, context) => {
      toast.error("An error occurred");
      if (context.previousTaskGroupList) {
        queryClient.setQueryData(
          ["tasks-all", taskGroupId],
          context.previousTaskGroupList
        );
      }
    },
  });

  const handleTaskUpdate = (id, task) => {
    const allTaskFromGroup = queryClient.getQueryData([
      "tasks-all",
      taskGroupId,
    ]);
    // console.log("All tasks", allTaskFromGroup);
    const beforeChangeTask = allTaskFromGroup.filter(
      (element) => element.id == id
    );
    // console.log("Before change", beforeChangeTask);
    const changedTask = { ...beforeChangeTask[0], ...task };
    delete changedTask.id;
    delete changedTask.task_group_id;
    delete changedTask.creation_date;
    delete changedTask.user_id;
    return changedTask;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragHoverActive(false);
    setOnDropPosition(title);
    const task = dragStore.currentTask;
    // console.log("Task", task, "will go to", title);
    const newTask = handleTaskUpdate(task, { status: title });
    // console.log("New task", newTask);
    updateTaskMutation.mutate({ id: task, task: newTask });
    dragStore.currentTask = null;
  };

  return (
    <motion.div
      layout
      className={`flex-1 ${
        isdragHoverActive ? "bg-primary-main/25" : "bg-primary-main/15"
      } rounded-xl transition-colors`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragHoverActive(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragHoverActive(false);
        }
      }}
      onDrop={handleDrop}
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
        {isdragHoverActive && (
          <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-main/50 h-[75px] rounded-xl shadow flex items-center justify-center gap-2"
          >
            <FolderPlusIcon className="w-8 h-8 animate-bounce" />
            <Typography variant="h5">Add here</Typography>
          </motion.div>
        )}
      </div>
      <motion.div className="p-2 flex gap-2 overflow-auto">
        <Button
          className="flex p-2 gap-2 pr-5 hover:shadow-none shadow-none rounded-xl"
          color="blue"
          variant="gradient"
        >
          <PlusIcon className="w-6 h-6" />
          <Typography>Add a task</Typography>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default Column;
