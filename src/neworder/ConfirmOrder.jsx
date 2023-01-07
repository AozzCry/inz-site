import { useContext, useState } from "react";
import Context from "../utils/Context";
import fetch from "../hooks/fetchHooks";

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
import { Link } from "react-router-dom";

export default function ConfirmOrder({
  setActiveStep,
  address,
  payment,
  user,
}) {
  const matchesXs = useMediaQuery(useTheme().breakpoints.up("xs"));
  const matchesSm = useMediaQuery(useTheme().breakpoints.up("sm"));

  const { notify, cart, setCart, confirm } = useContext(Context);
  const [errorList, setErrorList] = useState([]);

  const sumPrice = cart
    .reduce((sum, cartItem) => sum + cartItem.productPrice * cartItem.count, 0)
    .toFixed(2);

  function submitOrder() {
    fetch
      .post("/order/create", {
        products: cart,
        sumPrice: sumPrice,
        userId: user._id,
        userInfo: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
        },
        address: address,
      })
      .then(({ error, message }) => {
        if (error && Array.isArray(error)) {
          setErrorList(error);
        } else if (!error) {
          setCart([]);
          notify(message);
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
        {cart.map((cartItem) => (
          <ListItem
            key={cartItem.productId}
            sx={{ p: 1, bgcolor: "secondary.dark", borderRadius: 3 }}
          >
            <ListItemText
              primary={cartItem.productName}
              secondary={cartItem.productShortDescription}
            />
            <Typography variant="body2">
              {cartItem.productPrice} x {cartItem.count}
            </Typography>
          </ListItem>
        ))}

        <ListItem
          sx={{ py: 1, px: 0, borderTop: 1, borderColor: "primary.main" }}
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
              color: "text.primary",
              border: 1,
              p: 1,
              borderRadius: 3,
              borderColor: "primary.main",
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
              color: "text.primary",
              border: 1,
              p: 1,
              ml: matchesXs ? 1 : 0,
              mt: matchesXs ? 0 : 1,
              borderRadius: 3,
              borderColor: "primary.main",
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
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
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
            onClick={() => confirm("Do you confirm order?", submitOrder)}
          >
            Confirm
          </Button>
        </Stack>
      </Grid>
      <Stack sx={{ p: 1 }}>
        {errorList &&
          errorList.map((e) => (
            <Button
              component={Link}
              to="../cart"
              variant="outlined"
              color="error"
              key={e}
            >
              {e}
            </Button>
          ))}
      </Stack>
    </>
  );
}
