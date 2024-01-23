import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from "react";
import fetch from "../hooks/fetchHooks";
import Context from "../utils/Context";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { StyledInput } from "../components/styled";

export default function AddReview({ productId, refetch }) {
  const { notify } = useContext(Context);

  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  function SubmitReview() {
    fetch
      .post("review/create", {
        text: text,
        stars: stars,
        productId: productId,
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
        bgcolor: "secondary.main",
        ".Mui-expanded": { bgcolor: "secondary.dark" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Add review</Typography><AddIcon sx={{ml: "5px"}}/>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          bgcolor: "primary.dark",
          m: 1,
          p: 1,
        }}
      >
        <Stack component={"form"}>
          <StyledInput
            name="review"
            label="Your review"
            variant="outlined"
            multiline
            rows={4}
            InputProps={{
              placeholder: "Write your review here...",
            }}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <Stack direction="row" sx={{ mt: 1 }}>
            <Box
              sx={{
                borderBottomLeftRadius: 15,
                border: 1,
                p: 0.5,
                mr: 1,
                borderColor: "primary.main",
              }}
            >
              <Rating
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue);
                }}
                precision={0.5}
              />
            </Box>
            <Button
              sx={{ width: 1, borderBottomRightRadius: 15 }}
              onClick={SubmitReview}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
