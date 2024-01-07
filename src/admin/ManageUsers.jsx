import { useState } from 'react';
import { useQuery } from 'react-query';

import SearchIcon from '@mui/icons-material/Search';
import { Container, Divider, InputBase, List, Tooltip } from '@mui/material';

import ManageUser from './ManageUser';

import { StyledSearch } from '../components/styled';
import ErrorPage from '../main/ErrorPage';
import LoadingPage from '../main/LoadingPage';

export default function ManageUsers() {
  const [search, setSearch] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ['/user/getall'],
  });

  if (isLoading) return <LoadingPage what={'user'} />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <Container disableGutters sx={{ my: 1, px: 1 }}>
      <Tooltip title="Search user by email or username.">
        <StyledSearch>
          <InputBase
            sx={{ width: 1, input: { color: 'text.contrast' } }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find user..."
          />
          <SearchIcon />
        </StyledSearch>
      </Tooltip>
      <Divider />
      <List sx={{ borderRadius: '10px', bgcolor: 'primary.dark' }}>
        {users
          .filter(
            (user) =>
              user.username
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              user.email.includes(search.trim().toLowerCase())
          )
          .map((user) => (
            <ManageUser key={user._id} user={user} refetch={refetch} />
          ))}
      </List>
    </Container>
  );
}
