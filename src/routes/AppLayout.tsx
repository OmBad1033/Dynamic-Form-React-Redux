import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component={Link}
            to="/"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Dynamic Form
          </Typography>
          <Button
            color={pathname === "/" ? "secondary" : "inherit"}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color={pathname === "/create" ? "secondary" : "inherit"}
            component={Link}
            to="/create"
          >
            Create
          </Button>
          <Button
            color={pathname === "/preview" ? "secondary" : "inherit"}
            component={Link}
            to="/preview"
          >
            Preview
          </Button>
          <Button
            color={pathname === "/myforms" ? "secondary" : "inherit"}
            component={Link}
            to="/myforms"
          >
            My Forms
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
