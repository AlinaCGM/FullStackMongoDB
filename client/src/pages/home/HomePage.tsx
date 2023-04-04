import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Box, Typography, CardMedia } from "@mui/material";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProductData } from "../../redux/thunk/products";
import { productActions } from "../../redux/slice/products";
import img1 from "../../assets/iPhone.jpg";
import img2 from "../../assets/sony.png";
import bgVideo from "../../assets/ban.mp4";
import "./Home.css";
import HomeCards from "./HomeCards";

function Home() {
  const productList = useSelector(
    (state: RootState) => state.products.productList
  );

  const dispatch = useDispatch<AppDispatch>();
  const dispatchLoading = useDispatch();

  useEffect(() => {
    dispatchLoading(productActions.toggleLoading(true));
    dispatch(fetchProductData());
  }, [dispatch]);

  const rubrics = {
    // height: "120px",
    width: "30%",
    border: "3px solid grey",
    paddingInline: "10px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  };
  const fontRubrics = {
    fontSize: {
      xs: 15,
      sm: 20,
      md: 25,
      lg: 30,
    },

    marginBlock: "1px",
  };
  const phoneHero = {
    width: {
      xs: 140,
      sm: 270,
      md: 400,
      lg: 550,
      xl: 800,
    },
  };
  return (
    <Box className="home-container">
      <Box className="video">
        <video autoPlay loop muted id="video">
          <source src={bgVideo} type="video/mp4" />
        </video>
      </Box>

      <Box className="hero-container">
        <Box
          className="header-box"
          style={{
            paddingBlock: "20px",
            textAlign: "left",
            paddingLeft: "10%",
          }}
        >
          <Typography
            className="header-second header"
            sx={{
              fontSize: {
                xs: 60,
                sm: 60,
                md: 80,
                lg: 100,
              },
            }}
          >
            Mobilic
          </Typography>
          <Typography
            className="header-first header"
            sx={{
              fontSize: {
                xs: 30,
                sm: 40,
                md: 60,
                lg: 80,
              },
            }}
          >
            Expand your vision
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          display: "inline-flex",
          width: "90%",
          gap: 30,
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={phoneHero}
          component="img"
          height="auto"
          image={img1}
          alt="green iguana"
        />
        <CardMedia
          sx={phoneHero}
          component="img"
          height="auto"
          image={img2}
          alt="green iguana"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "inline-flex",
          justifyContent: "space-evenly",
          margin: "auto",
          marginBlock: "50px",
        }}
      >
        <Box style={rubrics}>
          <Typography sx={fontRubrics}>Free Shipping & Returns</Typography>
        </Box>
        <Box style={rubrics}>
          <Typography sx={fontRubrics}>100% Money Refund</Typography>
        </Box>
        <Box style={rubrics}>
          <Typography sx={fontRubrics}>60-Days Returns</Typography>
        </Box>
      </Box>
      {!productList ? (
        <Typography variant="h6" align="center" style={{ padding: "24px" }}>
          Data is loading, please wait...
        </Typography>
      ) : (
        <Box
          style={{
            width: "80%",
            height: "auto",
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 20,
          }}
        >
          {productList.map((product) => (
            <HomeCards key={product._id} product={product} />
          ))}
        </Box>
      )}
      <Box className="banner"></Box>
    </Box>
  );
}

export default Home;
