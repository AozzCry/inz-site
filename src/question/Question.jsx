import {
  Typography,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

import { useContext } from "react";
import Context from "../utils/Context";

import AddAnswer from "./AddAnswer";
import Answer from "./Answer";
import {
  banUserById,
  daysSince,
  deleteDocument,
  reactionSubmit,
} from "../utils/functions";

export default function Question({ question, refetch, user }) {
  const { notify, confirm } = useContext(Context);

  return (
    <Stack
      sx={{
        border: 1,
        borderColor: "primary.main",
        borderRadius: 5,
        m: 1,
        p: 1,
        bgcolor: "primary.dark",
      }}
    >
      <Typography variant="body1" sx={{ m: 1 }}>
        {question.text}
      </Typography>

      <Stack
        direction="row"
        sx={{ m: 1, borderTop: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h5">{question.userUsername}</Typography>
        {user.isAdmin && (
          <Button
            onClick={() =>
              confirm("Do you want to ban this user?", () =>
                banUserById(question.userId, refetch, notify)
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
          {daysSince(new Date(question.addedDate)).toFixed()} days ago
        </Typography>
      </Stack>
      <Stack direction="row">
        {(user.isAdmin || user.userId === question.userId) && (
          <Button
            onClick={() =>
              confirm("Do you want to delete this question?", () =>
                deleteDocument("question", question._id, refetch, notify)
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
            reactionSubmit("question/like", question._id, refetch, notify)
          }
          variant="outlined"
          label={question.usersThatLiked.length}
          color="success"
          icon={<ThumbUpAltIcon />}
        />
        <Chip
          clickable={true}
          sx={{ width: 0.5, ml: 1 }}
          onClick={() =>
            reactionSubmit("question/dislike", question._id, refetch, notify)
          }
          variant="outlined"
          label={question.usersThatDisliked.length}
          color="error"
          icon={<ThumbDownAltIcon />}
        />
      </Stack>
      {user.isAdmin === false && (
        <Stack direction="row">
          <SubdirectoryArrowRightIcon
            sx={{ fontSize: 50, color: "primary.main" }}
          />
          <AddAnswer
            productId={question.productId}
            refetch={refetch}
            questionId={question._id}
          />
        </Stack>
      )}
      {question.answers.length > 0 && (
        <Stack direction="row">
          <SubdirectoryArrowRightIcon
            sx={{ fontSize: 50, color: "primary.main" }}
          />
          <Accordion
            sx={{
              mt: 1,
              width: 1,
              bgcolor: "secondary.main",
              ".Mui-expanded": { bgcolor: "secondary.dark" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1">
                Show answers ({question.answers.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ m: 0.5, p: 1, bgcolor: "primary.dark" }}>
              {question.answers.map((answer) => (
                <Answer
                  user={{ userId: user.userId, isAdmin: user.isAdmin }}
                  key={answer._id}
                  answer={answer}
                  refetch={refetch}
                  questionId={question._id}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </Stack>
  );
}
