import {
  Box,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function OrderInfo({ address, userInfo }) {
  const { breakpoints } = useTheme();
  const matchesXs = useMediaQuery(breakpoints.up("xs"));

  return (
    <Stack direction="row">
      <Box sx={{ width: 1, border: 1, p: 1, borderRadius: 3, my: 1, mr: 0.5 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Delivery address:
        </Typography>
        <List>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Street: {address.street}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Street number: {address.streetNr}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            City: {address.city}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Postal code: {address.postalCode}
          </ListItem>
        </List>
      </Box>
      <Box sx={{ width: 1, border: 1, p: 1, borderRadius: 3, my: 1, ml: 0.5 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Recipient details:
        </Typography>
        <List>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            First name: {userInfo.firstname}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Last name: {userInfo.lastname}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Usernmae: {userInfo.username}
          </ListItem>
          <ListItem sx={{ px: matchesXs ? 1 : 0.25 }}>
            Email: {userInfo.email}
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
}
