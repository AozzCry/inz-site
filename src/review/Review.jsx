import { useContext } from "react";
import Context from "../utils/Context";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ThumbDwonAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Button,
  Chip,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  banUserById,
  daysSince,
  deleteDocument,
  reactionSubmit,
} from "../utils/functions";

export default function Review({ review, refetch, user }) {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up("sm"));

  const { notify, confirm } = useContext(Context);

  return (
    <Stack
      sx={{
        borderRadius: 5,
        border: 1,
        borderColor: "primary.main",
        m: 1,
        p: 1,
        bgcolor: "primary.dark",
      }}
    >
      <Stack direction={matchesSm ? "row" : "column"} sx={{ mb: 1 }}>
        <Rating
          sx={{ mx: 1, mt: 0.4 }}
          readOnly
          value={review.stars}
          precision={0.5}
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
            sx={{ mt: 0.4, borderColor: "secondary.main" }}
            color="warning"
            label="Purchase not confirmed"
            icon={<CloseIcon />}
            variant="outlined"
          />
        )}
        {(user.isAdmin || user.userId === review.userId) && (
          <Button
            onClick={() =>
              confirm("Do you want to delete this review?", () =>
                deleteDocument("review", review._id, refetch, notify)
              )
            }
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
        sx={{ m: 1, borderTop: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h5">{review.userUsername}</Typography>
        {user.isAdmin && (
          <Button
            onClick={() =>
              confirm("Do you want to ban this user?", () =>
                banUserById(review.userId, refetch, notify)
              )
            }
            size="small"
            sx={{ ml: 1, mt: 0.5, p: 0 }}
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
          sx={{ width: 0.5, maxWidth: "100px", bgcolor: review.usersThatLiked.includes(user.userId) ? 'lightgreen': undefined }}
          onClick={() =>
            reactionSubmit("/review/like", review._id, refetch, notify)
          }
          variant="outlined"
          label={review.usersThatLiked.length}
          color="success"
          icon={<ThumbUpAltIcon />}
        />
        <Chip
          clickable={true}
          sx={{ width: 0.5, ml: "5px", maxWidth: "100px", bgcolor: review.usersThatDisliked.includes(user.userId) ? 'darkred': undefined }}
          onClick={() =>
            reactionSubmit("/review/dislike", review._id, refetch, notify)
          }
          variant="outlined"
          label={review.usersThatDisliked.length}
          color="error"
          icon={<ThumbDwonAltIcon />}
        />
      </Stack>
    </Stack>
  );
}
