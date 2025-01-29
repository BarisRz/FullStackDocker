import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" h-[60px] flex items-center px-4 justify-between border-b border-black/10 fixed w-full top-0 left-0 bg-primary-background">
      <div className="flex items-center gap-2">
        <Link to={"/"}>
          <img src="logo.svg" alt="logo of the website" className="h-8" />
        </Link>
        <Link to={"/"}>
          <Typography variant="h3">Lorga</Typography>
        </Link>
        <div className="w-[1px] h-6 bg-black/20 mx-2" />
        <Link to={"/"}>
          <Typography variant="h6">Home</Typography>
        </Link>
        <Link to={"/about"}>
          <Typography variant="h6">About</Typography>
        </Link>
        <Link to={"/contact"}>
          <Typography variant="h6">Contact</Typography>
        </Link>
      </div>
      <div className="space-x-2">
        <Button className="bg-primary-main">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  );
}

export default Navbar;
