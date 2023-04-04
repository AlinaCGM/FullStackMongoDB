import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  Snackbar,
  Alert,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";

import { RootState, AppDispatch } from "../../redux/store";
import { cartActions } from "../../redux/slice/cartList";
import CartItem from "./CartItem";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function CartList() {
  const cartList = useSelector((state: RootState) => state.cart.cartList);
  const isLoggedIn = useSelector((state: RootState) => state.userInfo.isLogin);
  const user = useSelector((state: RootState) => state.userInfo.userInfo);

  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //create an order
  function onSubmitHandler() {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://mobilic-back-end.onrender.com/orders/${user._id}`,
        { productOrder: cartList },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        dispatch(cartActions.clearCart());
      })
      .catch((error) => {});
  }

  const handleClick = () => {
    setOpen(true);
    navigate("/orders"); // navigate to OrderItem component
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
  let total = cartList.reduce<number>((sum: number, value) => {
    return sum + value.price;
  }, 0);
  if (cartList.length === 0) {
    return (
      <Box
        style={{
          marginTop: "70px",
          color: "#717171",
        }}
      >
        <h2>Your cart is empty...</h2>
        <h2>
          Check out our
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            collection!
          </Link>
        </h2>
      </Box>
    );
  }
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
      <Box></Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          margin: "0px auto",
          marginBottom: "50px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Item sx={{ height: "100%" }}>
              <Typography variant="h5" sx={{ fontWeight: "900" }}>
                This is your Shopping Cart
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Stack direction={"column"} spacing={4} sx={{ margin: "0 auto" }}>
        {cartList.map((cart) => {
          return <CartItem key={cart._id} product={cart} />;
        })}
      </Stack>

      <Box sx={{ flexGrow: 1, width: "100%", margin: "10px auto" }}>
        <Grid container>
          <Grid item xs={12}>
            <Item sx={{ height: "100%" }}>
              <Typography variant="h5" sx={{ fontWeight: "900" }}>
                Total: $ {total.toFixed(2)}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%", margin: "10px auto" }}>
        {isLoggedIn ? (
          <Link to="/orders">
            <Button
              variant="contained"
              onClick={() => {
                handleClick();
                onSubmitHandler();
              }}
            >
              Confirm your order
            </Button>
          </Link>
        ) : (
          <p>Please log in to confirm your order.</p>
        )}
      </Box>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!!
        </Alert>
      </Snackbar>
    </Box>
  );
}
