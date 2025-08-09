import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import FuzzyText from "../components/FuzzyText";

export default function AppLayout() {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/create" },
    { label: "My Forms", path: "/myforms" },
  ];
  return (
    <div className="flex flex-col h-screen w-50 items-center justify-center overflow-hidden">
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          bgcolor: "transparent",
          backgroundColor: "transparent",
          color: "white",
          flex: 1,
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        

        {/* Glassmorphic Navigation Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "rgba(20, 20, 20, 0.6)",
            padding: "10px 0",
            width: "70%",
            backdropFilter: "blur(12px)",
            borderRadius: "50px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
              sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 0.5 }}
            >
              <FuzzyText
                fontSize={32}
                baseIntensity={0}
                hoverIntensity={0.5}
                enableHover={true}
              >

                Dynamic Form
              </FuzzyText>
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

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
            width: "100%",
            alignSelf: "stretch",
          }}
        >
          <Container
            disableGutters
            sx={{ width: "100%", height: "100%", padding: "20px"}}
          >
            <Outlet />
          </Container>
        </Box>
      </Box>
    </div>
  );
}
