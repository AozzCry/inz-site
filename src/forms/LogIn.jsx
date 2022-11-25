import { useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Grid, Box, Typography, Button, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { StyledModal, StyledInput } from "../styled";

export default function LogIn({ close, setUserData, setSB }) {
  const [alert, setAlert] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
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
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values) {
    try {
      const res = await axios.post(
        "/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log(res.data.message);
        setUserData({
          username: res.data.user.username,
          email: res.data.user.email,
        });
        setAlert(null);
        setSB({ open: true, message: res.data.message });
        close();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setAlert(err.response.data.message);
      } else throw err;
    }
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
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}
