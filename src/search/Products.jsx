import { useQuery } from "react-query";

import { Box, Container, Typography } from "@mui/material";

import Product from "./Product";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";

function sortFunction(a, b, whichSort) {
  switch (whichSort) {
    case "priceAsc":
      return a.price > b.price;
    case "priceDesc":
      return a.price < b.price;
    case "popularityDesc":
      return a.timesBought < b.timesBought;
    case "ratingDesc":
      return (
        (a.starsFromReviews / a.countOfReviews
          ? a.starsFromReviews / a.countOfReviews
          : 0) <
        (b.starsFromReviews / b.countOfReviews
          ? b.starsFromReviews / b.countOfReviews
          : 0)
      );
    default:
      return a.price < b.price;
  }
}

export default function Products({ search, priceFrom, priceTo, whichSort }) {
  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery({
    queryKey: ["/product", search],
  });

  if (isLoading) return <LoadingPage what="products" />;
  if (isError) return <ErrorPage error={error.message} />;
  if (products?.length === 0)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <Typography variant="h6" textAlign="center">
          No products found
          {search.name && " for search: " + search.name}
          {search.category.length ? " in category: " + search.category : ""}
        </Typography>
      </Box>
    );
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
      spacing={1}
    >
      {products
        .filter(
          (p) =>
            p.price > Number(priceFrom) &&
            (p.price < Number(priceTo) || priceTo === "")
        )
        .sort((a, b) => sortFunction(a, b, whichSort))
        .map((product) => (
          <Product key={product._id} product={product} searchParams={search} />
        ))}
    </Container>
  );
}
