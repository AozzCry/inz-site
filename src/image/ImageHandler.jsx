import { useContext } from "react";
import axios from "axios";

import { Button, Input } from "@mui/material";

import Context from "../utils/Context";
import { deleteDocument } from "../utils/functions";

export default function ImageHandler({ productId, imageId, refetch }) {
  const { notify, confirm } = useContext(Context);
  function submitImage(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      ["image/jpg", "image/png", "image/jpeg"].includes(
        formData.get("image").type
      ) &&
      formData.get("image").size <
        (e.nativeEvent.submitter.name ? 12000000 : 4000000)
    ) {
      formData.append("productId", productId);
      axios
        .post(
          e.nativeEvent.submitter.name === "fullimage"
            ? "/image/full"
            : "/image/mini",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          notify(res.data.message);
          console.log(res.data.message);
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
  return (
    <form onSubmit={submitImage}>
      <Input sx={{ width: 0.5 }} type="file" id="image" name="image" required />
      <Button
        sx={{ width: 0.5 }}
        type="submit"
        size="small"
        color="success"
        variant="outlined"
        name="fullimage"
        id="fullimage"
      >
        Add image
      </Button>
      <Button
        sx={{ width: 0.5 }}
        type="submit"
        size="small"
        color="success"
        variant="outlined"
        name="miniimage"
        id="miniimage"
      >
        Add mini image
      </Button>
      {imageId && (
        <Button
          onClick={() =>
            confirm("Do you want to delete this image?", () =>
              deleteDocument("image", imageId, refetch, notify)
            )
          }
          sx={{ width: 0.5 }}
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
