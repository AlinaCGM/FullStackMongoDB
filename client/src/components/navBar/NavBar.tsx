import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  styled,
  Button,
  IconButton,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { RootState, AppDispatch } from "../../redux/store";
import { cartActions } from "../../redux/slice/cartList";
import { wishActions } from "../../redux/slice/wishList";
import { userActions } from "../../redux/slice/user";
import "../../App.css";
import "./NavBar.css";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function NavBar(props: Props) {
  const isLogIn = useSelector((state: RootState) => state.userInfo.isLogin);
  const cartList = useSelector((state: RootState) =>
    isLogIn ? state.cart.cartList : []
  );
  const wishList = useSelector((state: RootState) =>
    isLogIn ? state.wish.wishList : []
  );
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const LoginBTN = styled(Button)({
    color: "#fff",
    backgroundColor: "none",

    fontSize: "18px",
    marginTop: "-7px",
    "&:hover": {
      backgroundColor: "#fff",
      color: "black",
      border: "1px solid black",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLoginStateChange = () => {
    if (isLogIn) {
      // Log out the user
      dispatch(userActions.loginHandler(false));
    } else {
      // Clear cart and wish list and redirect to sign-up page
      dispatch(cartActions.clearCart());
      dispatch(wishActions.clearWish());
      navigate("/signUp");
      localStorage.removeItem("token");
      localStorage.removeItem("favoriteList");
    }
  };

  const drawer = (
    <Box
      style={{ height: "100%" }}
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="nav-container"
    >
      <Typography
        className="logo-first"
        textAlign="center"
        variant="h6"
        sx={{ my: 2 }}
      >
        <span>Mobilic</span>
      </Typography>
      <Divider />
      <List>
        <Link style={{ textDecoration: "none", color: "#2a2828" }} to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>HOME</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "#2a2828" }}
          to="/products"
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>PRODUCTS</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "#2a2828" }}
          to="/wishList"
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>WISH LIST</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "#2a2828" }}
          to="/shoppingCart"
        >
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>SHOPPING CART</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "#2a2828" }} to="/orders">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>ORDERS</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "#2a2828" }} to="/logIn">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>LOG IN</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "none" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h6"
            align="left"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <span className="logo-first">Mobilic</span>
          </Typography>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              display: { xs: "none", sm: "inline" },
            }}
          >
            <List
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Link style={{ textDecoration: "none", color: "#f8f8f8" }} to="/">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <AiOutlineHome />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to="/products"
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText>PRODUCTS</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to="/wishList"
              >
                <ListItem sx={{ position: "relative" }} disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <AiOutlineHeart />
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          position: "absolute",
                          top: "0",
                          fontSize: "10px",
                          color: "#fafafa",
                        }}
                      >
                        {wishList.length > 0 ? wishList.length : null}
                      </Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to="/shoppingCart"
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText>
                      <AiOutlineShoppingCart />
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          position: "absolute",
                          top: "0",
                          fontSize: "10px",
                          color: "#fafafa",
                        }}
                      >
                        {cartList.length > 0 ? cartList.length : null}
                      </Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to="/orders"
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText>
                      <HiOutlineShoppingBag />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "#f8f8f8" }}
                to={!isLogIn ? "/" : "/signUp"}
              ></Link>
              <LoginBTN onClick={handleLoginStateChange}>
                {isLogIn ? <AiOutlineLogout /> : <AiOutlineLogin />}
              </LoginBTN>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 2 }}></Box>
    </Box>
  );
}
