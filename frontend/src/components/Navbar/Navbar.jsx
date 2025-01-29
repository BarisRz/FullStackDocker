import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";

function Navbar() {
  return (
    <nav className="bg-green-200 h-[60px] flex items-center px-4 justify-between">
      <div className="flex items-center">
        <img src="logo.svg" alt="logo of the website" className="h-8" />
        <Typography bold>Navbar</Typography>
      </div>
      <p>Connexion</p>
    </nav>
  );
}

export default Navbar;
