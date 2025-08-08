import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7', // deep purple
    },
    secondary: {
      main: '#ff6f00', // amber
    },
    background: {
      default: '#f7f7fb',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
    h2: { fontWeight: 800 },
    h5: { fontWeight: 700 },
  },
})

