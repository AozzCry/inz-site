import { useState } from "react";
import { useQuery } from "react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { getFetch, patchFetch, postFetch } from "../hooks/fetchHooks";

import {
  Button,
  Alert,
  Container,
  CircularProgress,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { StyledInput, StyledSearch } from "../components/styled";

export default function ManageCategories() {
  const { palette } = useTheme();
  const { status, data, error, refetch } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });

  const [alert, setAlert] = useState(null);

  const categoryValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Category name is required")
      .min(3, "Category name must be at least 3 characters")
      .max(30, "Category name must not exceed 30 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categoryValidationSchema),
  });

  function createCategory(values) {
    postFetch("category/create", { name: values.name }).then(({ error }) => {
      if (error) setAlert(error);
      else {
        setAlert(null);
        refetch();
        reset({ name: "" });
      }
    });
  }
  function removeCategory(name) {
    patchFetch("category/remove", { name: name }).then(({ error }) => {
      if (!error) refetch();
    });
  }

  const [search, setSearch] = useState("");

  if (status === "loading") {
    return <CircularProgress />;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Container>
      <Stack direction="row">
        <StyledInput
          margin="normal"
          fullWidth
          id="name"
          name="name"
          label="Category name"
          type="text"
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
        />
        <Button
          variant="contained"
          onClick={handleSubmit(createCategory)}
          sx={{ ml: 1, mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Stack>
      {alert ? <Alert severity="error">{alert}</Alert> : <></>}

      <StyledSearch>
        <InputBase
          sx={{ width: 1 }}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find category..."
        />
        <SearchIcon />
      </StyledSearch>
      <List>
        {data
          .filter((c) => c.name.toLowerCase().includes(search))
          .map((category) => {
            return (
              <ListItem key={category._id}>
                <ListItemText
                  primary={
                    <Typography color="textPrimary">{category.name}</Typography>
                  }
                />
                <Button
                  onClick={() => removeCategory(category.name)}
                  variant="contained"
                  edge={"end"}
                >
                  Remove
                </Button>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
}
