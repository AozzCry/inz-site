import { useContext } from "react";
import axios from "axios";

import { Button, Input } from "@mui/material";

import { patchFetch } from "../hooks/fetchHooks";
import Context from "../utils/Context";

export default function ImageHandler({ productId, imageId, setConfirmDialog }) {
  const { setSB } = useContext(Context);
  function submitImage(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("image").type);
    if (
      ["image/jpg", "image/png", "image/jpeg"].includes(
        formData.get("image").type
      ) &&
      formData.get("image").size < 12000000
    ) {
      formData.append("productId", productId);
      axios
        .post("/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSB({ open: true, message: res.data.message });
        })
        .catch((err) => {
          console.error(err);
        });
    } else
      return setSB({
        open: true,
        message: "Only jpg and png images are allowed. Max size 12MB",
      });
  }
  function deleteImage() {
    patchFetch("/image", { imageId: imageId }, ({ message, error }) => {
      !error && setSB({ open: true, message: message });
    });
  }
  return (
    <form onSubmit={submitImage}>
      <Input type="file" id="image" name="image" required />
      <Button
        sx={{ ml: 1 }}
        type="submit"
        size="small"
        color="success"
        variant="outlined"
      >
        Add image
      </Button>
      {imageId && (
        <Button
          onClick={() =>
            setConfirmDialog({
              open: true,
              text: "Do you want to delete this image?",
              afterConfirm: deleteImage,
            })
          }
          sx={{ ml: 1 }}
          size="small"
          color="error"
          variant="outlined"
        >
          Delete image
        </Button>
      )}
    </form>
  );
}
