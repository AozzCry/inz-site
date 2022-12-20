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
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("md"));

  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Container
        disableGutters
        sx={{
          bgcolor: palette.secondary.dark,
          display: "flex",
          button: { m: 0.5, color: palette.text.primary },
        }}
      >
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          {matchesSm && "Back"}
        </Button>
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() =>
            mainRef.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <ArrowUpwardIcon />
          {matchesSm && "Product"}
        </Button>
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() =>
            descriptionRef.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <DescriptionIcon />
          {matchesSm && "Description"}
        </Button>
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() =>
            specificationRef.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <FormatListBulletedIcon />
          {matchesSm && "Specification"}
        </Button>
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() =>
            reviewsRef.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <ReviewsIcon />
          {matchesSm && "Reviews"}
        </Button>
        <Button
          sx={{ minWidth: 50, flexGrow: 1 / 6 }}
          variant="outlined"
          onClick={() =>
            questionsRef.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <QuestionAnswerIcon />
          {matchesSm && "Questions"}
        </Button>
      </Container>
    </AppBar>
  );
}
