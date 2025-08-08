import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/create" },
    { label: "My Forms", path: "/myforms" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        bgcolor: "black",
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        color: "white",
      }}
    >
      {/* Glassmorphic Navigation Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(20, 20, 20, 0.6)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            Dynamic Form
          </Typography>

          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                color: pathname === link.path ? "#90caf9" : "white",
                fontWeight: pathname === link.path ? "bold" : "normal",
                textTransform: "none",
                "&:hover": {
                  color: "#90caf9",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
