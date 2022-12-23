import { useQuery } from "react-query";

import { getFetch } from "../hooks/fetchHooks";

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useTheme,
} from "@mui/material";
import LoadingPage from "./LoadingPage";

export default function Categories({
  setOpenDrawer,
  procSearch,
  searchCategories = "",
}) {
  const { palette } = useTheme();

  const {
    isLoading,
    isError,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <>{error.message}</>;
  return (
    <List sx={{ bgcolor: palette.primary.dark }}>
      {categories
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
