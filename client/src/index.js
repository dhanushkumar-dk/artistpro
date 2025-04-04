import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Add this at the top of your `index.js` or `App.js`
import "bootstrap/dist/css/bootstrap.min.css"; // If you want to use Bootstrap styles

// Create the root element to render your app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
