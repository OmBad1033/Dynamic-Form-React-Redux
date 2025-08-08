import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "transparent", paper: "rgba(20,20,20,0.28)" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
    h2: { fontWeight: 800 },
    h5: { fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(20,20,20,0.6)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": { transform: "translateY(-1px)" },
        },
      },
    },
  },
});
