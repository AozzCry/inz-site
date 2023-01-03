import fetch from "../../hooks/fetchHooks";

import { Typography, Box, Grid, Button } from "@mui/material";
import { StyledModal, StyledInput } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

export default function AddAddress({ close, address, refetch }) {
  function addAddressSubmit(event) {
    event.preventDefault();
    fetch
      .put(
        "/user/address",
        Object.fromEntries(new FormData(event.currentTarget))
      )
      .then(({ error }) => {
        if (!error) {
          refetch();
          close();
        }
      });
  }

  return (
    <StyledModal component="main" maxWidth="xs">
      <Grid container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {address ? "Change address" : "Add address"}
        </Typography>
        <Grid item xs>
          <Grid container direction="row-reverse">
            <Button onClick={close}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box component="form" onSubmit={addAddressSubmit}>
        <StyledInput
          margin="normal"
          fullWidth
          defaultValue={address && address.street}
          id="street"
          label="Street"
          name="street"
          type="text"
          autoFocus
        />
        <StyledInput
          margin="normal"
          fullWidth
          defaultValue={address && address.streetNr}
          id="streetNr"
          label="Street number"
          name="streetNr"
          type="text"
        />
        <StyledInput
          margin="normal"
          fullWidth
          defaultValue={address && address.city}
          id="city"
          label="City"
          name="city"
          type="text"
        />
        <StyledInput
          margin="normal"
          fullWidth
          defaultValue={address && address.postalCode}
          id="postalCode"
          label="Postal code"
          name="postalCode"
          type="text"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
}
