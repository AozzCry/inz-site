import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Button,
  useMediaQuery,
  Container,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import ReviewsIcon from "@mui/icons-material/Reviews";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ProductNavbar({
  mainRef,
  descriptionRef,
  specificationRef,
  reviewsRef,
  questionsRef,
}) {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up("md"));

  const navigate = useNavigate();

  function scrollToRef(ref) {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <AppBar position="sticky">
      <Container
        disableGutters
        sx={{
          bgcolor: "secondary.dark",
          display: "flex",
          button: { m: 0.5, color: "text.primary" },
        }}
      >
        <Button
          title="Back"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          {matchesSm && "Back"}
        </Button>
        <Button
          title="Product"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => scrollToRef(mainRef)}
        >
          <ArrowUpwardIcon />
          {matchesSm && "Product"}
        </Button>
        <Button
          title="Description"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => scrollToRef(descriptionRef)}
        >
          <DescriptionIcon />
          {matchesSm && "Description"}
        </Button>
        <Button
          title="Specification"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => scrollToRef(specificationRef)}
        >
          <FormatListBulletedIcon />
          {matchesSm && "Specification"}
        </Button>
        <Button
          title="Reviews"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => scrollToRef(reviewsRef)}
        >
          <ReviewsIcon />
          {matchesSm && "Reviews"}
        </Button>
        <Button
          title="Questions"
          sx={{ minWidth: 40, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => scrollToRef(questionsRef)}
        >
          <QuestionAnswerIcon />
          {matchesSm && "Questions"}
        </Button>
      </Container>
    </AppBar>
  );
}
