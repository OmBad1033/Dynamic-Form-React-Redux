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
import SplitText from "../components/SplitText";
import GradientText from "../components/GradientText";
import Magnet from "../components/Magnet";
import ShinyText from "../components/ShinyText";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Stack
        alignItems="center"
        spacing={5}
        className="w-full flex flex-col items-center justify-center"
      >
        <Typography variant="h2" textAlign="center">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={9}
            showBorder={false}
            className="custom-class"
          >
            Dynamic Form
          </GradientText>
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          maxWidth={600}
        >
          <SplitText
            text="Build, preview, and manage dynamic forms with validations and derived fields."
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
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
    <Magnet padding={50} disabled={false} magnetStrength={50}>
      <Card
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
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
            endIcon={<ArrowForward />}
          >
            <ShinyText text={`Go to ${title}`} disabled={false} speed={3} className='custom-class' />

          </Button>
        </CardActions>
      </Card>
    </Magnet>
  );
}
