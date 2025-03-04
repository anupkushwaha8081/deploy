

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import applicationReducer from "../redux/applicationSlice";
import companyReducer from "../redux/companySlice"
import jobReducer from "../redux/jobSlice"; // ✅ Ensure correct import
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer, // ✅ authReducer should be the default export from authSlice
  job: jobReducer,
  company:companyReducer,
  application :applicationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export default store;
