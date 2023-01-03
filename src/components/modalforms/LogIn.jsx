import { useContext, useState } from "react";
import Context from "../../utils/Context";
import fetch from "../../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Grid, Box, Typography, Button, Alert, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { StyledModal, StyledInput } from "../styled";

export default function LogIn({ close, setUserData, setOpenRegister }) {
  const { notify } = useContext(Context);

  const [alert, setAlert] = useState(null);

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
    fetch
      .post("auth/login", {
        email: values.email,
        password: values.password,
      })
      .then(({ error, message, data }) => {
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
            Log in
          </Typography>
        </Grid>
        <Grid item sx={{ width: 0.8 }}>
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
        <Link
          href="#"
          onClick={() => {
            setOpenRegister(true);
            close();
          }}
        >
          {"Don't have an account? Register here..."}
        </Link>
      </Box>
    </StyledModal>
  );
}
