import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { getFetch, patchFetch, postFetch } from "../hooks/fetchHooks";

import {
  Button,
  Container,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Stack,
  useTheme,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { StyledInput, StyledSearch } from "../components/styled";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";

import Context from "../utils/Context";

export default function ManageCategories() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const { notification } = useContext(Context);

  const [search, setSearch] = useState("");

  const {
    isLoading,
    isError,
    error,
    data: categories,
    refetch,
  } = useQuery({
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
        notification("Category created successfully");
      }
    });
  }

  function deleteCategory(name) {
    patchFetch("category/delete", { name: name }).then(({ error }) => {
      if (!error) {
        refetch();
        notification("Category deleted successfully");
      }
    });
  }

  if (isLoading) return <LoadingPage what={"categories"} />;
  if (isError) return <ErrorPage error={error} />;
  return (
    <Container sx={{ pb: 1 }}>
      <Stack direction="row">
        {matchesSm && (
          <Box sx={{ width: 1, mt: 2 }}>
            <StyledSearch>
              <InputBase
                sx={{ width: 1, input: { color: palette.text.contrast } }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find category..."
              />
              <SearchIcon />
            </StyledSearch>
          </Box>
        )}
        <Stack component={"form"} sx={{ width: 1 }} direction="row">
          <StyledInput
            sx={{ width: 1 }}
            margin="normal"
            id="name"
            name="name"
            label="Category name"
            type="text"
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
          {alert && <Typography>{alert}</Typography>}
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleSubmit(createCategory)}
            sx={{ width: 0.5, ml: 1, mt: 3, mb: 2, maxHeight: "40px" }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      {!matchesSm && (
        <StyledSearch>
          <InputBase
            sx={{ width: 1, input: { color: palette.text.contrast } }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find category..."
          />
          <SearchIcon />
        </StyledSearch>
      )}
      <List sx={{ mt: 2, borderRadius: "10px", bgcolor: palette.primary.main }}>
        {categories
          .filter((c) => c.name.toLowerCase().includes(search.trim()))
          .map((category) => {
            return (
              <ListItem
                key={category._id}
                sx={{
                  borderRadius: "15px",
                  bgcolor: palette.secondary.dark,
                  m: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography color="textPrimary">{category.name}</Typography>
                  }
                />
                <Button
                  onClick={() => deleteCategory(category.name)}
                  variant="contained"
                  edge={"end"}
                >
                  Delete
                </Button>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
}
