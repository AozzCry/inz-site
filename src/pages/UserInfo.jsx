import { useState } from "react";

import { Button, Modal } from "@mui/material";

import AddAddress from "../forms/AddAddress.jsx";

export default function Home() {
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const handleOpenAddAddress = () => setOpenAddAddress(true);
  const handleCloseAddAddress = () => setOpenAddAddress(false);
  return (
    <>
      <Button onClick={handleOpenAddAddress} variant="contained">
        AddAddress
      </Button>
      <Modal open={openAddAddress} onClose={handleCloseAddAddress}>
        <>
          <AddAddress close={handleCloseAddAddress} />
        </>
      </Modal>
    </>
  );
}
