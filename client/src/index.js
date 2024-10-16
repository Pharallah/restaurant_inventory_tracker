import React from "react";
// import Dashboard from "./pages/Dashboard";
import "./index.css";
import { createRoot } from "react-dom/client";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router}/>);
