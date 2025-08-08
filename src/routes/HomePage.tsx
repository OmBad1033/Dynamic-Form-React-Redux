import { ArrowForward, Build, ListAlt, Preview } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack alignItems="center" spacing={5}>
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
              title="Preview"
              description="Interact with the current form as an end user, with live validation."
              to="/preview"
              icon={<Preview />}
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
    </Container>
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
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
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
