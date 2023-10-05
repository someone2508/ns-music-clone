import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Provider/UserProvider";
import { MusicProvider } from "./Provider/MusicProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
