import axios from "axios";
import API from "../env.jsx";

import { Typography, Box, Grid, Button } from "@mui/material";
import { StyledModal, StyledInput } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

export default function AddAddress({ close }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.request({
        method: "POST",
        url: API + "/user/address",
        withCredentials: true,
        data: {
          street: data.get("street"),
          streetNr: data.get("streetNr"),
          city: data.get("city"),
          postalCode: data.get("postalCode"),
        },
      });
      if (res.status === 200) {
        console.log(res.statusText, res.data.message);
        close();
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <StyledModal component="main" maxWidth="xs">
      <Grid container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add address
        </Typography>
        <Grid item xs>
          <Grid container direction="row-reverse">
            <Button onClick={close}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box component="form" onSubmit={handleSubmit}>
        <StyledInput
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
          type="text"
          autoFocus
        />
        <StyledInput
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street number"
          name="streetNr"
          type="text"
        />
        <StyledInput
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          type="text"
        />
        <StyledInput
          margin="normal"
          required
          fullWidth
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
          Add address
        </Button>
      </Box>
    </StyledModal>
  );
}
