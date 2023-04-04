import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { red } from "@mui/material/colors";
import {
  IconButton,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Stack,
  Snackbar,
  AlertTitle,
  Alert,
  Box,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { Product, ProductDetail } from "../../redux/types/type";
import { wishActions } from "../../redux/slice/wishList";
import { cartActions } from "../../redux/slice/cartList";

export default function ProductItem({ product }: ProductDetail) {
  let localStorageWishList: Product[] = JSON.parse(
    localStorage.getItem("favoriteList") || "null"
  );
  if (localStorageWishList == null) localStorageWishList = [];

  const dispatch = useDispatch<AppDispatch>();
  const isDuplicated = localStorageWishList.some(
    (wishItem) =>
      wishItem.title.toLocaleLowerCase() === product.title.toLocaleLowerCase()
  );
  const isFavorite = localStorageWishList.some(
    (element) => element._id === product._id
  );

  const updateProduct = { ...product, quantity: 1 };
  const cartList = useSelector((state: RootState) => state.cart.cartList);
  const isInCart = cartList.some((item) => item._id === product._id);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [addFavorite, setAddFavorite] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const handleClickFavorite = () => {
    setOpenFavorite(true);
  };
  const handleClickCart = () => {
    setOpenCart(true);
  };
  const handleAddFavorite = () => {
    setAddFavorite(true);
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
    setOpenFavorite(false);
    setAddFavorite(false);
    setOpenCart(false);
    setAddCart(false);
  };
  return (
    <Box style={{ margin: "0 auto" }}>
      <Card
        sx={{
          width: {
            sm: 250,
            md: 350,
            lg: 350,
            xl: 400,
          },
          margin: " auto",
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
            <IconButton
              aria-label="addWish"
              sx={{ color: isFavorite ? red[500] : "#474444" }}
              onClick={() => {
                isDuplicated
                  ? handleClickFavorite()
                  : dispatch(wishActions.addFav(product)) &&
                    handleAddFavorite();
              }}
            >
              <FavoriteBorderIcon />
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
      <Snackbar
        open={addFavorite}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          Item added to favorites!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openFavorite}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          The product is already inside favorite list!
        </Alert>
      </Snackbar>
      <Snackbar open={addCart} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          Item added to your cart!
        </Alert>
      </Snackbar>

      <Snackbar open={openCart} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          The product is already in your cart!
        </Alert>
      </Snackbar>
    </Box>
  );
}
