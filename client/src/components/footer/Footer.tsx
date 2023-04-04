import { Container, Box, Typography, Paper } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import Stack from "@mui/material/Stack";

export default function Footer() {
  return (
    <div className="footer">
      <Paper
        sx={{
          width: "100%",
          height: "70px",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#fffffd",
        }}
        component="footer"
        square
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              color: "#373838",
              my: 1,
            }}
          >
            <Stack direction={"column"}>
              <div className="icon">
                <a
                  href="https://github.com/AlinaCGM"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon
                    sx={{
                      marginLeft: "22px",
                      marginRight: "22px",
                      color: "#373838",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/alina-samoteev-627836a5/ "
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon
                    sx={{
                      marginLeft: "22px",
                      marginRight: "22px",
                      color: "#373838",
                    }}
                  />
                </a>

                <a
                  href="https://www.samoteev.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <CoPresentIcon
                    sx={{
                      marginLeft: "22px",
                      marginRight: "22px",
                      color: "#373838",
                    }}
                  />
                </a>
              </div>

              <Typography variant="caption" color="#373838">
                &copy; FullStack by Alina - 2023
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Paper>
    </div>
  );
}
