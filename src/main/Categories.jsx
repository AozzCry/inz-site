import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks";

import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useTheme,
} from "@mui/material";

export default function Categories({
  setOpenDrawer,
  procSearch,
  searchCategories = "",
}) {
  const { status, data, error } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });
  const { palette } = useTheme();
  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <List sx={{ bgcolor: palette.primary.dark }}>
      {data
        .filter((c) => c.name.toLowerCase().includes(searchCategories))
        .map((category, index) => (
          <ListItem key={category._id} disablePadding>
            <ListItemButton
              dense={true}
              onClick={() => {
                procSearch(category.name);
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}
