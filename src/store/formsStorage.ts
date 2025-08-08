import type { FormSchema } from "../types/form";

const STORAGE_KEY = "upliance.forms.v1";

export function loadForms(): FormSchema[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as FormSchema[];
  } catch {
    return [];
  }
}

export function saveForms(forms: FormSchema[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}
