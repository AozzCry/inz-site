import { useQuery } from "react-query";

import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import LoadingPage from "./LoadingPage";

export default function Categories({
  setOpenDrawer,
  procSearch,
  searchCategories = "",
}) {
  const {
    isLoading,
    isError,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["/category"],
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <>{error.message}</>;
  return (
    <List sx={{ bgcolor: "primary.dark" }}>
      {categories
        .filter((c) => c.name.toLowerCase().includes(searchCategories))
        .map((category) => (
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
