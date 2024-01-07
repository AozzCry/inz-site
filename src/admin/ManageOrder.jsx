import { useContext } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  ListItemText,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import OrderInfo from '../components/order/OrderInfo';
import OrderTable from '../components/order/OrderTable';
import Context from '../utils/Context';
import { deleteDocument, updateOrderStatus } from '../utils/functions';

export default function ManageOrder({ order, refetch }) {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up('sm'));

  const { notify, confirm } = useContext(Context);

  return (
    <Accordion
      sx={{
        bgcolor: 'primary.dark',
        m: 1,
        '.Mui-expanded': { bgcolor: 'secondary.dark' },
      }}
      key={order._id}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
      >
        <Stack sx={{ width: 1 }} direction={matchesSm ? 'row' : 'column'}>
          <ListItemText
            primary={new Date(order.orderDate).toLocaleDateString('pl-PL')}
            secondary={order._id}
          />
          <ListItemText
            primary={'Status: ' + order.status}
            secondary={'Amount: ' + order.sumPrice.toFixed(2) + ' PLN'}
          />
        </Stack>
      </AccordionSummary>
      <OrderInfo address={order.address} userInfo={order.userInfo} />
      <AccordionDetails sx={{ bgcolor: 'primary.dark' }}>
        <Stack direction={matchesSm ? 'row' : 'column'}>
          <Stack
            direction={!matchesSm ? 'row' : 'column'}
            sx={{ border: 1, borderRadius: 4, pt: matchesSm ? 1 : 0 }}
          >
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={'end'}
              onClick={() =>
                confirm('Do you want fulfill this order?', () =>
                  updateOrderStatus(
                    order._id,
                    'delivering',
                    refetch,
                    notify,
                    'Order is delivering.'
                  )
                )
              }
              disabled={order.status !== 'awaiting fulfillment'}
            >
              Fulfill
            </Button>
            <Button
              sx={{ m: 1, borderRadius: 4 }}
              size="medium"
              variant="contained"
              edge={'end'}
              onClick={() =>
                confirm('Do you want decline this order?', () =>
                  updateOrderStatus(
                    order._id,
                    'declined',
                    refetch,
                    notify,
                    'Order has been declined.'
                  )
                )
              }
              disabled={
                order.status !== 'declined' ||
                order.status !== 'cancelled' ||
                order.status !== 'completed'
              }
            >
              Decline
            </Button>
            <Tooltip title="Delete order from database.">
              <Button
                sx={{ m: 1, borderRadius: 4 }}
                size="medium"
                variant="outlined"
                color="error"
                edge={'end'}
                onClick={() =>
                  confirm('Do you want to delete this order?', () =>
                    deleteDocument('order', order._id, refetch, notify)
                  )
                }
              >
                Delete
              </Button>
            </Tooltip>
          </Stack>
          <OrderTable products={order.products} sumPrice={order.sumPrice} />
        </Stack>
      </AccordionDetails>
      <Divider />
    </Accordion>
  );
}
