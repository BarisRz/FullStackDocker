import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./pages/App.jsx";
import "./index.css";

import { UserProvider } from "./contexts/UserContext.jsx";
import { AccessTokenProvider } from "./contexts/AccessTokenContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AccessTokenProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AccessTokenProvider>
    </ThemeProvider>
  </React.StrictMode>
);
