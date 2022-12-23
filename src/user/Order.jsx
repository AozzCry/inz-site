import { patchFetch } from "../hooks/fetchHooks";

import {
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useContext } from "react";
import Context from "../utils/Context";

import OrderTable from "../components/order/OrderTable";
import OrderInfo from "../components/order/OrderInfo";

export default function ManageOrder({ order, refetch }) {
  const { palette, breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.up("xs"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const { notify } = useContext(Context);

  function updateOrderStatus(status, successMessage) {
    patchFetch("/order/status", { orderId: order._id, status: status }).then(
      ({ error }) => {
        if (!error) {
          refetch();
          notify(successMessage);
        }
      }
    );
  }

  return (
    <Accordion sx={{ bgcolor: palette.secondary.dark, m: 1 }} key={order._id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: palette.primary.main }} />}
      >
        <Stack sx={{ width: 1 }} direction={matchesXs ? "row" : "column"}>
          <ListItemText
            primary={new Date(order.orderDate).toLocaleDateString("pl-PL")}
            secondary={order._id}
          />
          <ListItemText
            primary={"Status: " + order.status}
            secondary={"Amount: " + order.sumPrice.toFixed(2)}
          />
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ bgcolor: palette.primary.dark }}>
        <OrderInfo address={order.address} userInfo={order.userInfo} />
        <Stack direction={matchesSm ? "row" : "column"}>
          <Stack
            direction={!matchesSm ? "row" : "column"}
            sx={{ border: 1, borderRadius: 4, pt: matchesSm ? 1 : 0 }}
          >
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={"end"}
              onClick={() =>
                updateOrderStatus(
                  "awaiting fulfillment",
                  "Order is awaiting fulfillment."
                )
              }
              disabled={order.status !== "awaiting payment"}
            >
              Pay
            </Button>
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={"end"}
              onClick={() =>
                updateOrderStatus("completed", "Order has been completed.")
              }
              disabled={order.status !== "delivering"}
            >
              Pickup
            </Button>
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={"end"}
              onClick={() =>
                updateOrderStatus("cancelled", "Order has been cancelled.")
              }
              disabled={
                order.status === "declined" ||
                order.status === "cancelled" ||
                order.status === "completed"
              }
            >
              Cancel
            </Button>
          </Stack>
          <OrderTable products={order.products} sumPrice={order.sumPrice} />
        </Stack>
      </AccordionDetails>
      <Divider />
    </Accordion>
  );
}
