import { useContext, useState } from "react";
import Context from "../../utils/Context";
import fetch from "../../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  IconButton,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { StyledModal, StyledInput } from "../styled";

export default function Register({ close, setOpenLogIn }) {
  const { notify } = useContext(Context);

  const [alert, setAlert] = useState(null);

  const registerValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Fullname is required"),
    lastname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email is invalid"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters")
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
    fetch
      .post("auth/register", {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(({ error, message }) => {
        if (error) {
          setAlert(error);
        } else {
          setAlert(null);
          notify(message);
          close();
        }
      });
  }

  return (
    <StyledModal component="main" maxWidth="xs">
      <Grid container>
        <Grid item sx={{ width: 0.2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Register
          </Typography>
        </Grid>
        <Grid item sx={{ width: 0.8 }}>
          <Grid container direction="row-reverse">
            <IconButton onClick={close} color="primary">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} sx={{ width: 1 }}>
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
          <Grid item xs={6} sm={6} sx={{ width: 1 }}>
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
          <Grid item xs={12} sx={{ width: 1 }}>
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
          <Grid item xs={12} sx={{ width: 1 }}>
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
          <Grid item xs={12} sx={{ width: 1 }}>
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
          <Grid item xs={12} sx={{ width: 1 }}>
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
        <Link
          href="#"
          onClick={() => {
            setOpenLogIn(true);
            close();
          }}
        >
          {"Already have an account? Log in here..."}
        </Link>
      </Box>
    </StyledModal>
  );
}
