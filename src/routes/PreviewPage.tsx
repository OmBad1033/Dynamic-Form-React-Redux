import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../store/hooks";
import type { FieldSchema } from "../types/form";
import { validateField } from "../utils/validation";
import { evalDerived } from "../utils/derived";

export default function PreviewPage() {
  const usedFields = useAppSelector((s) =>
    s.builder.fields.slice().sort((a, b) => a.order - b.order)
  );

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const f of usedFields) v[f.name] = f.defaultValue ?? "";
    return v;
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // derive values when parents change
  const computedValues = useMemo(() => {
    const v = { ...values };
    for (const f of usedFields) {
      if (f.derived?.isDerived) {
        v[f.name] = evalDerived(f, v);
      }
    }
    return v;
  }, [values, usedFields]);

  function setValue(field: FieldSchema, raw: unknown) {
    const v = { ...values, [field.name]: raw };
    setValues(v);
    // validate this field
    const errs = validateField(field, raw);
    setErrors((prev) => ({ ...prev, [field.name]: errs }));
  }

  if (usedFields.length === 0)
    return (
      <Alert severity="info">
        No fields in the current builder. Create one in the Create tab.
      </Alert>
    );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Preview
      </Typography>
      <Stack spacing={2}>
        {usedFields.map((f) => (
          <FieldRenderer
            key={f.id}
            field={f}
            value={computedValues[f.name]}
            errors={errors[f.name]}
            onChange={setValue}
          />
        ))}
      </Stack>
    </Box>
  );
}

type FieldRendererProps = {
  field: FieldSchema;
  value: unknown;
  errors?: string[];
  onChange: (field: FieldSchema, value: unknown) => void;
};

function FieldRenderer({ field, value, errors, onChange }: FieldRendererProps) {
  const commonProps = {
    fullWidth: true,
    label: field.label,
    value: String(value ?? ""),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(field, e.target.value),
    error: !!errors?.length,
    helperText: errors?.join(", "),
  } as const;

  switch (field.type) {
    case "text":
      return <TextField {...commonProps} />;
    case "number":
      return <TextField {...commonProps} type="number" />;
    case "textarea":
      return <TextField {...commonProps} multiline minRows={3} />;
    case "date":
      return (
        <TextField
          {...commonProps}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      );
    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={(e) => onChange(field, e.target.checked)}
            />
          }
          label={field.label}
        />
      );
    case "select":
      return (
        <FormControl fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            label={field.label}
            value={String(value ?? "")}
            onChange={(e) => onChange(field, e.target.value)}
          >
            {(field.options || []).map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case "radio":
      return (
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            {field.label}
          </Typography>
          <Stack direction="row" spacing={2}>
            {(field.options || []).map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={String(value ?? "") === opt}
                    onChange={() => onChange(field, opt)}
                  />
                }
                label={opt}
              />
            ))}
          </Stack>
        </FormControl>
      );
    default:
      return <TextField {...commonProps} />;
  }
}
