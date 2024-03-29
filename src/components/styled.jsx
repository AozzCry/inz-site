import styled from "@emotion/styled";
import { Container, TextField } from "@mui/material";

export const StyledModal = styled(Container)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.text.primary,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.secondary.main,
  border: "3px solid",
  borderColor: theme.palette.primary.light,
  boxShadow: 24,
  borderRadius: "20px",
  padding: 15,
  overflowY: "auto",
  maxHeight: "90%",
}));

export const StyledInput = styled(TextField)(({ theme }) => ({

  marginTop: 8,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light,
    },

  },

  "&.MuiFormControl-root": {
    label: {
      color: "grey",
    },
  },
}));

export const StyledSearch = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  ":focus-within, :hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  alignItems: "center",
  display: "flex",
  borderRadius: "25px",
  margin: theme.spacing(0.75, 1, 0.75, 1),
  padding: theme.spacing(0.5, 2),
}));
