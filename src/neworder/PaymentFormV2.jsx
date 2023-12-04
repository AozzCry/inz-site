import { useState } from 'react';

import { Button, Grid } from '@mui/material';

import { StyledInput } from '../components/styled';

export default function PaymentFormV2({ setActiveStep, payment, setPayment }) {
  const [newPayment, setNewPayment] = useState(payment);
  function savePayment() {
    setPayment(newPayment);
    setActiveStep((s) => s + 1);
  }
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
              setNewPayment((p) => ({ ...p, cardName: e.target.value }))
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
              setNewPayment((p) => ({ ...p, cardNumber: e.target.value }))
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
              setNewPayment((p) => ({ ...p, expDate: e.target.value }))
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
            onChange={(e) =>
              setNewPayment((p) => ({ ...p, cvv: e.target.value }))
            }
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        sx={{ my: 1, width: 0.5 }}
        onClick={() => setActiveStep((s) => s - 1)}
      >
        Back
      </Button>
      <Button
        variant="contained"
        sx={{ my: 1, width: 0.5 }}
        onClick={savePayment}
      >
        Save
      </Button>
    </>
  );
}
