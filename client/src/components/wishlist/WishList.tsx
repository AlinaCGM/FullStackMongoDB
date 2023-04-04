import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Paper,
  AlertTitle,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

import WishItem from "./WishItem";
import { Product } from "../../redux/types/type";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function WishList() {
  let localStorageWishList: Product[] = JSON.parse(
    localStorage.getItem("favoriteList") || "null"
  );
  if (localStorageWishList == null) localStorageWishList = [];

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      style={{
        width: "90%",
        marginTop: "70px",
        marginInline: "auto",
        marginBottom: "100px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          margin: "0px auto",
          marginBottom: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Item sx={{ height: "100%" }}>
              <Typography variant="h5" sx={{ fontWeight: "900" }}>
                This is your Wishlist
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ display: "inline-flex", flexWrap: "wrap" }}>
        {localStorageWishList.map((item) => (
          <WishItem setOpen={setOpen} key={item._id} product={item} />
        ))}
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          Item removed from favorites
        </Alert>
      </Snackbar>
    </Box>
  );
}
