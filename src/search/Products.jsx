import Product from "./Product";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";
import { useQuery } from "react-query";
import { Box, Container, Typography } from "@mui/material";

export default function Products({ search, priceFrom, priceTo }) {
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
  if (products && products.length === 0)
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
  if (products)
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
          .map((product) => (
            <Product
              key={product._id}
              product={product}
              searchParams={search}
            />
          ))}
      </Container>
    );
}
