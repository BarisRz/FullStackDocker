import { Card as C } from "@material-tailwind/react";

function Card({ task }) {
  return (
    <C
      className="border border-black bg-white w-full h-[170px] active:cursor-grabbing cursor-grab"
      draggable="true"
    >
      <div>{task.title}</div>
      <div>{task.content}</div>
      <div>{task.status}</div>
      <div>{task.creation_date}</div>
      <div>{task.expiration_date}</div>
    </C>
  );
}

export default Card;
