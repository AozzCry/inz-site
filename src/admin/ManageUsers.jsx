import { useState } from "react";
import { getFetch, patchFetch } from "../hooks/fetchHooks";
import { useQuery } from "react-query";

import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  InputBase,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

import { StyledSearch } from "../components/styled";

export default function ManageUsers() {
  const { palette } = useTheme();
  const { status, data, error, refetch } = useQuery({
    queryKey: ["/user/getall"],
    queryFn: getFetch,
  });

  const matches = useMediaQuery(useTheme().breakpoints.up("md"));

  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  function banUserSubmit(id) {
    patchFetch("/user/banbyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
      }
    });
  }
  function removeUserSubmit(id) {
    patchFetch("/user/removebyid", { id }).then(({ error }) => {
      if (!error) {
        refetch();
        setAnchorEl(false);
      }
    });
  }
  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Container sx={{ mt: 1, p: 0 }}>
      <StyledSearch>
        <InputBase
          sx={{ width: 1 }}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find user..."
        />
        <SearchIcon />
      </StyledSearch>
      <Divider />
      <List>
        {data
          .filter(
            (user) =>
              user.username.toLowerCase().includes(search) ||
              user.email.includes(search.toLowerCase())
          )
          .map((user) => {
            return (
              <Container key={user._id}>
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{ color: palette.text.primary }}
                    primary={user.username}
                    secondary={user.email}
                  />
                  <ListItemText
                    primaryTypographyProps={{ color: palette.text.primary }}
                    primary={user.isBanned && "Banned"}
                    secondary={user.isAdmin && "Admin"}
                  />
                  {matches ? (
                    <>
                      <Button sx={{ mr: 1 }} variant="contained" edge={"end"}>
                        Orders
                      </Button>
                      <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        edge={"end"}
                        onClick={() => banUserSubmit(user._id)}
                      >
                        Ban
                      </Button>
                      <Button
                        variant="contained"
                        edge={"end"}
                        onClick={() => removeUserSubmit(user._id)}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        value={user._id}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                      >
                        Options
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                      >
                        <MenuItem variant="contained" edge={"end"}>
                          Orders
                        </MenuItem>
                        <MenuItem
                          variant="contained"
                          edge={"end"}
                          onClick={() => banUserSubmit(anchorEl.value)}
                        >
                          Ban
                        </MenuItem>

                        <MenuItem
                          variant="contained"
                          edge={"end"}
                          onClick={() => removeUserSubmit(anchorEl.value)}
                        >
                          Remove
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </ListItem>
                <Divider />
              </Container>
            );
          })}
      </List>
    </Container>
  );
}
