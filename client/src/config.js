// src/config.js

export const BACKEND_BASE_URL =
  import.meta.env?.VITE_BASE_BACKEND_URL ||
  process.env.REACT_APP_BASE_BACKEND_URL ||
  "http://localhost:5000";

// Events page
export const REACT_APP_EVENTS_API = "http://localhost:5000/eventsdata";
