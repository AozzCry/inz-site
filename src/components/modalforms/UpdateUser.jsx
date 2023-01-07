import { useState, useContext } from "react";

import fetch from "../../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Typography, Box, Grid, Button, Alert } from "@mui/material";
import { StyledModal, StyledInput } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

import Context from "../../utils/Context";

export default function UpdateUser({ close, user, refetch }) {
  const { refetchUserData } = useContext(Context);
  const [alert, setAlert] = useState(null);

  const userUpdateValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Fullname is required"),
    lastname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userUpdateValidationSchema),
  });

  function updateUserSubmit(values) {
    fetch
      .patch("/user/update", {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
      })
      .then(({ error }) => {
        if (error) setAlert(error);
        else {
          refetch();
          close();
          refetchUserData();
        }
      });
  }

  return (
    <StyledModal component="main" maxWidth="xs">
      <Grid container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Update account
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
              defaultValue={user.firstname}
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
              defaultValue={user.lastname}
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
              defaultValue={user.username}
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
              defaultValue={user.email}
              id="email"
              name="email"
              label="Email"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            {alert ? <Alert severity="error">{alert}</Alert> : <></>}
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit(updateUserSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}
