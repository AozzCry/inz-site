import { useState } from "react";
import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks";

import { Container, List, Divider, InputBase, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ManageUser from "./ManageUser";

import { StyledSearch } from "../components/styled";
import ErrorPage from "../main/ErrorPage";
import LoadingPage from "../main/LoadingPage";

export default function ManageUsers() {
  const { palette } = useTheme();

  const [search, setSearch] = useState("");

  const {
    isLoading,
    isError,
    error,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["/user/getall"],
    queryFn: getFetch,
  });

  if (isLoading) return <LoadingPage what={"user"} />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <Container disableGutters sx={{ my: 1, px: 1 }}>
      <StyledSearch>
        <InputBase
          sx={{ width: 1, input: { color: palette.text.contrast } }}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find user..."
        />
        <SearchIcon />
      </StyledSearch>
      <Divider />
      <List sx={{ borderRadius: "10px", bgcolor: palette.primary.dark }}>
        {users
          .filter(
            (user) =>
              user.username.toLowerCase().includes(search) ||
              user.email.includes(search.toLowerCase())
          )
          .map((user) => (
            <ManageUser key={user._id} user={user} refetch={refetch} />
          ))}
      </List>
    </Container>
  );
}
