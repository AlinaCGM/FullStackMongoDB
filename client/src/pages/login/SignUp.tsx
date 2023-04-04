import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import SignUpForm from "../../components/userForm/SignUpForm";

function SignUp() {
  return (
    <Box>
      <Box>
        <SignUpForm />
      </Box>
      <Box style={{ marginTop: "-100px" }}>
        <Typography>Already a member? </Typography>
        <Link to="/login">Please log in</Link>
      </Box>
    </Box>
  );
}

export default SignUp;
