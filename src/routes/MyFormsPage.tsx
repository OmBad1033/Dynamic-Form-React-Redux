import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { loadFromSchema } from "../store/builderSlice";
import { removeForm } from "../store/formsSlice";
import { useState } from "react";
import ShinyText from "../components/ShinyText";

export default function MyFormsPage() {
  const forms = useAppSelector((s) => s.forms.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function previewForm(id: string) {
    const form = forms.find((f) => f.id === id);
    if (!form) return;
    dispatch(loadFromSchema(form));
    navigate("/preview");
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        <div className="flex items-center justify-center p-20">
          <ShinyText text="My Forms" disabled={true} speed={3} className='text-2xl font-semibold' />
        </div>
      </Typography>
      {forms.length === 0 ? (
        <Typography color="text.secondary">No saved forms yet.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={1}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>DateTime</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((f) => (
                <TableRow key={f.id} hover>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>
                    {new Date(f.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => previewForm(f.id)}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => setConfirmId(f.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
            <DialogTitle>Delete Form</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this form? This action cannot be
              undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmId(null)}>Cancel</Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  if (confirmId) dispatch(removeForm(confirmId));
                  setConfirmId(null);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      )}
    </Box>
  );
}
