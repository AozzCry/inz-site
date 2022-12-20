import { useState } from "react";
import { useQuery } from "react-query";

import { Button, CircularProgress, List, ListItem, Modal } from "@mui/material";

import AddAddress from "../components/modalforms/AddAddress.jsx";
import UpdateUser from "../components/modalforms/UpdateUser.jsx";
import { getFetch } from "../hooks/fetchHooks.jsx";
import { useTheme } from "@emotion/react";

export default function Account() {
  const { palette } = useTheme();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const { status, data, error, refetch } = useQuery({
    queryKey: ["/user"],
    queryFn: getFetch,
  });

  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <List
        sx={{
          bgcolor: palette.secondary.dark,
          color: palette.text.primary,
          m: 1,
          borderRadius: 4,
          border: 1,
          borderColor: palette.primary.main,
          p: 2,
        }}
      >
        <ListItem>First name: {data.firstname}</ListItem>
        <ListItem>Last name: {data.lastname}</ListItem>
        <ListItem>Username: {data.username}</ListItem>
        <ListItem sx={{ borderBottom: 1 }}>Email: {data.email}</ListItem>
        <Button
          sx={{ my: 1 }}
          onClick={() => setOpenUpdateUser(true)}
          variant="contained"
        >
          Modify account
        </Button>
        {!data.isAdmin && (
          <ListItem sx={{ mt: 1 }}>
            Address:
            {data.address ? (
              <List>
                <ListItem>Street: {data.address.street}</ListItem>
                <ListItem>Street number: {data.address.streetNr}</ListItem>
                <ListItem>City: {data.address.city}</ListItem>
                <ListItem>Postal code: {data.address.postalCode}</ListItem>
                <Button
                  onClick={() => setOpenAddAddress(true)}
                  variant="contained"
                >
                  Change address
                </Button>
              </List>
            ) : (
              <Button
                onClick={() => setOpenAddAddress(true)}
                variant="contained"
              >
                Add address
              </Button>
            )}
          </ListItem>
        )}
      </List>

      <Modal open={openAddAddress} onClose={() => setOpenAddAddress(false)}>
        <>
          <AddAddress
            close={() => setOpenAddAddress(false)}
            address={data.address}
            refetch={refetch}
          />
        </>
      </Modal>
      <Modal open={openUpdateUser} onClose={() => setOpenUpdateUser(false)}>
        <>
          <UpdateUser
            close={() => setOpenUpdateUser(false)}
            user={data}
            refetch={refetch}
          />
        </>
      </Modal>
    </>
  );
}
