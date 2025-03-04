import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon, ArchiveBoxArrowDownIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../../api/Task/api";
import toast from "react-hot-toast";

function AddTask({ status, setter, taskGroupId }) {
  const modalRef = useRef(null);
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({
    title: "",
    content: null,
    status: status,
    priority: "Low",
    expiration_date: null,
    task_group_id: taskGroupId,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) ||
        onkeydown
      ) {
        setter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setter]);

  const addTaskMutation = useMutation({
    mutationFn: (task) => addTask(task),
    onSuccess: (data, task) => {
      console.log("Data", data);
      console.log(data.insertId);
      //   await queryClient.cancelQueries(["tasks-all", taskGroupId]);
      const previousTaskGroupList = queryClient.getQueryData([
        "tasks-all",
        taskGroupId,
      ]);
      console.log("Previous task group list", previousTaskGroupList);
      const newTask = { ...task, id: data.insertId };
      console.log("New task mutation", newTask);
      queryClient.setQueryData(
        ["tasks-all", taskGroupId],
        [...previousTaskGroupList, newTask]
      );
      toast.success("Task added");
      setter(false);
    },
    onError: (err) => {
      toast.error("An error occurred");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaskMutation.mutate(newTask);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/20 backdrop-blur-sm z-[10000]"
    >
      <motion.form
        ref={modalRef}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="w-[400px] bg-primary-background rounded-lg shadow-lg p-4 flex gap-4 flex-col"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ArchiveBoxArrowDownIcon className="w-6 h-6 text-primary-main" />
            <Typography variant="h4">Add a task</Typography>
          </div>
          <div
            className="hover:bg-gray-200 cursor-pointer rounded-lg"
            onClick={() => setter(false)}
          >
            <XMarkIcon className="w-8 h-8" />
          </div>
        </div>
        <Input
          label="Task name"
          type="search"
          color="blue"
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
          required
          minLength={3}
        />
        <Select
          label="Status"
          value={newTask.status}
          color="blue"
          onChange={(val) => {
            setNewTask({ ...newTask, status: val });
          }}
        >
          <Option value="Todo">Todo</Option>
          <Option value="In progress">In progress</Option>
          <Option value="Done">Done</Option>
        </Select>
        <Select
          label="Priority"
          value={newTask.priority}
          color="blue"
          onChange={(val) => {
            setNewTask({ ...newTask, priority: val });
          }}
        >
          <Option value="Low" className="flex items-center gap-2">
            Low
          </Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
        <Textarea
          label="Description"
          color="blue"
          onChange={(e) => {
            setNewTask({ ...newTask, content: e.target.value });
          }}
        />
        <Button color="blue" variant="gradient" type="submit">
          <Typography>Add task</Typography>
        </Button>
      </motion.form>
    </motion.div>
  );
}

export default AddTask;
