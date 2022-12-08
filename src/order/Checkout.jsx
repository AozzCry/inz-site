import { useState, useEffect } from "react";
import { getFetch } from "../hooks/fetchHooks";
import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router";

import {
  Box,
  Container,
  Stepper,
  StepLabel,
  Button,
  Typography,
  Step,
} from "@mui/material";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ConfirmOrder from "./ConfirmOrder";
import { useQuery } from "react-query";
const steps = ["Shipping address", "Payment details", "Confirm your order"];

export default function Checkout() {
  const { palette } = useTheme();

  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) navigate("/cart");
  }, []);

  const [address, setAddress] = useState();
  const [payment, setPayment] = useState();
  const { status, data: user } = useQuery({
    queryKey: ["/user"],
    queryFn: getFetch,
  });

  const [activeStep, setActiveStep] = useState(0);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            setAddress={setAddress}
            address={user && user.address ? user.address : {}}
          />
        );
      case 1:
        return <PaymentForm setPayment={setPayment} />;
      case 2:
        return (
          <ConfirmOrder
            address={address}
            user={user}
            cart={state.cart}
            payment={payment}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

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
      {activeStep === steps.length ? (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </>
      ) : (
        <>
          {status === "success" && getStepContent(activeStep)}
          <Box sx={{ pb: 1, display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button
                variant="outlined"
                onClick={() => setActiveStep(activeStep - 1)}
                sx={{ mt: 1, ml: 1 }}
              >
                Back
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => setActiveStep(activeStep + 1)}
              sx={{ mt: 1, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? "Place order" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
