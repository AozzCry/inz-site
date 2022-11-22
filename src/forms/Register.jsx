import { useState } from "react";
import axios from "axios";
import API from "../env.jsx";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Typography, Box, Grid, Button, Alert } from "@mui/material";
import { StyledModal, StyledInput } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

export default function Register({ close, setSB }) {
  const [alert, setAlert] = useState(null);

  const validationSchema = Yup.object().shape({
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
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const res = await axios.request({
        method: "POST",
        url: API + "/register",
        withCredentials: true,
        data: {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          email: values.email,
          password: values.password,
        },
      });
      if (res.status === 201) {
        console.log(res.statusText, res.data.message);
        setAlert(null);
        setSB({ open: true, message: res.data.message });
        close();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setAlert(err.response.data.message);
      } else throw err;
    }
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </StyledModal>
  );
}
