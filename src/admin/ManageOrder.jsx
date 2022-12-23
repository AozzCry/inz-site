import { useContext } from "react";
import { patchFetch } from "../hooks/fetchHooks";

import {
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Button,
  useMediaQuery,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Context from "../utils/Context";
import OrderTable from "../components/order/OrderTable";
import OrderInfo from "../components/order/OrderInfo";

export default function ManageOrder({ order, refetch }) {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const { notify, confirm } = useContext(Context);

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

  function deleteOrder() {
    patchFetch("/order/delete", { orderId: order._id }).then(
      ({ error, message }) => {
        if (!error) {
          refetch();
          notify(message);
        }
      }
    );
  }

  return (
    <Accordion
      sx={{
        bgcolor: palette.primary.dark,
        m: 1,
        ".Mui-expanded": { bgcolor: palette.secondary.dark },
      }}
      key={order._id}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: palette.primary.main }} />}
      >
        <Stack sx={{ width: 1 }} direction={matchesSm ? "row" : "column"}>
          <ListItemText
            primary={new Date(order.orderDate).toLocaleDateString("pl-PL")}
            secondary={order._id}
          />
          <ListItemText
            primary={"Status: " + order.status}
            secondary={"Amount: " + order.sumPrice.toFixed(2) + " PLN"}
          />
        </Stack>
      </AccordionSummary>
      <OrderInfo address={order.address} userInfo={order.userInfo} />
      <AccordionDetails sx={{ bgcolor: palette.primary.dark }}>
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
                updateOrderStatus("delivering", "Order is delivering.")
              }
              disabled={order.status !== "awaiting fulfillment"}
            >
              Fulfill
            </Button>
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={"end"}
              onClick={() =>
                updateOrderStatus("declined", "Order has been declined.")
              }
            >
              Decline
            </Button>
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={"end"}
              onClick={() =>
                confirm("Do you want to delete this order?", deleteOrder)
              }
              disabled={
                order.status !== "declined" || order.status !== "cancelled"
              }
            >
              Delete
            </Button>
          </Stack>
          <OrderTable products={order.products} sumPrice={order.sumPrice} />
        </Stack>
      </AccordionDetails>
      <Divider />
    </Accordion>
  );
}
