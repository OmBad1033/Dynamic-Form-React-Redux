import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import FieldEditor from "../components/FieldEditor";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addField,
  resetBuilder,
  setName,
  toFormSchema,
} from "../store/builderSlice";
import type { FieldType } from "../types/form";
import { addForm } from "../store/formsSlice";

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
];

export default function CreatePage() {
  const builder = useAppSelector((s) => s.builder);
  const dispatch = useAppDispatch();

  const [saveOpen, setSaveOpen] = useState(false);
  const [newType, setNewType] = useState<FieldType>("text");

  const hasDuplicateNames = useMemo(() => {
    const names = builder.fields.map((f) => f.name.trim()).filter(Boolean);
    return new Set(names).size !== names.length;
  }, [builder.fields]);

  function onAddField() {
    dispatch(addField({ type: newType }));
  }

  function onSave() {
    const schema = toFormSchema(builder);
    if (!schema) return;
    dispatch(addForm(schema));
    dispatch(resetBuilder());
    setSaveOpen(false);
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Build Form
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Form name"
          value={builder.name}
          onChange={(e) => dispatch(setName(e.target.value))}
          fullWidth
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <TextField
            select
            label="Field type"
            value={newType}
            onChange={(e) => setNewType(e.target.value as FieldType)}
          >
            {fieldTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" startIcon={<Add />} onClick={onAddField}>
            Add field
          </Button>
          <Box flex={1} />
          <Button
            variant="outlined"
            disabled={
              !builder.name || builder.fields.length === 0 || hasDuplicateNames
            }
            onClick={() => setSaveOpen(true)}
          >
            Save form
          </Button>
        </Stack>

        <Box>
          {builder.fields.map((f, i) => (
            <FieldEditor key={f.id} field={f} index={i} />
          ))}
          {hasDuplicateNames && (
            <Typography color="error">
              Duplicate field names found. Names must be unique.
            </Typography>
          )}
          {builder.fields.length === 0 && (
            <Typography color="text.secondary">
              No fields yet. Add your first field.
            </Typography>
          )}
        </Box>
      </Stack>

      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <Typography>
            Form "{builder.name}" will be saved to My Forms.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={!builder.name || builder.fields.length === 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
