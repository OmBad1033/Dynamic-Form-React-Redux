import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FieldSchema, FieldType, FormSchema } from "../types/form";

export type BuilderState = {
  name: string;
  fields: FieldSchema[];
};

const initialState: BuilderState = {
  name: "",
  fields: [],
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addField(
      state,
      action: PayloadAction<{
        type: FieldType;
      }>
    ) {
      const id = nanoid();
      const order = state.fields.length;
      state.fields.push({
        id,
        name: `field_${order + 1}`,
        label: "Untitled",
        type: action.payload.type,
        order,
      });
    },
    updateField(
      state,
      action: PayloadAction<Partial<FieldSchema> & { id: string }>
    ) {
      const idx = state.fields.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) {
        state.fields[idx] = { ...state.fields[idx], ...action.payload };
      }
    },
    deleteField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
      state.fields.forEach((f, i) => (f.order = i));
    },
    moveFieldUp(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx > 0) {
        [state.fields[idx - 1], state.fields[idx]] = [
          state.fields[idx],
          state.fields[idx - 1],
        ];
        state.fields.forEach((f, i) => (f.order = i));
      }
    },
    moveFieldDown(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx >= 0 && idx < state.fields.length - 1) {
        [state.fields[idx + 1], state.fields[idx]] = [
          state.fields[idx],
          state.fields[idx + 1],
        ];
        state.fields.forEach((f, i) => (f.order = i));
      }
    },
    resetBuilder(state) {
      state.name = "";
      state.fields = [];
    },
    loadFromSchema(state, action: PayloadAction<FormSchema>) {
      state.name = action.payload.name;
      state.fields = action.payload.fields.map((f, idx) => ({
        ...f,
        order: idx,
      }));
    },
  },
});

export const {
  setName,
  addField,
  updateField,
  deleteField,
  moveFieldUp,
  moveFieldDown,
  resetBuilder,
  loadFromSchema,
} = builderSlice.actions;
export default builderSlice.reducer;

export function toFormSchema(builder: BuilderState): FormSchema | null {
  if (!builder.name || builder.fields.length === 0) return null;
  return {
    id: nanoid(),
    name: builder.name,
    createdAt: Date.now(),
    fields: builder.fields.slice().sort((a, b) => a.order - b.order),
  };
}
