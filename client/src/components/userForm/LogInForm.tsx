import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { userActions } from "../../redux/slice/user";

const theme = createTheme();

function LoginForm() {
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.userInfo.error);
  const navigate = useNavigate();

  type InitialValues = {
    email: string;
    password: string;
  };
  const initialValues: InitialValues = {
    email: "",
    password: "",
  };
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Try: andrea@gmail.com")
      .required("Please enter your e-mail address"),
    password: Yup.string().required("Please enter your password"),
  });

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClick = () => {
    setOpen(!open);
  };
  const showPassHandler = () => {
    setShowPass(!showPass);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const url = "https://mobilic-back-end.onrender.com/users/login";

  function getUsersData(values: InitialValues) {
    // Validate input values
    if (!values.email || !values.password) {
      console.error("Email and password are required");
      return;
    }

    axios
      .post(url, values)
      .then((response) => {
        if (response.status !== 200) {
          console.error("Server returned an error:", response.status);
          throw new Error("Server error");
        }
        return response.data;
      })
      .then((data) => {
        if (data.message === "invalid") {
          dispatch(
            userActions.errorHandler(
              "This email is not registered, please sign up"
            )
          );
          handleClick();
          return;
        } else if (data.message === "wrong password!") {
          throw new Error("Wrong password");
        } else {
          dispatch(userActions.getUserById(data.userData));
          dispatch(userActions.loginHandler(true));
          const token = data.token;
          localStorage.setItem("token", token);
          token && navigate("/user");
        }
      })
      .catch((error) => {
        console.error("An error occurred while making the request:", error);
        dispatch(userActions.errorHandler("Email is wrong!"));
        handleClick();
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#495a64" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box sx={{ mt: 1, position: "relative" }}>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={getUsersData}
            >
              {({ errors, touched, handleChange }) => {
                return (
                  <Form>
                    <Box
                      style={{
                        width: "360px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        name="email"
                        onChange={handleChange}
                        autoFocus
                      />
                      {errors.email && touched.email ? (
                        <Typography className="error-message">
                          {errors.email}
                        </Typography>
                      ) : null}
                    </Box>
                    <Box
                      style={{
                        width: "400px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        name="password"
                        type={showPass ? "text" : "password"}
                        onChange={handleChange}
                        autoFocus
                      />
                      <span className="visibility">
                        {showPass ? (
                          <IconButton onClick={showPassHandler}>
                            <VisibilityOff />
                          </IconButton>
                        ) : (
                          <IconButton onClick={showPassHandler}>
                            <Visibility />
                          </IconButton>
                        )}
                      </span>
                      {errors.password && touched.password ? (
                        <Typography className="error-message">
                          {errors.password}
                        </Typography>
                      ) : null}
                    </Box>
                    <Button type="submit" color="primary" className="button">
                      Log in
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            {error && (
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                style={{ position: "absolute", top: "55%" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {error}
                </Alert>
              </Snackbar>
            )}
          </Box>
        </Box>
        <Box style={{ marginTop: "50px", width: "330px" }}>
          <Link to="/signUp">New user? Please Sign Up</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
