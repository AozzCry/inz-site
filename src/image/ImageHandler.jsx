import { useContext } from "react";
import axios from "axios";

import { Button, Input } from "@mui/material";

import { patchFetch } from "../hooks/fetchHooks";
import Context from "../utils/Context";

export default function ImageHandler({ productId, imageId, refetch }) {
  const { notify, confirm } = useContext(Context);
  function submitImage(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
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
          notify(res.data.message);
          refetch();
        })
        .catch((err) => {
          console.error(err);
        });
    } else
      return notify(
        "Only jpg and png images are allowed. Max size 12MB",
        "error"
      );
  }
  function deleteImage() {
    patchFetch("/image", { imageId }, ({ message, error }) => {
      if (!error) {
        notify(message);
        refetch();
      }
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
            confirm("Do you want to delete this image?", deleteImage)
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
