import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";

// Contexts
import { UserProvider } from "./contexts/UserContext.jsx";
import { AccessTokenProvider } from "./contexts/AccessTokenContext.jsx";

// Pages
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
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
