import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Confirmation } from "./Confirmation";
import { ThankYou } from "./ThankYou";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/invites/:id",
    element: <App />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
