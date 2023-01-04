import { useContext, useState } from "react";

import { useQuery } from "react-query";

import Context from "../utils/Context";

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
} from "@mui/material";
import LoadingPage from "../main/LoadingPage";
import { useNavigate } from "react-router-dom";

export default function Categories({ setOpenDrawer }) {
  const { setSearch } = useContext(Context);
  const [searchCategories, setSearchCategories] = useState("");

  const navigate = useNavigate();

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
    <>
      <TextField
        fullWidth
        sx={{ bgcolor: "primary.dark" }}
        placeholder="Search…"
        onChange={(e) => setSearchCategories(e.target.value)}
      />
      <List sx={{ bgcolor: "primary.dark" }}>
        {categories
          .filter((c) => c.name.toLowerCase().includes(searchCategories))
          .map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton
                dense={true}
                onClick={() => {
                  setSearch({ name: "", category: [category.name] });
                  navigate("/search");
                  setOpenDrawer(false);
                }}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}
