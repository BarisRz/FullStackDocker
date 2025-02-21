import { Typography, Button } from "@material-tailwind/react";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function EmptyList() {
  return (
    <div className="flex mt-[50px] gap-2 items-center justify-center">
      <FaceFrownIcon className="w-8 h-8 text-red-500" />
      <Typography variant="lead">
        No task group found. Let's create one?
      </Typography>
      <Link to={"/taskgroups"}>
        <Button color="blue" size="sm" variant="gradient">
          Create a task group
        </Button>
      </Link>
    </div>
  );
}

export default EmptyList;
