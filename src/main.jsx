import { LocaleProvider } from "./config/localeContext.jsx"
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocaleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </LocaleProvider>
  </React.StrictMode>
);
