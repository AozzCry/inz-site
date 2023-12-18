import { useState } from 'react';

import { useQuery } from 'react-query';

import { Container, Typography } from '@mui/material';

import ErrorPage from '../main/ErrorPage';
import LoadingPage from '../main/LoadingPage';
import AddressFormV2 from './AddressFormV2';
import ConfirmOrderV2 from './ConfirmOrderV2';
import PaymentFormV2 from './PaymentFormV2';

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

  const [finished, setFinished] = useState(false);
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
      <>
        {!finished ? (
          <>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              sx={{ padding: '10px' }}
            >
              Checkout
            </Typography>
            <AddressFormV2
              address={user.address ? user.address : address}
              setAddress={setAddress}
            />

            <PaymentFormV2 payment={payment} setPayment={setPayment} />

            <ConfirmOrderV2
              address={address}
              payment={payment}
              user={user}
              setFinished={setFinished}
            />
          </>
        ) : (
          <Typography variant="h3" textAlign={'center'} sx={{ p: 10 }}>
            Thank you for purchase!
          </Typography>
        )}
      </>
    </Container>
  );
}
