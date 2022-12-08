import { useState } from "react";
import { postFetch } from "../../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Typography, Box, Grid, Button, Alert } from "@mui/material";
import { StyledModal, StyledInput } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

export default function Register({ close, setSB }) {
  const [alert, setAlert] = useState(null);

  const registerValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Fullname is required"),
    lastname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Password must be at least 2 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  async function registerSubmit(values) {
    postFetch("/register", {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    }).then(({ error, message }) => {
      if (error) {
        setAlert(error);
      } else {
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
          Register
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledInput
              fullWidth
              id="firstname"
              name="firstname"
              label="First name"
              {...register("firstname")}
              error={errors.firstname ? true : false}
              autoFocus
              helperText={errors.firstname?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledInput
              fullWidth
              id="lastname"
              name="lastname"
              label="Last name"
              {...register("lastname")}
              error={errors.lastname ? true : false}
              helperText={errors.lastname?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              fullWidth
              id="username"
              name="username"
              label="Username"
              {...register("username")}
              error={errors.username ? true : false}
              helperText={errors.username?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              fullWidth
              id="email"
              name="email"
              label="Email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              fullWidth
              name="password"
              id="password"
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>
          <Grid item xs={12}>
            {alert ? <Alert severity="error">{alert}</Alert> : <></>}
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(registerSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}
