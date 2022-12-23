import { useContext } from "react";

import Context from "../utils/Context";

import {
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CartProduct({ product, index }) {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const { notify, cart, setCart } = useContext(Context);

  function onDelete() {
    setCart(cart.filter((c) => c !== cart[index]));
    notify("Product removed from cart.");
  }

  function onAdd() {
    setCart(() => {
      let newCart = [...cart];
      newCart[index].count += 1;
      return newCart;
    });
  }

  function onSub() {
    setCart(() => {
      let newCart = [...cart];
      newCart[index].count -= 1;
      return newCart;
    });
  }

  return (
    <ListItem
      sx={{
        p: 1,
        border: 1,
        borderRadius: 3,
        borderColor: palette.primary.main,
        display: "flex",
        flexWrap: "wrap",
      }}
      key={product._id}
      disablePadding
    >
      {!matchesSm && (
        <ListItemText sx={{ minWidth: 1 }} primary={product.name} />
      )}
      <IconButton
        title="Remove from cart"
        sx={{
          mr: 1,
          border: 2,
          borderColor: palette.action.delete,
        }}
        onClick={onDelete}
      >
        <DeleteIcon sx={{ color: palette.action.delete }} />
      </IconButton>
      {matchesSm && (
        <ListItemText
          primary={product.name}
          secondary={product.shortDescription}
        />
      )}
      <ListItemText align="right" primary={product.price.toFixed(2) + " CUR"} />

      <Stack direction="row">
        <IconButton
          title="Decrease quantity"
          sx={{
            mx: 1,
            border: 2,
            borderColor: palette.action.negative,
            "&.Mui-disabled": {
              borderColor: palette.action.disabled,
            },
          }}
          size="small"
          disabled={cart[index].count > 1 ? false : true}
          onClick={onSub}
        >
          <ArrowBackIosNewIcon sx={{ color: palette.action.negative }} />
        </IconButton>
        <Typography sx={{ fontSize: "1.5em" }} color="text.primary">
          {cart[index].count}
        </Typography>
        <IconButton
          title="Increase quantity"
          sx={{
            mx: 1,
            border: 2,
            borderColor: palette.action.positive,
            "&.Mui-disabled": {
              borderColor: palette.action.disabled,
            },
          }}
          size="small"
          disabled={
            cart[index].count < cart[index].product.quantity ? false : true
          }
          onClick={onAdd}
        >
          <ArrowForwardIosIcon sx={{ color: palette.action.positive }} />
        </IconButton>
      </Stack>
    </ListItem>
  );
}
