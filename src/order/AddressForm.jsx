import { useEffect, useRef, useState } from "react";
import { StyledInput } from "../components/styled";

export default function AddressForm({ address, setAddress }) {
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
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
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
    </form>
  );
}
