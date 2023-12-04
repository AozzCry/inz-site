import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Context from '../utils/Context.jsx';
import Orders from './Orders.jsx';

import {
  Button,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import AddAddress from '../components/modalforms/AddAddress.jsx';
import UpdateUser from '../components/modalforms/UpdateUser.jsx';
import ErrorPage from '../main/ErrorPage.jsx';
import LoadingPage from '../main/LoadingPage.jsx';
import { deleteDocument } from '../utils/functions.jsx';

export default function AccountV2() {
  const { notify, confirm } = useContext(Context);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ['/user'],
  });

  if (isLoading) return <LoadingPage what="user" />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <>
      <List
        sx={{
          bgcolor: 'secondary.dark',
          color: 'text.primary',
          m: 1,
          borderRadius: 4,
          border: 1,
          borderColor: 'primary.main',
          p: 2,
        }}
      >
        <Stack direction={'row'}>
          <Stack direction={'column'} sx={{ margin: '10px' }}>
            <Typography variant="h5">Account information:</Typography>
            <ListItem>First name: {user.firstname}</ListItem>
            <ListItem>Last name: {user.lastname}</ListItem>
            <ListItem>Username: {user.username}</ListItem>
            <ListItem>Email: {user.email}</ListItem>
            <Button
              sx={{ my: 1 }}
              fullWidth
              onClick={() => setOpenUpdateUser(true)}
              variant="contained"
            >
              Modify account
            </Button>
          </Stack>
          <Stack direction={'column'} sx={{ margin: '10px' }}>
            <Typography variant="h5">Address:</Typography>

            <ListItem sx={{ p: 0 }}>
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
          </Stack>
          <Stack direction={'column'} sx={{ margin: '10px' }}>
            <Typography variant="h5">Actions:</Typography>
            <Button
              title="Delete user"
              variant="outlined"
              color="error"
              fullWidth
              onClick={() =>
                confirm('Do you want to delete yourself?', () =>
                  deleteDocument(
                    'user/self',
                    '',
                    () => window.location.reload(false),
                    notify
                  )
                )
              }
            >
              Delete account
            </Button>
          </Stack>
        </Stack>
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
      <Orders />
    </>
  );
}
