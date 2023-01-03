import { Buffer } from "buffer";

import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Stack,
  Rating,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTheme } from "@emotion/react";
import AddToCartButton from "../components/AddToCartButton";

export default function Product({ product }) {
  const { breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  const navigate = useNavigate();

  return (
    <Card
      raised
      sx={{
        bgcolor: "primary.dark",
        p: 1,
        mb: 1,
        mr: matchesMd ? 1 : 0,
        flexGrow: 1,
        borderRadius: 2,
      }}
    >
      <Stack direction={matchesMd ? "row" : "column"}>
        <CardActionArea
          onClick={() => {
            navigate("/product/" + product.nameLink);
          }}
        >
          <Stack direction={matchesSm ? "row" : "column"}>
            <CardMedia
              sx={{
                maxWidth: matchesXs ? "300px" : 1,
                width: matchesXs ? "250px" : 1,
              }}
              image={
                product.miniImg
                  ? `data:image/png;base64,${Buffer.from(
                      product.miniImg.data,
                      "binary"
                    ).toString("base64")}`
                  : "https://i.ibb.co/nRmzP38/product-Placeholder.jpg"
              }
              component="img"
              alt="product image"
            />

            <CardContent sx={{ maxWidth: matchesSm ? 0.6 : 1, pt: 0 }}>
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                {product.categories.join(", ")}
              </Typography>
              <Typography gutterBottom variant="h6">
                {product.name}
              </Typography>
              <Typography variant="body2">
                {product.shortDescription}
              </Typography>
              <Stack sx={{ my: 1 }} direction="row">
                <Rating
                  readOnly
                  value={product.starsFromReviews / product.countOfReviews}
                  precision={0.5}
                  emptyIcon={<StarIcon />}
                />
                <Typography variant="body1">
                  ({product.countOfReviews})
                </Typography>
              </Stack>

              {matchesXs && product.specifications && (
                <Stack>
                  {product.specifications.slice(0, 4).map((specification) => (
                    <Typography key={specification.name}>
                      {specification.name}:{specification.value}
                    </Typography>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Stack>
        </CardActionArea>
        <CardActions sx={{ bgcolor: "secondary.dark" }}>
          <Stack
            sx={{ width: 1 }}
            direction={matchesMd || !matchesXs ? "column" : "row"}
          >
            <Typography sx={{ m: 1 }} variant="h5">
              {product.price.toFixed(2)}PLN
            </Typography>
            <Stack
              sx={{ width: 1, mt: matchesSm ? 1 : 0 }}
              direction={matchesMd || matchesSm ? "column" : "row"}
            >
              <AddToCartButton product={product} />
            </Stack>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}
