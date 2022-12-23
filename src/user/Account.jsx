import { useState } from "react";
import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks.jsx";

import { Button, List, ListItem, Modal, useTheme } from "@mui/material";

import AddAddress from "../components/modalforms/AddAddress.jsx";
import UpdateUser from "../components/modalforms/UpdateUser.jsx";
import LoadingPage from "../main/LoadingPage.jsx";
import ErrorPage from "../main/ErrorPage.jsx";

export default function Account() {
  const { palette } = useTheme();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["/user"],
    queryFn: getFetch,
  });

  if (isLoading) return <LoadingPage what="user" />;
  if (isError) return <ErrorPage error={error.message} />;
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
        <ListItem>First name: {user.firstname}</ListItem>
        <ListItem>Last name: {user.lastname}</ListItem>
        <ListItem>Username: {user.username}</ListItem>
        <ListItem sx={{ borderBottom: 1 }}>Email: {user.email}</ListItem>
        <Button
          sx={{ my: 1 }}
          onClick={() => setOpenUpdateUser(true)}
          variant="contained"
        >
          Modify account
        </Button>
        {!user.isAdmin && (
          <ListItem sx={{ mt: 1 }}>
            Address:
            {user.address ? (
              <List>
                <ListItem>Street: {user.address.street}</ListItem>
                <ListItem>Street number: {user.address.streetNr}</ListItem>
                <ListItem>City: {user.address.city}</ListItem>
                <ListItem>Postal code: {user.address.postalCode}</ListItem>
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
            address={user.address}
            refetch={refetch}
          />
        </>
      </Modal>
      <Modal open={openUpdateUser} onClose={() => setOpenUpdateUser(false)}>
        <>
          <UpdateUser
            close={() => setOpenUpdateUser(false)}
            user={user}
            refetch={refetch}
          />
        </>
      </Modal>
    </>
  );
}
