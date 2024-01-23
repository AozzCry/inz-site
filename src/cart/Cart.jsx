import { useContext } from 'react';

import { useQuery } from 'react-query';

import { NavLink } from 'react-router-dom';

import ClearAllIcon from '@mui/icons-material/ClearAll';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  List,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ErrorPage from '../main/ErrorPage';
import LoadingPage from '../main/LoadingPage';
import Context from '../utils/Context';
import CartProduct from './CartProduct';
import RecoProduct from './RecoProduct';

export default function Cart() {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up('sm'));
  const matchesMd = useMediaQuery(useTheme().breakpoints.up('md'));

  const { cart, setCart, userData, confirm } = useContext(Context);
  const {
    isLoading,
    isError,
    error,
    data: cartRecommendations,
  } = useQuery({
    queryKey: [
      '/product/cart',
      { category: cart.map((ci) => ci.productCategories).join(',') },
    ],
  });
  return (
    <Container
      disableGutters={!matchesSm ? true : false}
      sx={{ pt: 1, bgcolor: 'primary.dark' }}
    >
      <Stack direction="row">
        <Button
          sx={{
            mx: 1,
            borderColor: 'action.delete',
            color: 'action.delete',
          }}
          title="Clear cart"
          variant="outlined"
          onClick={() =>
            confirm('Do you want to clear your cart?', () => setCart([]))
          }
        >
          Clear cart
          <ClearAllIcon />
        </Button>
        <Typography variant="h4">
          Cart({cart.reduce((sum, ci) => sum + ci.count, 0)})
        </Typography>
      </Stack>
      <Stack direction={matchesMd ? 'row' : 'column'}>
        <List sx={{ width: 1 }}>
          {cart &&
            cart.map((cartItem, index) => {
              return <CartProduct key={cartItem.productId} index={index} />;
            })}
        </List>
        <Box sx={{ width: 1 }}>
          <Card sx={{ bgcolor: 'secondary.dark', m: 1 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Sum of order:
              </Typography>
              <Typography variant="h5" component="div">
                {cart
                  .reduce((sum, ci) => sum + ci.productPrice * ci.count, 0)
                  .toFixed(2) + ' PLN'}
              </Typography>
            </CardContent>
            <CardActions>
              {userData.email ? (
                <Button
                  title="Order"
                  fullWidth
                  sx={{ bgcolor: 'action.positive' }}
                  to={cart.length > 0 ? '../checkout' : '#'}
                  component={NavLink}
                  variant={'contained'}
                  disabled={cart.length > 0 && userData.email ? false : true}
                >
                  Order
                </Button>
              ) : (
                <Typography variant="h4" sx={{ m: 1, color: 'primary.light' }}>
                  You must be logged in to order.<br/>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1, w: "100%"
                    }}
                  >
                    Log in
                  </Button>
                </Typography>
              )}
            </CardActions>
          </Card>
        </Box>
      </Stack>

      {isLoading && <LoadingPage what="products" />}
      {isError && <ErrorPage error={error.message} />}

      {cartRecommendations && cartRecommendations.length > 0 && (
        <>
          <Typography variant="h4" sx={{ m: 1 }}>
            Similar products:
          </Typography>
          <Container
            disableGutters
            sx={{
              pl: 1,
              display: 'flex',
              flexWrap: 'wrap',
              bgcolor: 'primary.dark',
            }}
          >
            {cartRecommendations
              .filter(
                (product) => !cart.some((ci) => ci.productId === product._id)
              )
              .map((product) => {
                return <RecoProduct key={product._id} product={product} />;
              })}
          </Container>
        </>
      )}
    </Container>
  );
}
