import { useQuery } from "react-query";
import { getFetch } from "../hooks/fetchHooks";

import { Container, Typography } from "@mui/material";

import ProductHome from "../product/ProductHome";
import { Stack } from "@mui/system";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
export default function Home() {
  const {
    isLoading,
    isError,
    error,
    data: homeProducts,
  } = useQuery({
    queryKey: ["/product/home"],
    queryFn: getFetch,
  });

  if (isLoading) return <LoadingPage what="products" />;

  if (isError) return <ErrorPage error={error.message} />;

  return (
    <Stack>
      <Typography sx={{ m: 1 }} variant="h5">
        Check out our newest products:
      </Typography>
      {homeProducts.randomFiveProducts && (
        <Container
          disableGutters
          sx={{ pl: 1, display: "flex", flexWrap: "wrap" }}
        >
          {homeProducts.randomFiveProducts.map((product, index) => (
            <ProductHome key={index} product={product} />
          ))}
        </Container>
      )}
      {homeProducts.lastSeenProducts && (
        <>
          <Typography sx={{ m: 1 }} variant="h5">
            Your last looked at products:
          </Typography>
          <Container
            disableGutters
            sx={{ pl: 1, display: "flex", flexWrap: "wrap" }}
          >
            {homeProducts.lastSeenProducts.map((product, index) => (
              <ProductHome key={index} product={product} />
            ))}
          </Container>
        </>
      )}
    </Stack>
  );
}
