import { useContext } from "react";

import { NavLink } from "react-router-dom";

import {
  Typography,
  Box,
  Container,
  Stack,
  ListItem,
  ListItemText,
  Button,
  List,
  Card,
  CardContent,
  CardActions,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import Context from "../utils/Context";

export default function Cart() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesMd = useMediaQuery(breakpoints.up("md"));

  const { setSB, cart, setCart, userData } = useContext(Context);

  return (
    <Container sx={{ bgcolor: palette.primary.dark }}>
      <Typography variant="h4">
        <Button
          sx={{
            mx: 1,
            borderColor: palette.action.delete,
            color: palette.action.delete,
          }}
          variant="outlined"
          onClick={() => {
            setCart([]);
            setSB({
              open: true,
              message: "Product cleared.",
            });
          }}
        >
          Clear cart
          <ClearAllIcon />
        </Button>
        Cart({cart.reduce((sum, ci) => sum + ci.count, 0)})
      </Typography>

      <Stack direction={matchesMd ? "row" : "column"}>
        <List sx={{ width: 1 }}>
          {cart &&
            cart.map(({ product }, index) => {
              return (
                <ListItem
                  sx={{
                    p: 1,
                    border: 1,
                    borderRadius: 3,
                    borderColor: palette.primary.main,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                  key={index}
                  disablePadding
                >
                  {!matchesSm && (
                    <ListItemText sx={{ minWidth: 1 }} primary={product.name} />
                  )}
                  <IconButton
                    sx={{
                      mr: 1,
                      border: 2,
                      borderColor: palette.action.delete,
                    }}
                    onClick={() => {
                      setCart(cart.filter((c) => c !== cart[index]));
                      setSB({
                        open: true,
                        message: "Product removed from cart.",
                      });
                    }}
                  >
                    <DeleteIcon sx={{ color: palette.action.delete }} />
                  </IconButton>
                  {matchesSm && (
                    <ListItemText
                      primary={product.name}
                      secondary={product.shortDescription}
                    />
                  )}
                  <ListItemText
                    align="right"
                    primary={product.price.toFixed(2) + " CUR"}
                  />
                  <Stack direction="row">
                    <IconButton
                      sx={{
                        mx: 1,
                        border: 2,
                        borderColor: palette.action.negative,
                      }}
                      size="small"
                      disabled={cart[index].count > 1 ? false : true}
                      onClick={() => {
                        setCart(() => {
                          let newCart = [...cart];
                          newCart[index].count -= 1;
                          return newCart;
                        });
                      }}
                    >
                      <ArrowBackIosNewIcon
                        sx={{ color: palette.action.negative }}
                      />
                    </IconButton>
                    <Typography sx={{ fontSize: "1.5em" }} color="text.primary">
                      {cart[index].count}
                    </Typography>
                    <IconButton
                      sx={{
                        mx: 1,
                        border: 2,
                        borderColor: palette.action.positive,
                      }}
                      size="small"
                      disabled={
                        cart[index].count < cart[index].product.quantity
                          ? false
                          : true
                      }
                      onClick={() => {
                        setCart(() => {
                          let newCart = [...cart];
                          newCart[index].count += 1;
                          return newCart;
                        });
                      }}
                    >
                      <ArrowForwardIosIcon
                        sx={{ color: palette.action.positive }}
                      />
                    </IconButton>
                  </Stack>
                </ListItem>
              );
            })}
        </List>
        <Box sx={{ width: 1 }}>
          <Card sx={{ bgcolor: palette.secondary.main, m: 1 }}>
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
                  to={cart.length > 0 ? "../checkout" : "#"}
                  component={NavLink}
                  variant={"contained"}
                  disabled={cart.length > 0 && userData.email ? false : true}
                >
                  Order
                </Button>
              ) : (
                <Typography variant="h6" sx={{ m: 1 }}>
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
