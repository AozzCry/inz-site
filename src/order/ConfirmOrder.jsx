import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function ConfirmOrder({ address, payment, user, cart }) {
  console.log(address, payment, user, cart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map(({ product, count }) => (
          <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={product.shortDescription}
            />
            <Typography variant="body2">
              {product.price}x{count}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart
              .reduce((sum, ci) => sum + ci.product.price * ci.count, 0)
              .toFixed(2) + " CUR"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          {/* <Typography gutterBottom>{address}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>
                Name on card:{payment.cardName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                Card number:{payment.cardNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                Expiration date:{payment.expDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>CVV:{payment.cvv}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
