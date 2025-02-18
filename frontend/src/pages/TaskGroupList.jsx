import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTaskGroupsList } from "../api/TaskGroup/api";
import { Link } from "react-router-dom";
import {
  Spinner,
  Typography,
  Input,
  List,
  Chip,
} from "@material-tailwind/react";
import { NoSymbolIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import TaskGroupCard from "../components/TaskGroup/TaskGroupCard";

function TaskGroupList() {
  const [search, setSearch] = useState("");
  const getTaskGroupsListQuery = useQuery({
    queryKey: ["taskGroupsList"],
    queryFn: getTaskGroupsList,
  });

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
        <List>
          {getTaskGroupsListQuery.data.data
            .filter((element) =>
              element.name.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((taskGroup) => {
              return (
                <Link to={`/taskgroups/${taskGroup.id}`}>
                  <TaskGroupCard key={taskGroup.id} taskGroup={taskGroup} />
                </Link>
              );
            })}
        </List>
      </div>
    </div>
  );
}

export default TaskGroupList;
