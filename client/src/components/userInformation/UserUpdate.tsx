import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { FormikHelpers } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Container,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { userUpdate } from "../../redux/thunk/userUpdate";

export type InitialValues = {
  firstName: string;
  lastName: string;
  image: string;
};

function UserUpdate() {
  const theme = createTheme();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userInfo.userInfo);
  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    image: "",
  };
  const FormSchema = Yup.object().shape({
    firstName: Yup.string().required("Please Enter your first name"),
    lastName: Yup.string().required("Please Enter your last name"),
  });
  const submitHandler = (
    values: InitialValues,
    { resetForm }: FormikHelpers<InitialValues>
  ) => {
    dispatch(userUpdate(user._id, values));
    resetForm({ values: initialValues });
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography style={{ marginTop: "50px" }}>
        Please enter your information
      </Typography>
      <Container
        component="main"
        maxWidth="xs"
        style={{ paddingBottom: "100px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={submitHandler}
            >
              {({ errors, touched, handleChange, values }) => {
                return (
                  <Form>
                    <Box>
                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="firstName"
                        variant="filled"
                        name="firstName"
                        onChange={handleChange}
                      />
                      {errors.firstName && touched.firstName ? (
                        <Typography className="error-message">
                          {errors.firstName}
                        </Typography>
                      ) : null}
                    </Box>

                    <Box>
                      <TextField
                        id="filled-basic"
                        label="lastName"
                        variant="filled"
                        name="lastName"
                        onChange={handleChange}
                      />
                      {errors.lastName && touched.lastName ? (
                        <Typography className="error-message">
                          {errors.lastName}
                        </Typography>
                      ) : null}
                    </Box>
                    <Box>
                      <TextField
                        className="add-form-text"
                        label="Image's Link"
                        name="image"
                        onChange={handleChange}
                        value={values.image}
                      />
                      {errors.image && touched.image ? (
                        <div className="error-message">{errors.image}</div>
                      ) : null}
                    </Box>
                    <Button
                      //   onClick={() => setShowUpdateButton(false)}
                      type="submit"
                      color="primary"
                      className="button"
                    >
                      Update
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

export default UserUpdate;
