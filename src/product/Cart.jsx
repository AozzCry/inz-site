import { useContext, useState } from "react";

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
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import UserContext from "../utils/UserContext";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(UserContext);
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesMd = useMediaQuery(breakpoints.up("md"));
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
          onClick={() => setCart([])}
        >
          Clear cart
          <ClearAllIcon />
        </Button>
        Cart({cart.reduce((sum, ci) => (sum += ci.count), 0)})
      </Typography>

      <Stack direction={matchesMd ? "row" : "column"}>
        <List sx={{ width: 1 }}>
          {cart &&
            cart.map(({ product }, index) => {
              return (
                <ListItem
                  sx={{ borderTop: 1, display: "flex", flexWrap: "wrap" }}
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
                    onClick={() =>
                      setCart(cart.filter((c) => c !== cart[index]))
                    }
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
                  <Typography
                    sx={{ m: 1, fontSize: "1.5em" }}
                    color="text.primary"
                  >
                    x {cart[index].count}
                  </Typography>

                  <IconButton
                    sx={{
                      mr: 1,
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
                    <ExpandLessIcon sx={{ color: palette.action.positive }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      mr: 1,
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
                    <ExpandMoreIcon sx={{ color: palette.action.negative }} />
                  </IconButton>
                </ListItem>
              );
            })}
        </List>
        <Box sx={{ width: 1 }}>
          <Card sx={{ bgcolor: palette.secondary.main }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Sum of order:
              </Typography>
              <Typography variant="h5" component="div">
                {cart
                  .reduce((sum, ci) => sum + ci.product.price * ci.count, 0)
                  .toFixed(2) + " CUR"}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="../checkout" state={{ cart: cart }}>
                <Button variant={"contained"}>Order</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}
