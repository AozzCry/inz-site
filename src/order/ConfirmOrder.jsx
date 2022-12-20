import { useContext } from "react";
import Context from "../utils/Context";

import { postFetch } from "../hooks/fetchHooks";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

export default function ConfirmOrder({
  setActiveStep,
  address,
  payment,
  user,
}) {
  const { palette, breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.up("xs"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const { setSB, cart, setCart } = useContext(Context);

  const sumPrice = cart
    .reduce((sum, ci) => sum + ci.product.price * ci.count, 0)
    .toFixed(2);

  function submitOrder() {
    postFetch("/order/create", {
      products: cart.map((ci) => {
        return {
          productName: ci.product.name,
          productPrice: ci.product.price,
          productId: ci.product._id,
          count: ci.count,
        };
      }),
      sumPrice: sumPrice,
      userId: user._id,
      userInfo: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      },
      address: address,
    }).then(({ error, message }) => {
      if (!error) {
        setCart([]);
        setSB({ open: true, message: message });
        setActiveStep((s) => s + 1);
      }
    });
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map(({ product, count }) => (
          <ListItem
            key={product._id}
            sx={{ p: 1, bgcolor: palette.secondary.dark, borderRadius: 3 }}
          >
            <ListItemText
              primary={product.name}
              secondary={product.shortDescription}
            />
            <Typography variant="body2">
              {product.price} x {count}
            </Typography>
          </ListItem>
        ))}

        <ListItem
          sx={{ py: 1, px: 0, borderTop: 1, borderColor: palette.primary.main }}
        >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {sumPrice + " PLN"}
          </Typography>
        </ListItem>
      </List>
      <Grid>
        <Stack display={"flex"} direction={matchesXs ? "row" : "column"}>
          <Box
            sx={{
              flexGrow: 1,
              color: palette.text.primary,
              border: 1,
              p: 1,
              borderRadius: 3,
              borderColor: palette.primary.main,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Delivery address:
            </Typography>
            <List>
              <ListItem> Street: {address.street}</ListItem>
              <ListItem> Street number: {address.streetNr}</ListItem>
              <ListItem> City: {address.city}</ListItem>
              <ListItem> Postal code: {address.postalCode}</ListItem>
            </List>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              color: palette.text.primary,
              border: 1,
              p: 1,
              ml: matchesXs ? 1 : 0,
              mt: matchesXs ? 0 : 1,
              borderRadius: 3,
              borderColor: palette.primary.main,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Recipient details:
            </Typography>
            <List>
              <ListItem> First name: {user.firstname}</ListItem>
              <ListItem> Last name: {user.lastname}</ListItem>
              <ListItem> Usernmae: {user.username}</ListItem>
              <ListItem> Email: {user.email}</ListItem>
            </List>
          </Box>
        </Stack>
        <Stack direction={matchesSm ? "row" : "column"}>
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={6}
            sx={{
              mt: 1,
              p: 1,
              borderRadius: 4,
              border: 1,
              borderColor: palette.primary.main,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  Name on card: {payment.cardName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  Card number: {payment.cardNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  Expiration date: {payment.expDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>CVV: {payment.cvv}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            sx={{ height: 40, m: 1 }}
            onClick={() => setActiveStep((s) => s - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ height: 40, m: 1 }}
            onClick={submitOrder}
          >
            Confirm
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
