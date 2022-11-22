import styled from "@emotion/styled";
import { Container, TextField } from "@mui/material";

export const StyledModal = styled(Container)(({ theme }) => ({
  position: "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.secondary.main,
  border: "3px solid",
  borderColor: theme.palette.secondary.light,
  boxShadow: 24,
  borderRadius: "20px",
  padding: theme.spacing(2),
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: theme.palette.primary.light,
  },
  "& input": {
    color: theme.palette.text.white,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
