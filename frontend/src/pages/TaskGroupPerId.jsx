import { useParams } from "react-router-dom";

function TaskGroupPerId() {
  const { id } = useParams();
  console.log(id);
  return <div>{id}</div>;
}

export default TaskGroupPerId;
