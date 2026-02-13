// Import React
import React from "react";

// Import React DOM to render UI to browser
import ReactDOM from "react-dom/client";

// Import main App component
import App from "./App.jsx";

// Find <div id="root"> in index.html and render App there
ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
