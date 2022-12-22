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
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableBody,
  Stack,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Context from "../utils/Context";

export default function ManageOrder({ order, refetch }) {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const { notification } = useContext(Context);

  function updateOrderStatus(status, successMessage) {
    patchFetch("/order/status", { orderId: order._id, status: status }).then(
      ({ error }) => {
        if (!error) {
          refetch();
          notification(successMessage);
        }
      }
    );
  }

  function deleteOrder() {
    patchFetch("/order/delete", { orderId: order._id }).then(
      ({ error, message }) => {
        if (!error) {
          refetch();
          notification(message);
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
        <Stack direction="row">
          <Box
            sx={{ width: 1, border: 1, p: 1, borderRadius: 3, my: 1, mr: 0.5 }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Delivery address:
            </Typography>
            <List>
              <ListItem> Street: {order.address.street}</ListItem>
              <ListItem> Street number: {order.address.streetNr}</ListItem>
              <ListItem> City: {order.address.city}</ListItem>
              <ListItem> Postal code: {order.address.postalCode}</ListItem>
            </List>
          </Box>
          <Box
            sx={{ width: 1, border: 1, p: 1, borderRadius: 3, my: 1, ml: 0.5 }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Recipient details:
            </Typography>
            <List>
              <ListItem> First name: {order.userInfo.firstname}</ListItem>
              <ListItem> Last name: {order.userInfo.lastname}</ListItem>
              <ListItem> Usernmae: {order.userInfo.username}</ListItem>
              <ListItem> Email: {order.userInfo.email}</ListItem>
            </List>
          </Box>
        </Stack>
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
              onClick={deleteOrder}
              disabled={
                order.status !== "declined" || order.status !== "cancelled"
              }
            >
              Delete
            </Button>
          </Stack>
          <TableContainer
            sx={{ bgcolor: palette.primary.dark }}
            component={Paper}
          >
            <Table sx={{ width: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 1 }}>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map(
                  ({ productId, productName, productPrice, count }, index) => (
                    <TableRow key={productId}>
                      <TableCell>{productName}</TableCell>
                      <TableCell>{productPrice.toFixed(2)}</TableCell>
                      <TableCell>{count}</TableCell>
                      <TableCell>{(productPrice * count).toFixed(2)}</TableCell>
                    </TableRow>
                  )
                )}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {order.products.reduce((i, c) => i + c.count, 0)}
                  </TableCell>
                  <TableCell>{order.sumPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </AccordionDetails>
      <Divider />
    </Accordion>
  );
}
