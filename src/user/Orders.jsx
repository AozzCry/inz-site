import { useState } from "react";
import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks";

import { useLocation } from "react-router-dom";

import {
  Container,
  Box,
  InputBase,
  useTheme,
  TextField,
  useMediaQuery,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Order from "./Order";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";

import { StyledSearch } from "../components/styled";

export default function ManageOrders() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const location = useLocation();

  const [search, setSearch] = useState(
    location.state ? location.state.search : ""
  );
  const [dateFrom, setdateFrom] = useState(null);
  const [dateTo, setdateTo] = useState(null);

  const {
    isLoading,
    isError,
    error,
    data: orders,
    refetch,
  } = useQuery({
    queryKey: ["order"],
    queryFn: getFetch,
  });

  if (isLoading) return <LoadingPage what="orders" />;
  if (isError) return <ErrorPage error={error.message} />;
  return (
    <Container disableGutters sx={{ pt: 1, width: 1 }}>
      <Stack
        direction={matchesSm ? "row" : "column"}
        sx={{ bgcolor: palette.primary.dark, borderRadius: 4 }}
      >
        <Box sx={{ width: 1, mt: 0.5 }}>
          <StyledSearch>
            <InputBase
              sx={{ width: 1, input: { color: palette.text.contrast } }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find order..."
            />
            <SearchIcon />
          </StyledSearch>
        </Box>
        <Stack direction="row" sx={{ my: 0.5 }}>
          <TextField
            sx={{ mr: 1 }}
            fullWidth
            id="date"
            label="Orders from..."
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setdateFrom(e.target.value)}
          />
          <TextField
            fullWidth
            id="date"
            label="Orders to..."
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setdateTo(e.target.value)}
          />
        </Stack>
      </Stack>
      <Stack>
        {orders
          .filter((o) =>
            search ? o.status.includes(search) || o._id.includes(search) : true
          )
          .filter((o) => (dateFrom ? o.orderDate >= dateFrom : true))
          .filter((o) => (dateTo ? o.orderDate <= dateTo : true))

          .map((order) => (
            <Order key={order._id} order={order} refetch={refetch} />
          ))}
      </Stack>
    </Container>
  );
}
