import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { loadFromSchema } from "../store/builderSlice";

export default function MyFormsPage() {
  const forms = useAppSelector((s) => s.forms.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function openForm(id: string) {
    const form = forms.find((f) => f.id === id);
    if (!form) return;
    // Load into builder state and navigate to preview
    dispatch(loadFromSchema(form));
    navigate("/preview");
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Forms
      </Typography>
      {forms.length === 0 ? (
        <Typography color="text.secondary">No saved forms yet.</Typography>
      ) : (
        <List>
          {forms.map((f) => (
            <ListItemButton key={f.id} onClick={() => openForm(f.id)}>
              <ListItemText
                primary={f.name}
                secondary={new Date(f.createdAt).toLocaleString()}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
