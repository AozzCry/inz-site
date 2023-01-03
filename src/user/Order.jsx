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
import { updateOrderStatus } from "../utils/functions";

export default function ManageOrder({ order, refetch }) {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up("sm"));

  const { notify, confirm } = useContext(Context);

  return (
    <Accordion sx={{ bgcolor: "secondary.dark", m: 1 }} key={order._id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
      >
        <Stack sx={{ width: 1 }} direction={matchesSm ? "row" : "column"}>
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

      <AccordionDetails sx={{ bgcolor: "primary.dark" }}>
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
                confirm("Do you want to pay for this order?", () =>
                  updateOrderStatus(
                    order._id,
                    "awaiting fulfillment",
                    refetch,
                    notify,
                    "Order is awaiting fulfillment."
                  )
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
                confirm("Do you want to complete this order?", () =>
                  updateOrderStatus(
                    order._id,
                    "completed",
                    refetch,
                    notify,
                    "Order has been completed."
                  )
                )
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
                confirm("Do you want to cancel this order?", () =>
                  updateOrderStatus(
                    order._id,
                    "cancelled",
                    refetch,
                    notify,
                    "Order has been cancelled."
                  )
                )
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
