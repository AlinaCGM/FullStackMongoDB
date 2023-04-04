import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

const theme = createTheme();

function SignUpForm() {
  type InitialValues = {
    firstName: string;
    email: string;
    password: string;
    image: string;
  };
  const initialValues: InitialValues = {
    firstName: "",
    email: "",
    password: "",
    image: "",
  };
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Try: andrea@gmail.com")
      .required("Please enter your e-mail address"),
    password: Yup.string().required("Please enter your password"),
  });

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#495a64" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={(values) => {
                axios
                  .post("https://mobilic-back-end.onrender.com/users", values)

                  .then((response) => {
                    navigate("/login");
                  });
              }}
            >
              {({ errors, touched, handleChange }) => {
                return (
                  <Form>
                    <Box>
                      <TextField
                        className="add-form-text"
                        label="Image's Link"
                        name="image"
                        onChange={handleChange}
                      />
                      {errors.image && touched.image ? (
                        <div className="error-message">{errors.image}</div>
                      ) : null}

                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        name="firstName"
                        onChange={handleChange}
                        autoFocus
                      />

                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        name="email"
                        onChange={handleChange}
                        autoComplete="none"
                        autoFocus
                      />
                      {errors.email && touched.email ? (
                        <Typography className="error-message">
                          {errors.email}
                        </Typography>
                      ) : null}
                    </Box>
                    <Box>
                      <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.password && touched.password ? (
                        <Typography className="error-message">
                          {errors.password}
                        </Typography>
                      ) : null}
                    </Box>
                    <Button type="submit" color="primary" className="button">
                      Sign Up
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpForm;
