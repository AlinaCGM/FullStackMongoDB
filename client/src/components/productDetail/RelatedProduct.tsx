import { Link } from "react-router-dom";
import { Box, Button, Typography, Rating, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Product } from "../../redux/types/type";

type RelatedProduct = {
  product: Product;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function RelatedProducts({ product }: RelatedProduct) {
  return (
    <Box style={{ marginInline: "auto", position: "relative" }}>
      <Item
        sx={{
          boxShadow: 1,
          width: {
            xs: 180,
            sm: 150,
            md: 200,
            lg: 350,
          },
          height: {
            xs: 350,
            sm: 350,
            md: 400,
            lg: 550,
          },

          paddingTop: 3,
          paddingBottom: 3,
          marginTop: 3,
        }}
      >
        <img src={product.thumbnail} width="100%" object-fit="fill" alt="img" />
        <Typography
          style={{ paddingBottom: 2, paddingTop: 15, height: "50px" }}
          gutterBottom
          variant="body1"
          component="div"
          fontWeight={900}
        >
          {product.title}
        </Typography>
        <Rating
          name="read-only"
          value={product.rating}
          readOnly
          style={{ paddingBottom: 25, height: "30px" }}
        />
        <Typography
          style={{ paddingBottom: 15, height: "30px" }}
          gutterBottom
          variant="body1"
          component="div"
          fontWeight={900}
        >
          $ {product.price}
        </Typography>
        <Box
          style={{
            width: "100%",
            height: "50px",
            position: "absolute",
            bottom: "5px",
          }}
        >
          <Button
            style={{ height: "80%", padding: "5px", marginInline: "auto" }}
            variant="contained"
            component={Link}
            to={`/products/${product._id}`}
          >
            View Product
          </Button>
        </Box>
      </Item>
    </Box>
  );
}
