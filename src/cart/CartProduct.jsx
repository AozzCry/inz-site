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

export default function CartProduct({ index }) {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up("sm"));

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
        borderColor: "primary.main",
        display: "flex",
        flexWrap: "wrap",
      }}
      key={cart[index].productId}
      disablePadding
    >
      {!matchesSm && (
        <ListItemText sx={{ minWidth: 1 }} primary={cart[index].productName} />
      )}
      <IconButton
        title="Remove from cart"
        sx={{
          mr: 1,
          border: 2,
          borderColor: "action.delete",
        }}
        onClick={onDelete}
      >
        <DeleteIcon sx={{ color: "action.delete" }} />
      </IconButton>
      {matchesSm && (
        <ListItemText
          primary={cart[index].productName}
          secondary={cart[index].productShortDescription}
        />
      )}
      <ListItemText
        align="right"
        primary={cart[index].productPrice.toFixed(2) + " CUR"}
      />

      <Stack direction="row">
        <IconButton
          title="Decrease quantity"
          sx={{
            mx: 1,
            border: 2,
            borderColor: "action.negative",
            "&.Mui-disabled": {
              borderColor: "action.disabled",
            },
          }}
          size="small"
          disabled={cart[index].count > 1 ? false : true}
          onClick={onSub}
        >
          <ArrowBackIosNewIcon sx={{ color: "action.negative" }} />
        </IconButton>
        <Typography sx={{ fontSize: "1.5em" }} color="text.primary">
          {cart[index].count}
        </Typography>
        <IconButton
          title="Increase quantity"
          sx={{
            mx: 1,
            border: 2,
            borderColor: "action.positive",
            "&.Mui-disabled": {
              borderColor: "action.disabled",
            },
          }}
          size="small"
          disabled={
            cart[index].count < cart[index].productQuantity ? false : true
          }
          onClick={onAdd}
        >
          <ArrowForwardIosIcon sx={{ color: "action.positive" }} />
        </IconButton>
      </Stack>
    </ListItem>
  );
}
