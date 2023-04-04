import React, { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Rating,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import { AppDispatch, RootState } from "../../redux/store";
import fetchRelatedProductsData from "../../redux/thunk/relatedProducts";
import RelatedProducts from "./RelatedProduct";
import { cartActions } from "../../redux/slice/cartList";
import { wishActions } from "../../redux/slice/wishList";
import { Product } from "../../redux/types/type";
import { fetchProductDetailData } from "../../redux/thunk/productDetail";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function ProductDetailItem() {
  let localStorageWishList: Product[] = JSON.parse(
    localStorage.getItem("favoriteList") || "null"
  );
  if (localStorageWishList == null) localStorageWishList = [];

  const dispatch = useDispatch<AppDispatch>();

  const product = useSelector(
    (state: RootState) => state.productDetail.productDetail
  );
  const { productId } = useParams<Params>();
  useEffect(() => {
    dispatch(fetchProductDetailData(productId));
  }, [dispatch, productId]);

  const cartList = useSelector((state: RootState) => state.cart.cartList);
  const updateProduct = { ...product, quantity: 1 };
  const isInCart = cartList.some((item) => item._id === product._id);

  const isDuplicated = localStorageWishList.some(
    (wishItem) =>
      wishItem.title.toLocaleLowerCase() === product.title.toLocaleLowerCase()
  );

  const [openCart, setOpenCart] = useState(false);
  const [addCart, setAddCart] = useState(false);

  const [openFavorite, setOpenFavorite] = useState(false);
  const [addFavorite, setAddFavorite] = useState(false);

  const handleClickFavorite = () => {
    setOpenFavorite(true);
  };

  const handleAddFavorite = () => {
    setAddFavorite(true);
  };

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
    setOpenFavorite(false);
    setAddFavorite(false);
    setOpenCart(false);
    setAddCart(false);
  };

  const relatedProducts = useSelector(
    (state: RootState) => state.relatedProducts.relatedProducts
  );
  const categoryName = product.category;

  useEffect(() => {
    dispatch(fetchRelatedProductsData(categoryName));
  }, [dispatch, categoryName]);

  const relatedProductsCopy = [...relatedProducts];

  const thisProduct = relatedProductsCopy.findIndex(
    (item) => item._id === product._id
  );

  if (thisProduct !== -1) {
    relatedProductsCopy.splice(thisProduct, 1);
  }

  const firstThreeRelated = relatedProductsCopy.slice(0, 3);

  const [loading, setLoading] = useState<boolean>();
  const [loadingRelated, setLoadingRelated] = useState<boolean>();

  useEffect(() => {
    product._id === "" ? setLoading(true) : setLoading(false);
  }, [product._id]);

  useEffect(() => {
    firstThreeRelated.length < 1
      ? setLoadingRelated(true)
      : setLoadingRelated(false);
  }, [firstThreeRelated]);

  return (
    <Box>
      <Box>
        <Box
          sx={{
            flexGrow: 1,
            width: "80%",
            margin: "70px auto",
            marginBottom: "100px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                {loading ? (
                  <Skeleton
                    sx={{ height: 400 }}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <img src={product.thumbnail} width="100%" alt="img" />
                )}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item sx={{ textAlign: "left" }}>
                {loading ? (
                  <Skeleton animation="wave" height={50} width="60%" />
                ) : (
                  <Typography
                    style={{ paddingBottom: 25 }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {product.category.toUpperCase()}
                  </Typography>
                )}

                {loading ? (
                  <Skeleton animation="wave" height={30} width="40%" />
                ) : (
                  <Rating
                    name="read-only"
                    value={product.rating}
                    readOnly
                    style={{ height: 20 }}
                  />
                )}

                {loading ? (
                  <Skeleton animation="wave" height={80} width="90%" />
                ) : (
                  <Typography
                    style={{ paddingBottom: 25 }}
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={900}
                  >
                    {product.title}
                  </Typography>
                )}

                {loading ? (
                  <Skeleton animation="wave" height={200} width="90%" />
                ) : (
                  <Typography
                    style={{ paddingBottom: 50 }}
                    gutterBottom
                    variant="body1"
                    component="div"
                  >
                    {product.description}
                  </Typography>
                )}

                {loading ? (
                  <Skeleton animation="wave" height={100} width="20%" />
                ) : (
                  <Typography
                    style={{ paddingBottom: 25 }}
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={900}
                  >
                    $ {product.price}
                  </Typography>
                )}

                <Stack direction="row" spacing={2}>
                  <Button
                    style={{ width: "20%", height: "50px" }}
                    variant="contained"
                    onClick={() => {
                      isInCart
                        ? handleClickCart()
                        : dispatch(cartActions.addToCart(updateProduct)) &&
                          handleAddCart();
                    }}
                  >
                    <AiOutlineShoppingCart size="30" />
                  </Button>
                  <Button
                    style={{ width: "20%", height: "50px" }}
                    variant="outlined"
                    onClick={() => {
                      isDuplicated
                        ? handleClickFavorite()
                        : dispatch(wishActions.addFav(product)) &&
                          handleAddFavorite();
                    }}
                  >
                    <AiOutlineHeart size="20" />
                  </Button>
                </Stack>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, width: "80%", margin: "100px auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item
                sx={{
                  textAlign: "left",
                  marginBottom: "25px",
                  borderBottom: "1px solid #CCC",
                }}
              >
                <Typography variant="h6" fontWeight={900}>
                  Related products
                </Typography>
              </Item>
            </Grid>
          </Grid>

          {loadingRelated ? (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item
                  sx={{
                    boxShadow: 1,
                    width: "95%",
                    margin: "0 auto",
                    paddingTop: 3,
                    paddingBottom: 5,
                  }}
                >
                  <Skeleton animation="wave" height={400} width="100%" />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  sx={{
                    boxShadow: 1,
                    width: "95%",
                    margin: "0 auto",
                    paddingTop: 3,
                    paddingBottom: 5,
                  }}
                >
                  <Skeleton animation="wave" height={400} width="100%" />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  sx={{
                    boxShadow: 1,
                    width: "95%",
                    margin: "0 auto",
                    paddingTop: 3,
                    paddingBottom: 5,
                  }}
                >
                  <Skeleton animation="wave" height={400} width="100%" />
                </Item>
              </Grid>
            </Grid>
          ) : (
            <Box
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                justifyContent: "space-between",

                width: "100%",
              }}
            >
              {firstThreeRelated.map((product) => {
                return <RelatedProducts key={product._id} product={product} />;
              })}
            </Box>
          )}
        </Box>

        <Snackbar
          open={addFavorite}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Product added to Wishlist !
          </Alert>
        </Snackbar>

        <Snackbar
          open={openFavorite}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Product is already in Wishlist !
          </Alert>
        </Snackbar>

        <Snackbar open={addCart} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Product added in Shopping Cart !
          </Alert>
        </Snackbar>

        <Snackbar open={openCart} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Product is already in Shopping Cart !
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
