import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
 
          <div className="h-screen w-screen overflow-hidden">
            <RouterProvider router={router} />
          </div>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
