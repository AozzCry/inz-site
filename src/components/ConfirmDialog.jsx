import { useContext } from "react";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material/";

import Context from "../utils/Context";

export default function ConfirmDialog() {
  const { confirmDialog, setConfirmDialog } = useContext(Context);

  return (
    <div>
      <Dialog
        transitionDuration={0}
        PaperProps={{ sx: { bgcolor: "primary.dark" } }}
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, text: "", afterConfirm: null })
        }
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.text}</DialogTitle>

        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            fullWidth
            onClick={() =>
              setConfirmDialog({ open: false, text: "", afterConfirm: null })
            }
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => {
              confirmDialog.afterConfirm();
              setConfirmDialog({ open: false, text: "", afterConfirm: null });
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
