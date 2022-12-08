import { Grid } from "@mui/material";
import { StyledInput } from "../components/styled";

export default function PaymentForm({ setPayment }) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledInput
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            onChange={(e) =>
              setPayment((p) => ({ ...p, cardName: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledInput
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            type="card"
            title="Credit Card Number"
            placeholder="____-____-____-____"
            name="card"
            onChange={(e) =>
              setPayment((p) => ({ ...p, cardNumber: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledInput
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            onChange={(e) =>
              setPayment((p) => ({ ...p, expDate: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledInput
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value }))}
          />
        </Grid>
      </Grid>
    </>
  );
}
