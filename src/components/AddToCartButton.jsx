import { useContext } from "react";

import { NavLink } from "react-router-dom";

import { Button } from "@mui/material";

import Context from "../utils/Context";

export default function AddToCartButton({ product }) {
  const { cart, setCart, notify } = useContext(Context);

  function addToCart() {
    setCart([
      ...cart,
      {
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        productNameLink: product.nameLink,
        productQuantity: product.quantity,
        productShortDescription: product.shortDescription,
        productCategories: product.categories,
        count: 1,
      },
    ]);
    notify("Product added to cart.");
  }

  if (cart && cart.some((ci) => ci.productId === product._id))
    return (
      <Button
        sx={{ borderRadius: 0 }}
        component={NavLink}
        to="/cart"
        fullWidth
        variant="contained"
      >
        Go to cart
      </Button>
    );
  if (product.quantity > 0)
    return (
      <Button
        sx={{ borderRadius: 0, bgcolor: "action.positive" }}
        fullWidth
        onClick={addToCart}
        variant="contained"
      >
        Add to cart
      </Button>
    );
  return (
    <Button sx={{ borderRadius: 0 }} fullWidth variant="contained" disabled>
      Product not available
    </Button>
  );
}
