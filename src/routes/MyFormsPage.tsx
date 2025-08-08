import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { loadFromSchema } from "../store/builderSlice";

export default function MyFormsPage() {
  const forms = useAppSelector((s) => s.forms.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function previewForm(id: string) {
    const form = forms.find((f) => f.id === id);
    if (!form) return;
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
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => previewForm(f.id)}
                    >
                      Preview
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
