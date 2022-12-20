import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledInput } from "../components/styled";

export default function AddressForm({ address, setAddress, setActiveStep }) {
  const nav = useNavigate();
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
      <Button sx={{ m: 1 }} variant="outlined" onClick={() => nav("/cart")}>
        Back
      </Button>
      <Button
        variant="contained"
        sx={{ m: 1 }}
        type="submit"
        onClick={saveAddress}
      >
        Next
      </Button>
    </form>
  );
}