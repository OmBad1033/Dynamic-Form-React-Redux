import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { FieldSchema, FieldType } from "../types/form";
import {
  deleteField,
  moveFieldDown,
  moveFieldUp,
  updateField,
} from "../store/builderSlice";

const typeOptions: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date", label: "Date" },
];

type Props = {
  field: FieldSchema;
  index: number;
};

export default function FieldEditor({ field, index }: Props) {
  const dispatch = useAppDispatch();
  const allFields = useAppSelector((s) => s.builder.fields);
  const [optionsText, setOptionsText] = useState<string>(
    (field.options || []).join("\n")
  );
  useEffect(() => {
    setOptionsText((field.options || []).join("\n"));
  }, [field.options]);

  const onChange = (patch: Partial<FieldSchema>) =>
    dispatch(updateField({ id: field.id, ...patch }));

  const showOptions = field.type === "select" || field.type === "radio";

  return (
    <Accordion defaultExpanded sx={{ mb: 2 }}>
      <AccordionSummary>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            {index + 1}. {field.label || "Untitled"}
          </Typography>
          <IconButton
            size="small"
            onClick={() => dispatch(moveFieldUp(field.id))}
          >
            <ExpandLess />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => dispatch(moveFieldDown(field.id))}
          >
            <ExpandMore />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => dispatch(deleteField(field.id))}
          >
            <Delete />
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Label"
              value={field.label}
              onChange={(e) => onChange({ label: e.target.value })}
              fullWidth
            />
            <TextField
              label="Name (unique)"
              value={field.name}
              onChange={(e) => onChange({ name: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={field.type}
                onChange={(e) =>
                  onChange({ type: e.target.value as FieldType })
                }
              >
                {typeOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.required}
                onChange={(e) => onChange({ required: e.target.checked })}
              />
            }
            label="Required"
          />

          {/* Local textarea for editing options with newlines; synced to array */}
          {showOptions && (
            <TextField
              label="Options (one per line)"
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              onBlur={() =>
                onChange({
                  options: optionsText
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              fullWidth
              multiline
              minRows={3}
              helperText="Enter each option on a new line. Commas are allowed inside options."
            />
          )}

          {showOptions && (
            <TextField
              label="Options (one per line)"
              value={(field.options || []).join("\n")}
              onChange={(e) =>
                onChange({
                  options: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              fullWidth
              multiline
              minRows={3}
              helperText="Enter each option on a new line. Commas are allowed inside options."
            />
          )}

          <TextField
            label="Default value"
            value={String(field.defaultValue ?? "")}
            onChange={(e) => onChange({ defaultValue: e.target.value })}
            fullWidth
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Validation
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.validation?.notEmpty}
                    onChange={(e) =>
                      onChange({
                        validation: {
                          ...field.validation,
                          notEmpty: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Not empty"
              />
              <TextField
                type="number"
                label="Min length"
                value={field.validation?.minLength ?? ""}
                onChange={(e) =>
                  onChange({
                    validation: {
                      ...field.validation,
                      minLength: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
              <TextField
                type="number"
                label="Max length"
                value={field.validation?.maxLength ?? ""}
                onChange={(e) =>
                  onChange({
                    validation: {
                      ...field.validation,
                      maxLength: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.validation?.email}
                    onChange={(e) =>
                      onChange({
                        validation: {
                          ...field.validation,
                          email: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Email format"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.validation?.password}
                    onChange={(e) =>
                      onChange({
                        validation: {
                          ...field.validation,
                          password: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Password rule"
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Derived Field
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!field.derived?.isDerived}
                  onChange={(e) =>
                    onChange({
                      derived: {
                        ...field.derived,
                        isDerived: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="Mark as derived"
            />
            {!!field.derived?.isDerived && (
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Parent fields</InputLabel>
                  <Select
                    label="Parent fields"
                    multiple
                    value={field.derived?.parents || []}
                    onChange={(e) =>
                      onChange({
                        derived: {
                          ...field.derived,
                          parents: (e.target.value as string[]) || [],
                        },
                      })
                    }
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                  >
                    {allFields
                      .filter((f) => f.id !== field.id)
                      .map((p) => (
                        <MenuItem key={p.name} value={p.name}>
                          {p.label} ({p.name})
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Expression (e.g., dateDiffYears(dob))"
                  value={field.derived?.expression || ""}
                  onChange={(e) =>
                    onChange({
                      derived: { ...field.derived, expression: e.target.value },
                    })
                  }
                  helperText="Available helpers: dateDiffYears(dateString), parseInt, parseFloat, Math"
                />
              </Stack>
            )}
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
