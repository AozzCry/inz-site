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
} from "@mui/material";

import AddToCartButton from "../components/AddToCartButton";

export default function RecoProduct({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      raised
      sx={{
        bgcolor: "secondary.dark",
        p: 1,
        mr: 1,
        mb: 1,
        flexGrow: 1,
        borderRadius: 4,
      }}
    >
      <Stack>
        <CardActionArea
          onClick={() => {
            navigate("/product/" + product.nameLink);
          }}
        >
          <Stack direction="row">
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
                bgcolor: "secondary.dark",
              }}
              height={120}
              width={120}
            />
            <Stack sx={{ width: 1 }}>
              <Typography variant="body1" sx={{ m: 1, minHeight: 0.55 }}>
                {product.name}
              </Typography>

              <Stack
                direction="row"
                sx={{ p: 0, width: 1, borderTop: 1, pt: 1 }}
              >
                <Rating
                  readOnly
                  value={product.starsFromReviews / product.countOfReviews}
                  precision={0.5}
                />
                <Typography
                  variant="body1"
                  sx={{
                    px: 0.5,
                    width: 1,
                    textAlign: "right",
                  }}
                >
                  {product.price.toFixed(2)}PLN
                </Typography>
              </Stack>
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
