import { useState } from "react";

import { Box, Button, CardMedia, MobileStepper, useTheme } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import ImageHandler from "./ImageHandler";

export default function ImageDetails({
  images,
  productId,
  isAdmin,
  setConfirmDialog,
}) {
  const { palette } = useTheme();
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
          maxHeight: 400,
          objectFit: "contain",
          bgcolor: palette.secondary.main,
        }}
      />

      {images && (
        <MobileStepper
          sx={{
            bgcolor: palette.secondary.dark,
            color: palette.text.primary,
            ".MuiMobileStepper-dot": { bgcolor: palette.primary.main },
            ".MuiMobileStepper-dotActive": {
              bgcolor: palette.primary.light,
            },
          }}
          steps={images.length}
          position="static"
          activeStep={imageIndex}
          nextButton={
            <Button
              sx={{ color: palette.text.primary }}
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
              sx={{ color: palette.text.primary }}
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
          />
        </Box>
      )}
    </Box>
  );
}
