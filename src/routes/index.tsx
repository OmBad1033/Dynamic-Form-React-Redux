import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./HomePage";
import CreatePage from "./CreatePage";
import PreviewPage from "./PreviewPage";
import MyFormsPage from "./MyFormsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePage /> },
      { path: "preview", element: <PreviewPage /> },
      { path: "myforms", element: <MyFormsPage /> },
    ],
  },
]);
