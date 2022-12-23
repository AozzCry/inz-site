import { useContext } from "react";

import { NavLink } from "react-router-dom";

import {
  Typography,
  Box,
  Container,
  Stack,
  Button,
  List,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import Context from "../utils/Context";
import CartProduct from "./CartProduct";

export default function Cart() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesMd = useMediaQuery(breakpoints.up("md"));

  const { cart, setCart, userData, confirm } = useContext(Context);

  return (
    <Container
      disableGutters={!matchesSm ? true : false}
      sx={{ pt: 1, bgcolor: palette.primary.dark }}
    >
      <Stack direction="row">
        <Button
          sx={{
            mx: 1,
            borderColor: palette.action.delete,
            color: palette.action.delete,
          }}
          title="Clear cart"
          variant="outlined"
          onClick={() =>
            confirm("Do you want to clear your cart?", () => setCart([]))
          }
        >
          {matchesSm && "Clear cart"}
          <ClearAllIcon />
        </Button>
        <Typography variant="h4">
          Cart({cart.reduce((sum, ci) => sum + ci.count, 0)})
        </Typography>
      </Stack>
      <Stack direction={matchesMd ? "row" : "column"}>
        <List sx={{ width: 1 }}>
          {cart &&
            cart.map(({ product }, index) => {
              return (
                <CartProduct
                  key={product._id}
                  index={index}
                  product={product}
                />
              );
            })}
        </List>
        <Box sx={{ width: 1 }}>
          <Card sx={{ bgcolor: palette.secondary.dark, m: 1 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Sum of order:
              </Typography>
              <Typography variant="h5" component="div">
                {cart
                  .reduce((sum, ci) => sum + ci.product.price * ci.count, 0)
                  .toFixed(2) + " PLN"}
              </Typography>
            </CardContent>
            <CardActions>
              {userData.email ? (
                <Button
                  title="Order"
                  sx={{ bgcolor: palette.action.positive }}
                  to={cart.length > 0 ? "../checkout" : "#"}
                  component={NavLink}
                  variant={"contained"}
                  disabled={cart.length > 0 && userData.email ? false : true}
                >
                  Order
                </Button>
              ) : (
                <Typography variant="body1" sx={{ m: 1 }}>
                  You must be logged in to order.
                </Typography>
              )}
            </CardActions>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}
