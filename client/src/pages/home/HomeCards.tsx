import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Rating,
} from "@mui/material";

import { Product } from "../../redux/types/type";

type Props = {
  product: Product;
};

export default function HomeCards({ product }: Props) {
  return (
    <Card
      sx={{
        maxWidth: {
          xs: 350,
          sm: 400,
          md: 350,
          lg: 345,
        },
        height: {
          xs: 400,
          sm: 400,
          md: 450,
          lg: 400,
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={product.thumbnail}
          sx={{ objectFit: "contain" }}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ height: "70px" }}
          >
            {product.description}
          </Typography>

          <Rating name="read-only" value={product.rating} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
