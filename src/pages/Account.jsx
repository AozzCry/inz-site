import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { Button, CircularProgress, List, ListItem, Modal } from "@mui/material";

import AddAddress from "../forms/AddAddress.jsx";
import UpdateUser from "../forms/UpdateUser.jsx";

export default function Account() {
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  async function getUser() {
    try {
      const res = await axios.get("/user", {
        withCredentials: true,
      });
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      throw err;
    }
  }
  const { status, data, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <List>
        <ListItem>First name: {data.firstname}</ListItem>
        <ListItem>Last name: {data.lastname}</ListItem>
        <ListItem>Username: {data.username}</ListItem>
        <ListItem>Email: {data.email}</ListItem>
        <Button onClick={() => setOpenUpdateUser(true)} variant="contained">
          Modify account
        </Button>
        <ListItem>
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
            <Button onClick={() => setOpenAddAddress(true)} variant="contained">
              Add address
            </Button>
          )}
        </ListItem>
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
