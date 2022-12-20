import { useState } from "react";
import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks";

import {
  Container,
  CircularProgress,
  List,
  Divider,
  InputBase,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import OneUser from "./OneUser";

import { StyledSearch } from "../components/styled";

export default function ManageUsers() {
  const { palette } = useTheme();

  const [search, setSearch] = useState("");

  const { status, data, error, refetch } = useQuery({
    queryKey: ["/user/getall"],
    queryFn: getFetch,
  });

  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
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
      <List sx={{ borderRadius: "10px", bgcolor: palette.primary.main }}>
        {data
          .filter(
            (user) =>
              user.username.toLowerCase().includes(search) ||
              user.email.includes(search.toLowerCase())
          )
          .map((user, index) => (
            <OneUser key={index} user={user} refetch={refetch} />
          ))}
      </List>
    </Container>
  );
}
