import { useQuery } from "react-query";
import { getFetch } from "../hooks/fetchHooks";

import { Container, Typography } from "@mui/material";

import ProductHome from "../product/ProductHome";
import { Stack } from "@mui/system";
export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["/product/home"],
    queryFn: getFetch,
  });

  if (isLoading) return <div>isLoading</div>;

  if (error) return <div>{error}</div>;

  return (
    <Stack>
      <Typography sx={{ m: 1 }} variant="h5">
        Check out our newest products:
      </Typography>
      {data.randomFiveProducts && (
        <Container
          disableGutters
          sx={{ pl: 1, display: "flex", flexWrap: "wrap" }}
        >
          {data.randomFiveProducts.map((product, index) => (
            <ProductHome key={index} product={product} />
          ))}
        </Container>
      )}
      {data.lastSeenProducts && (
        <>
          <Typography sx={{ m: 1 }} variant="h5">
            Your last looked at products:
          </Typography>
          <Container
            disableGutters
            sx={{ pl: 1, display: "flex", flexWrap: "wrap" }}
          >
            {data.lastSeenProducts.map((product, index) => (
              <ProductHome key={index} product={product} />
            ))}
          </Container>
        </>
      )}
    </Stack>
  );
}
