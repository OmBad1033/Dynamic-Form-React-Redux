import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./HomePage";
import CreatePage from "./CreatePage";
import MyFormsPage from "./MyFormsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePage key="create" /> },
      { path: "myforms", element: <MyFormsPage /> },
    ],
  },
]);
