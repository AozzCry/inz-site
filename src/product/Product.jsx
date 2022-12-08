import { useContext } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import UserContext from "../utils/UserContext";
import { useTheme } from "@emotion/react";

export default function Product({ product }) {
  const { cart, setCart } = useContext(UserContext);
  function addToCart(product) {
    if (!cart.some((p) => p.product._id === product._id))
      setCart([...cart, { product: product, count: 1 }]);
  }
  const { palette } = useTheme();
  return (
    <Card
      sx={{ bgcolor: palette.secondary.main, p: 1, mt: 1, mr: 1, flexGrow: 1 }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" alt="product image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
            {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained">
          Share
        </Button>
        <Button
          onClick={() => addToCart(product)}
          size="small"
          variant="contained"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
