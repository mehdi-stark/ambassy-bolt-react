import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Choisissez un thème
import "primereact/resources/primereact.min.css"; // Styles de base de PrimeReact
import "primeicons/primeicons.css"; // Icônes de PrimeIcons

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
