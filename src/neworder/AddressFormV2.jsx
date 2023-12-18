import { useEffect } from 'react';
import { StyledInput } from '../components/styled';

export default function AddressFormV2({ address, setAddress, setActiveStep }) {
  useEffect(() => {
    setAddress(address);
  }, []);
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
        onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
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
          setAddress((a) => ({ ...a, streetNr: e.target.value }))
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
        onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
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
          setAddress((a) => ({ ...a, postalCode: e.target.value }))
        }
      />
    </form>
  );
}
