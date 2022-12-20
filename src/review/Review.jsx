import {
  Rating,
  Typography,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDwonAltIcon from "@mui/icons-material/ThumbDownAlt";

import { patchFetch } from "../hooks/fetchHooks";
import { useContext } from "react";
import Context from "../utils/Context";
import { daysSince } from "../utils/functions";

export default function Review({ review, refetch, user }) {
  const { palette, breakpoints } = useTheme();

  const { setSB } = useContext(Context);

  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  function reactionHandler(action) {
    patchFetch("review/" + action, { reviewId: review._id }).then(
      ({ error, message }) => {
        if (!error) {
          refetch();
          setSB(message);
        }
      }
    );
  }

  function banUserSubmit() {
    patchFetch("/user/banbyid", { id: review.userId }).then(({ error }) => {
      !error && refetch();
    });
  }

  function deleteReviewSubmit() {
    patchFetch("/review/delete", { id: review._id }).then(({ error }) => {
      !error && refetch();
    });
  }
  return (
    <Stack
      sx={{
        borderRadius: 5,
        border: 1,
        borderColor: palette.primary.main,
        m: 1,
        p: 1,
        bgcolor: palette.primary.dark,
      }}
    >
      <Stack direction={matchesSm ? "row" : "column"} sx={{ mb: 1 }}>
        <Rating
          sx={{ mx: 1, mt: 0.4 }}
          readOnly
          value={review.stars}
          precision={0.5}
          emptyIcon={<StarIcon />}
        />
        {review.userOrderedProduct ? (
          <Chip
            sx={{ mt: 0.4 }}
            color="success"
            label="Purchase confirmed"
            icon={<DoneIcon />}
          />
        ) : (
          <Chip
            sx={{ mt: 0.4, borderColor: palette.secondary.main }}
            color="warning"
            label="Purchase not confirmed"
            icon={<CloseIcon />}
            variant="outlined"
          />
        )}
        {(user.isAdmin || user.userId === review.userId) && (
          <Button
            onClick={deleteReviewSubmit}
            size="small"
            sx={{ ml: 1 }}
            variant="outlined"
            color="warning"
          >
            Delete
          </Button>
        )}
      </Stack>
      <Typography variant="body1" sx={{ m: 1 }}>
        {review.text}
      </Typography>
      <Stack
        direction="row"
        sx={{ m: 1, borderTop: 1, borderColor: palette.primary.main }}
      >
        <Typography variant="h5">{review.userUsername}</Typography>
        {user.isAdmin && (
          <Button
            onClick={banUserSubmit}
            size="small"
            sx={{ ml: 1, mt: 0.2 }}
            variant="outlined"
            color="error"
          >
            Ban
          </Button>
        )}
        <Typography sx={{ mt: 0.7, ml: 2 }}>
          {daysSince(new Date(review.addedDate)).toFixed()} days ago
        </Typography>
      </Stack>
      <Stack direction="row">
        <Chip
          clickable={true}
          sx={{ width: 0.5 }}
          onClick={() => reactionHandler("like")}
          variant="outlined"
          label={review.usersThatLiked.length}
          color="success"
          icon={<ThumbUpAltIcon />}
        />
        <Chip
          clickable={true}
          sx={{ width: 0.5, ml: 1 }}
          onClick={() => reactionHandler("dislike")}
          variant="outlined"
          label={review.usersThatDisliked.length}
          color="error"
          icon={<ThumbDwonAltIcon />}
        />
      </Stack>
    </Stack>
  );
}
