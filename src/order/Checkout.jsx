import { useState } from "react";

import { getFetch } from "../hooks/fetchHooks";
import { useQuery } from "react-query";

import { useTheme } from "@emotion/react";

import { Container, Stepper, StepLabel, Typography, Step } from "@mui/material";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmOrder from "./ConfirmOrder";

const steps = ["Shipping address", "Payment details", "Confirm your order"];

export default function Checkout() {
  const { palette } = useTheme();
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const { status, data: user } = useQuery({
    queryKey: ["/user"],
    queryFn: getFetch,
  });

  if (status !== "success") return "Loading...";
  return (
    <Container sx={{ bgcolor: palette.primary.dark }}>
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
            address={user?.address}
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
          <Typography variant="h3" textAlign={"center"} sx={{ m: 2 }}>
            Thank you for purchase!
          </Typography>
        )}
      </>
    </Container>
  );
}
