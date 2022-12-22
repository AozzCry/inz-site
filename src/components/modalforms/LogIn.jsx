import { useContext, useState } from "react";
import Context from "../../utils/Context";

import { postFetch } from "../../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Grid, Box, Typography, Button, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { StyledModal, StyledInput } from "../styled";

export default function LogIn({ close, setUserData }) {
  const [alert, setAlert] = useState(null);
  const { setSB } = useContext(Context);
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email is invalid"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Password must be at least 2 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  function loginSubmit(values) {
    postFetch("auth/login", {
      email: values.email,
      password: values.password,
    }).then(({ error, message, data }) => {
      if (error) {
        setAlert(error);
      } else {
        setUserData({
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
          userId: data.userId,
        });
        setAlert(null);
        setSB({ open: true, message: message });
        close();
      }
    });
  }

  return (
    <StyledModal component="main" maxWidth="xs">
      <Grid container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Log in
        </Typography>
        <Grid item xs>
          <Grid container direction="row-reverse">
            <Button onClick={close}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box component="form">
        <StyledInput
          margin="normal"
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          autoFocus
        />
        <StyledInput
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
        />
        {alert ? <Alert severity="error">{alert}</Alert> : <></>}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(loginSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}
