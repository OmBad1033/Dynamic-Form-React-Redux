import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormSchema } from "../types/form";
import { loadForms, saveForms } from "./formsStorage";

export type FormsState = {
  items: FormSchema[];
};

const initialState: FormsState = {
  items: loadForms(),
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormSchema>) {
      state.items.unshift(action.payload);
      saveForms(state.items);
    },
    removeForm(state, action: PayloadAction<string>) {
      state.items = state.items.filter((f) => f.id !== action.payload);
      saveForms(state.items);
    },
  },
});

export const { addForm, removeForm } = formsSlice.actions;
export default formsSlice.reducer;
