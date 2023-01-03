import { useState, useContext } from "react";
import fetch from "../hooks/fetchHooks";
import Context from "../utils/Context";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { StyledInput } from "../components/styled";

export default function AddAnswer({ questionId, refetch }) {
  const { notify } = useContext(Context);

  const [text, setText] = useState("");

  function SubmitAnswer() {
    fetch
      .post("question/answer", {
        text: text,
        questionId: questionId,
      })
      .then(({ error, message }) => {
        if (!error) {
          refetch();
          notify(message);
        }
      });
  }
  return (
    <Accordion
      sx={{
        mt: 1,
        width: 1,
        bgcolor: "secondary.main",

        ".Mui-expanded": { bgcolor: "secondary.dark" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Answer this question</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 1,
          m: 0.5,
          bgcolor: "primary.dark",
        }}
      >
        <form>
          <Stack>
            <StyledInput
              name="answer"
              label="Your answer"
              variant="outlined"
              multiline
              rows={4}
              InputProps={{
                placeholder: "Write your answer here...",
              }}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <Button
              sx={{
                mt: 1,
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
              onClick={SubmitAnswer}
              variant="contained"
              color={"success"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}
