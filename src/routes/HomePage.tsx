import { ArrowForward, Build, ListAlt, Preview } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Stack alignItems="center" spacing={5} className="w-full flex flex-col items-center justify-center">
        <Typography variant="h2" textAlign="center">
          Dynamic Form
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          maxWidth={600}
        >
          Build, preview, and manage dynamic forms with validations and derived
          fields.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <NavCard
              title="Create"
              description="Build a new form by adding fields, validations, and derived logic."
              to="/create"
              icon={<Build />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <NavCard
              title="My Forms"
              description="View and open previously saved forms from localStorage."
              to="/myforms"
              icon={<ListAlt />}
            />
          </Grid>
        </Grid>
      </Stack>
    </div>

  );
}

type NavCardProps = {
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
};

function NavCard({ title, description, to, icon }: NavCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={RouterLink}
          to={to}
          variant="contained"
          endIcon={<ArrowForward />}
        >
          Go to {title}
        </Button>
      </CardActions>
    </Card>
  );
}
