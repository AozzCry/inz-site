import { useState } from 'react';

import { useQuery } from 'react-query';

import { Container, Typography } from '@mui/material';

import ErrorPage from '../main/ErrorPage';
import LoadingPage from '../main/LoadingPage';
import AddressFormV2 from './AddressFormV2';
import ConfirmOrderV2 from './ConfirmOrderV2';
import PaymentFormV2 from './PaymentFormV2';

const steps = ['Shipping address', 'Payment details', 'Confirm your order'];

export default function CheckoutV2() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    streetNr: '',
    postalCode: '',
  });
  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [activeStep, setActiveStep] = useState(0);

  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery({
    queryKey: ['/user'],
  });

  if (isLoading) return <LoadingPage what="checkout" />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <Container sx={{ bgcolor: 'primary.dark' }}>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <>
        <AddressFormV2
          address={user.address ? user.address : address}
          setAddress={setAddress}
          setActiveStep={setActiveStep}
        />

        <PaymentFormV2
          setActiveStep={setActiveStep}
          payment={payment}
          setPayment={setPayment}
        />

        <ConfirmOrderV2
          setActiveStep={setActiveStep}
          address={address}
          payment={payment}
          user={user}
        />

        <Typography variant="h3" textAlign={'center'} sx={{ p: 10 }}>
          Thank you for purchase!
        </Typography>
      </>
    </Container>
  );
}
