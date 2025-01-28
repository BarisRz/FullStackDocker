import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import "./index.scss";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Créer un thème personnalisé avec la police Geist
const theme = createTheme({
  typography: {
    fontFamily: "Geist, sans-serif",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StyledEngineProvider>
);
