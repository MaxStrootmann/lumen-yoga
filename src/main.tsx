import React from "react";
import { createRoot } from "react-dom/client";

import App from "~/App";
import RegistrationPage from "~/pages/RegistrationPage";
import ThankYouPage from "~/pages/ThankYouPage";
import "~/styles/globals.css";

import { findRegistrationForm } from "../shared/registration-forms";

function Root() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const registration = path.match(/^\/aanmelden\/([a-z-]+)$/);

  if (registration) {
    const form = findRegistrationForm(registration[1] ?? "");
    if (form) return <RegistrationPage form={form} />;
  }
  if (path === "/bedankt") return <ThankYouPage />;

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
