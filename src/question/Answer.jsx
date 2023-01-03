import fetch from "../hooks/fetchHooks";

import { Typography, Stack, Chip, Button } from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import { useContext } from "react";
import Context from "../utils/Context";
import { reactionSubmit, banUserById, daysSince } from "../utils/functions";

export default function Answer({ answer, refetch, questionId, user }) {
  const { notify, confirm } = useContext(Context);

  function deleteAnswerSubmit() {
    fetch
      .patch("/question/answer/delete", {
        questionId: questionId,
        answerId: answer._id,
      })
      .then(({ error }) => {
        !error && refetch();
      });
  }

  return (
    <Stack
      sx={{
        border: 1,
        borderRadius: 3,
        borderColor: "primary.main",
        mb: 1,
        p: 1,
        bgcolor: "primary.dark",
      }}
    >
      <Typography variant="body1">{answer.text}</Typography>

      <Stack
        direction="row"
        sx={{ m: 1, borderTop: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h5">{answer.userUsername}</Typography>
        {user.isAdmin && (
          <Button
            onClick={() =>
              confirm("Do you want to ban this user?", () =>
                banUserById(answer.userId, refetch, notify)
              )
            }
            size="small"
            sx={{ ml: 1, mt: 0.2 }}
            variant="outlined"
            color="error"
          >
            Ban
          </Button>
        )}
        <Typography sx={{ mt: 0.7, ml: 2 }}>
          {daysSince(new Date(answer.addedDate)).toFixed()} days ago
        </Typography>
      </Stack>
      <Stack direction="row">
        {(user.isAdmin || user.userId === answer.userId) && (
          <Button
            onClick={() =>
              confirm("Do you want to delete this answer?", () =>
                deleteAnswerSubmit()
              )
            }
            size="small"
            sx={{ mr: 1 }}
            variant="outlined"
            color="warning"
          >
            Delete
          </Button>
        )}
        <Chip
          clickable={true}
          sx={{ width: 0.5 }}
          onClick={() =>
            reactionSubmit(
              "question/answer/like",
              questionId,
              refetch,
              notify,
              answer._id
            )
          }
          variant="outlined"
          label={answer.usersThatLiked.length}
          color="success"
          icon={<ThumbUpAltIcon />}
        />
        <Chip
          clickable={true}
          sx={{ width: 0.5, ml: 1 }}
          onClick={() =>
            reactionSubmit(
              "question/answer/dislike",
              questionId,
              refetch,
              notify,
              answer._id
            )
          }
          variant="outlined"
          label={answer.usersThatDisliked.length}
          color="error"
          icon={<ThumbDownAltIcon />}
        />
      </Stack>
    </Stack>
  );
}
