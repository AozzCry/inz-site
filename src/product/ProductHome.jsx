import { Buffer } from "buffer";

import { useNavigate } from "react-router-dom";

import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Stack,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import AddToCartButton from "../components/AddToCartButton";

export default function Product({ product }) {
  const { palette, breakpoints } = useTheme();
  const matchesMd = useMediaQuery(breakpoints.up("md"));
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const navigate = useNavigate();

  return (
    <Card
      raised
      sx={{
        bgcolor: palette.primary.dark,
        p: 1,
        mr: 1,
        mb: 1,
        flexGrow: matchesMd ? 1 / 2 : 1,
        borderRadius: 4,
      }}
    >
      <Stack>
        <CardActionArea
          onClick={() => {
            navigate("/product/" + product.nameLink);
          }}
        >
          <Stack>
            <CardMedia
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
              sx={{
                objectFit: "contain",
                bgcolor: palette.secondary.dark,
              }}
              height={matchesSm ? 300 : 250}
              width={matchesSm ? 300 : 250}
            />

            <Typography variant="h6" sx={{ m: 1 }}>
              {product.name}
            </Typography>

            <Stack direction="row" sx={{ p: 0, width: 1 }}>
              <Stack
                direction="row"
                sx={{
                  border: 1,
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  p: 0.5,
                  mr: 0.5,
                  borderColor: palette.primary.main,
                }}
              >
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

              <Typography
                variant="h5"
                sx={{
                  px: 0.5,
                  width: 1,
                  border: 1,
                  textAlign: "right",
                  borderColor: palette.primary.main,
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                {product.price.toFixed(2)}PLN
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
        <CardActions sx={{ p: 0 }}>
          <AddToCartButton product={product} />
        </CardActions>
      </Stack>
    </Card>
  );
}
