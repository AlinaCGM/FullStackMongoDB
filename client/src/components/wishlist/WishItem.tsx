import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import {
  Alert,
  AlertTitle,
  Rating,
  Snackbar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  Stack,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { Product } from "../../redux/types/type";
import { wishActions } from "../../redux/slice/wishList";
import { cartActions } from "../../redux/slice/cartList";

type Prop = {
  product: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function WishItem({ product, setOpen }: Prop) {
  const dispatch = useDispatch<AppDispatch>();
  const removeFav = () => {
    dispatch(wishActions.removeFav(product._id));
    setOpen(true);
  };

  const cartList = useSelector((state: RootState) => state.cart.cartList);
  const updateProduct = { ...product, quantity: 1 };
  const isInCart = cartList.some((item) => item._id === product._id);
  const [openCart, setOpenCart] = useState(false);
  const [addCart, setAddCart] = useState(false);

  const handleClickCart = () => {
    setOpenCart(true);
  };
  const handleAddCart = () => {
    setAddCart(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCart(false);
    setAddCart(false);
  };
  return (
    <Box style={{ width: "500px", margin: "0 auto" }}>
      <Card
        sx={{
          width: "70%",
          margin: "0 auto",
          height: "auto",
          marginBlock: "1rem",
        }}
      >
        <CardActionArea component={Link} to={`/products/${product._id}`}>
          <Typography sx={{ paddingTop: "20px" }}>
            {product.category.toLocaleUpperCase()}
          </Typography>
          <CardMedia
            component="img"
            height="200"
            image={product.thumbnail}
            alt="green iguana"
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              style={{ height: "100px" }}
              gutterBottom
              variant="h6"
              component="div"
              fontWeight={900}
            >
              {product.title}
            </Typography>
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              sx={{ marginBottom: "40px" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              $ {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ width: "100px", margin: "20px auto" }}>
          <Stack direction={"row"} spacing={2}>
            <IconButton aria-label="addWish" onClick={removeFav}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="addCart"
              onClick={() => {
                isInCart
                  ? handleClickCart()
                  : dispatch(cartActions.addToCart(updateProduct)) &&
                    handleAddCart();
              }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ color: isInCart ? red[500] : "#474444" }}
              />
            </IconButton>
          </Stack>
        </Box>
      </Card>
      <Snackbar open={addCart} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          Item added to your cart!!
        </Alert>
      </Snackbar>
      <Snackbar open={openCart} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          The product is already in your cart!!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WishItem;
