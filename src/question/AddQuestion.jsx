import { useState, useContext } from "react";
import { postFetch } from "../hooks/fetchHooks";
import Context from "../utils/Context";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { StyledInput } from "../components/styled";

export default function AddQuestion({ productId, refetch }) {
  const { palette } = useTheme();

  const { notify } = useContext(Context);

  const [text, setText] = useState("");

  function SubmitQuestion() {
    postFetch("question/create", {
      text: text,
      productId: productId,
    }).then(({ error, message }) => {
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
        bgcolor: palette.secondary.main,
        ".Mui-expanded": { bgcolor: palette.secondary.dark },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Add question</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 1,
          m: 0.5,
          bgcolor: palette.primary.dark,
        }}
      >
        <Stack component="form">
          <StyledInput
            name="question"
            label="Your question"
            variant="outlined"
            multiline
            rows={4}
            InputProps={{
              placeholder: "Write your question here...",
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
            onClick={SubmitQuestion}
            fullWidth
            variant="contained"
            color={"success"}
          >
            Submit
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
