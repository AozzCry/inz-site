import { useState } from "react";

import { useQuery } from "react-query";

import { Container, Stepper, StepLabel, Typography, Step } from "@mui/material";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmOrder from "./ConfirmOrder";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";

const steps = ["Shipping address", "Payment details", "Confirm your order"];

export default function Checkout() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    streetNr: "",
    postalCode: "",
  });
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery({
    queryKey: ["/user"],
  });

  if (isLoading) return <LoadingPage what="checkout" />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <Container sx={{ bgcolor: "primary.dark" }}>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === 0 && (
          <AddressForm
            address={user.address ? user.address : address}
            setAddress={setAddress}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 1 && (
          <PaymentForm
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
          />
        )}
        {activeStep === 2 && (
          <ConfirmOrder
            setActiveStep={setActiveStep}
            address={address}
            payment={payment}
            user={user}
          />
        )}
        {activeStep === 3 && (
          <Typography variant="h3" textAlign={"center"} sx={{ p: 10 }}>
            Thank you for purchase!
          </Typography>
        )}
      </>
    </Container>
  );
}
