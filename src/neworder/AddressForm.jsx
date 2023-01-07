import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { StyledInput } from "../components/styled";

export default function AddressForm({ address, setAddress, setActiveStep }) {
  const navigate = useNavigate();

  const [newAddress, setNewAddress] = useState(address);

  function saveAddress() {
    setAddress(newAddress);
    setActiveStep((s) => s + 1);
  }

  return (
    <form>
      <StyledInput
        margin="normal"
        fullWidth
        defaultValue={address && address.street}
        id="street"
        label="Street"
        name="street"
        type="text"
        autoFocus
        onChange={(e) =>
          setNewAddress((a) => ({ ...a, street: e.target.value }))
        }
      />
      <StyledInput
        margin="normal"
        fullWidth
        defaultValue={address && address.streetNr}
        id="streetNr"
        label="Street number"
        name="streetNr"
        type="text"
        onChange={(e) =>
          setNewAddress((a) => ({ ...a, streetNr: e.target.value }))
        }
      />
      <StyledInput
        margin="normal"
        fullWidth
        defaultValue={address && address.city}
        id="city"
        label="City"
        name="city"
        type="text"
        onChange={(e) => setNewAddress((a) => ({ ...a, city: e.target.value }))}
      />
      <StyledInput
        margin="normal"
        fullWidth
        defaultValue={address && address.postalCode}
        id="postalCode"
        label="Postal code"
        name="postalCode"
        type="text"
        onChange={(e) =>
          setNewAddress((a) => ({ ...a, postalCode: e.target.value }))
        }
      />
      <Button
        sx={{ width: 0.5, my: 1 }}
        variant="outlined"
        onClick={() => navigate("/cart")}
      >
        Back
      </Button>
      <Button
        variant="contained"
        sx={{ width: 0.5, my: 1 }}
        type="submit"
        onClick={saveAddress}
        disabled={
          !newAddress.street ||
          !newAddress.streetNr ||
          !newAddress.city ||
          !newAddress.postalCode
        }
      >
        Next
      </Button>
    </form>
  );
}
