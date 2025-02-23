import { Card as C } from "@material-tailwind/react";

function Card({ task }) {
  return (
    <C className="rounded-xl p-2 bg-primary-background" draggable="true">
      <div>{task.title}</div>
      <div>{task.content}</div>
      <div>{task.status}</div>
      <div>{task.creation_date}</div>
      <div>{task.expiration_date}</div>
    </C>
  );
}

export default Card;
