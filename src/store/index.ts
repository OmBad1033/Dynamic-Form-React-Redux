import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./formsSlice";
import builderReducer from "./builderSlice";

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    builder: builderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
