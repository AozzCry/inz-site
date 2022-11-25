import styled from "@emotion/styled";
import { Container, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

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

export const StyledSearch = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  ":focus-within, :hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  alignItems: "center",
  display: "flex",
  borderRadius: "25px",
  margin: theme.spacing(
    0,
    1,
    useMediaQuery(theme.breakpoints.up("md")) ? 0 : 1,
    1
  ),
  padding: theme.spacing(0, 1),
}));
