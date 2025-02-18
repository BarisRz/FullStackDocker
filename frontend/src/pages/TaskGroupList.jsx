import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getTaskGroupsList } from "../api/TaskGroup/api";
import {
  Spinner,
  Typography,
  Input,
  List,
  Chip,
} from "@material-tailwind/react";
import { NoSymbolIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import TaskGroupCard from "../components/TaskGroup/TaskGroupCard";
import EmptyList from "../components/TaskGroup/EmptyList";

function TaskGroupList() {
  const [search, setSearch] = useState("");
  const [taskGroups, setTaskGroups] = useState([]);
  const getTaskGroupsListQuery = useQuery({
    queryKey: ["taskGroupsList"],
    queryFn: getTaskGroupsList,
  });

  useEffect(() => {
    if (getTaskGroupsListQuery.isSuccess) {
      setTaskGroups(getTaskGroupsListQuery.data.data);
    }
  }, [getTaskGroupsListQuery]);

  if (getTaskGroupsListQuery.isFetching) {
    return (
      <section className="flex h-screen2 justify-center items-center">
        <Spinner color="blue" className="w-12 h-12" />
      </section>
    );
  }

  if (getTaskGroupsListQuery.isError) {
    return (
      <section className="flex h-screen2 justify-center items-center gap-2">
        <NoSymbolIcon className="w-12 h-12 text-red-500" />
        <p>Something went wrong</p>
      </section>
    );
  }

  return (
    <div className="mt-[100px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Typography variant="h2">Your tasks group</Typography>
          <Chip
            color="blue"
            value={getTaskGroupsListQuery.data.data.length}
            className="h-8 self-center"
          />
        </div>
        <div>
          <Input
            label="Search a group"
            color="blue"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<MagnifyingGlassIcon />}
          />
        </div>
      </div>
      <div>
        {taskGroups.length === 0 ? (
          <EmptyList />
        ) : (
          <List>
            {taskGroups
              .filter((element) =>
                element.name.toLowerCase().includes(search.toLowerCase().trim())
              )
              .map((taskGroup) => {
                return (
                  <div className="flex gap-2 items-center" key={taskGroup.id}>
                    <TaskGroupCard taskGroup={taskGroup} />
                  </div>
                );
              })}
          </List>
        )}
      </div>
    </div>
  );
}

export default TaskGroupList;
