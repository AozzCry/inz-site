import { useState } from "react";

import { Box, Button, CardMedia, MobileStepper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import ImageHandler from "./ImageHandler";

export default function ImageDetails({
  images,
  productId,
  isAdmin,
  setConfirmDialog,
  refetch,
}) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Box>
      <CardMedia
        image={
          images
            ? `data:image/png;base64,${images[imageIndex].base64}`
            : "https://i.ibb.co/nRmzP38/product-Placeholder.jpg"
        }
        component="img"
        alt={"product image number " + (imageIndex + 1)}
        title={"product image number " + (imageIndex + 1)}
        sx={{
          objectFit: "contain",
          bgcolor: "primary.dark",
        }}
        height="400px"
        width="400px"
      />

      {images && (
        <MobileStepper
          sx={{
            bgcolor: "secondary.dark",
            color: "text.primary",
            ".MuiMobileStepper-dot": { bgcolor: "primary.main" },
            ".MuiMobileStepper-dotActive": {
              bgcolor: "primary.light",
            },
          }}
          steps={images.length}
          position="static"
          activeStep={imageIndex}
          nextButton={
            <Button
              sx={{ color: "text.primary" }}
              size="small"
              variant="outlined"
              onClick={() => setImageIndex(imageIndex + 1)}
              disabled={imageIndex >= images.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              sx={{ color: "text.primary" }}
              size="small"
              variant="outlined"
              onClick={() => setImageIndex(imageIndex - 1)}
              disabled={imageIndex <= 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      )}
      {isAdmin && (
        <Box
          sx={{ display: "flex", m: 0.25, p: 1, borderRadius: 3, border: 1 }}
        >
          <ImageHandler
            setConfirmDialog={setConfirmDialog}
            productId={productId}
            imageId={images && images[imageIndex].imageId}
            refetch={refetch}
          />
        </Box>
      )}
    </Box>
  );
}
