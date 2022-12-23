import { useContext, useState } from "react";
import { postFetch } from "../hooks/fetchHooks";
import Context from "../utils/Context";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { StyledInput } from "../components/styled";

export default function AddReview({ productId, refetch }) {
  const { palette } = useTheme();

  const { notify } = useContext(Context);

  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  function SubmitReview() {
    postFetch("review/create", {
      text: text,
      stars: stars,
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
        <Typography>Add review</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          bgcolor: palette.primary.dark,
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
                borderColor: palette.primary.main,
              }}
            >
              <Rating
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue);
                }}
                precision={0.5}
                emptyIcon={<StarIcon />}
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
