import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading ={null} persistor={persistor}>
      <App />

      </PersistGate>
    <Toaster />

    </Provider>

  </StrictMode>
);
