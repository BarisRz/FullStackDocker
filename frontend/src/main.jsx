import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";

// Contexts
import { UserProvider } from "./contexts/UserContext.jsx";
import { AccessTokenProvider } from "./contexts/AccessTokenContext.jsx";

// Pages
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import MailConfirmation from "./pages/MailConfirmation";
import TaskGroup from "./pages/TaskGroup";
import TaskGroupPerId from "./pages/TaskGroupPerId";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import TaskGroupList from "./pages/TaskGroupList";

const queryClient = new QueryClient();

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
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/verify-email",
        element: <MailConfirmation />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/taskgroups",
            element: <TaskGroup />,
          },

          {
            path: "/taskgroups/:id",
            element: <TaskGroupPerId />,
          },
          {
            path: "/taskgroupslist",
            element: <TaskGroupList />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AccessTokenProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            containerStyle={{
              top: 70,
              zIndex: 10000,
            }}
          />
        </QueryClientProvider>
      </UserProvider>
    </AccessTokenProvider>
  </ThemeProvider>
);
