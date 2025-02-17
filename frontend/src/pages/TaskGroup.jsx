import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTaskGroup } from "../api/TaskGroup/api";
import toast from "react-hot-toast";

function TaskGroup() {
  const [formTaskGroup, setFormTaskGroup] = useState({
    name: "",
    is_public: 0,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createTaskGroup,
    onSuccess: (data) => {
      toast.success("Task group created");
      navigate(`/taskgroups/${data.data.insertId}`);
    },
    onError: (error) => {
      toast.error(error.response.data.error);
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formTaskGroup.name.trim().length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    setError(false);
    mutate(formTaskGroup);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader
          color="blue"
          floated={false}
          variant="gradient"
          className="text-center text-2xl font-bold py-2 shadow-none"
        >
          Create a new task group
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              color="blue"
              label="Name"
              type="text"
              size="lg"
              onChange={(e) =>
                setFormTaskGroup({ ...formTaskGroup, name: e.target.value })
              }
              disabled={isPending}
              error={error && formTaskGroup.name.length < 3}
            />
            {error && formTaskGroup.name.length < 3 && (
              <Typography color="red" variant="small">
                {error}
              </Typography>
            )}
            <Checkbox
              color="blue"
              label="Public"
              onClick={(e) =>
                setFormTaskGroup({
                  ...formTaskGroup,
                  is_public: e.target.checked ? 1 : 0,
                })
              }
              disabled={isPending}
            />
            <Button
              color="blue"
              size="lg"
              className="shadow-none place-content-center mt-4"
              type="submit"
              loading={isPending}
            >
              Create
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default TaskGroup;
