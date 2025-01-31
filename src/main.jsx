import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CredentialsProvider } from "./context/CrendentialsContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n.js";
import { FetchDataProvider } from "./context/FetchDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CredentialsProvider>
        <FetchDataProvider>
          <ToastContainer />
          <App />
        </FetchDataProvider>
      </CredentialsProvider>
    </ThemeProvider>
  </StrictMode>
);
