import { useState } from "react";

import { useQuery } from "react-query";
import { getFetch } from "../hooks/fetchHooks";

import { useLocation } from "react-router-dom";

import {
  Button,
  Drawer,
  Input,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { StyledSearch } from "../components/styled";
import Product from "./Product";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";
import { Box } from "@mui/system";

export default function Products() {
  const { palette, breakpoints } = useTheme();
  const matchesPr = useMediaQuery(breakpoints.up("pr"));

  const location = useLocation();

  const [searchParams, setSearchParams] = useState(
    location.state ? location.state : { category: "", name: "" }
  );
  const [searchCategories, setSearchCategories] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery({
    queryKey: ["/product", searchParams],
    queryFn: getFetch,
    enabled: searchParams.category.length > 0 || searchParams.name.length > 2,
  });

  const { data: categories } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });

  function productDisplay() {
    if (isLoading) return <LoadingPage what="products" />;
    if (isError) return <ErrorPage error={error.message} />;
    if (products && products.length === 0)
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Typography variant="h6" textAlign="center">
            No products found
            {searchParams.name && " for search: " + searchParams.name}
            {searchParams.category.length &&
              " in category: " + searchParams.category}
          </Typography>
        </Box>
      );
    if (products)
      return (
        <Container
          disableGutters
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
          spacing={1}
        >
          {products
            .filter(
              (p) =>
                p.price > Number(priceFrom) &&
                (p.price < Number(priceTo) || priceTo === "")
            )
            .map((product) => (
              <Product
                key={product._id}
                product={product}
                searchParams={searchParams}
              />
            ))}
        </Container>
      );
  }
  return (
    <>
      <Stack direction={"row"}>
        {matchesPr ? (
          <Stack sx={{ bgcolor: palette.primary.dark }}>
            <Typography align="center" variant="body1" sx={{ m: 0.25 }}>
              Price range
            </Typography>
            <Stack direction="row">
              <TextField
                value={priceFrom}
                sx={{ width: "100px" }}
                placeholder="From"
                onChange={(e) =>
                  (e.target.value.match("^[0-9]+$") || e.target.value === "") &&
                  setPriceFrom(e.target.value)
                }
              />
              <TextField
                value={priceTo}
                sx={{ width: "100px" }}
                placeholder="To"
                onChange={(e) =>
                  (e.target.value.match("^[0-9]+$") || e.target.value === "") &&
                  setPriceTo(e.target.value)
                }
              />
            </Stack>
            <TextField
              sx={{ my: 0.25, bgcolor: palette.primary.dark }}
              fullWidth
              placeholder="Categories…"
              onChange={(e) => setSearchCategories(e.target.value)}
            />
            {searchParams.category &&
              searchParams.category.map((category) => (
                <Button
                  sx={{ ml: 1, mb: 0.25 }}
                  key={category + "active"}
                  fullWidth
                  variant={"contained"}
                  onClick={() =>
                    setSearchParams({
                      name: searchParams.name,
                      category: searchParams.category.filter(
                        (c) => c !== category
                      ),
                    })
                  }
                >
                  <Typography>{category}</Typography>
                </Button>
              ))}
            {categories &&
              categories
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(searchCategories.trim()) &&
                    !searchParams.category.includes(c.name)
                )
                .slice(0, 10)
                .map((category) => (
                  <Button
                    key={category.name}
                    variant={"outlined"}
                    onClick={() =>
                      setSearchParams({
                        category: [...searchParams.category, category.name],
                        name: searchParams.name,
                      })
                    }
                    sx={{ mb: 0.25, bgcolor: palette.primary.dark }}
                  >
                    <Typography>{category.name.slice(0, 10)}</Typography>
                  </Button>
                ))}
          </Stack>
        ) : (
          <Drawer
            PaperProps={{
              sx: {
                bgcolor: palette.secondary.dark,
              },
            }}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <Stack sx={{ bgcolor: palette.primary.dark }}>
              <Typography align="center" variant="body1" sx={{ m: 0.25 }}>
                Price range
              </Typography>
              <Stack direction="row">
                <TextField
                  sx={{ width: "100px" }}
                  placeholder="From"
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
                <TextField
                  sx={{ width: "100px" }}
                  placeholder="To"
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </Stack>

              <TextField
                sx={{ my: 0.25, bgcolor: palette.primary.dark, borderTop: 1 }}
                fullWidth
                placeholder="Categories…"
                onChange={(e) => setSearchCategories(e.target.value)}
              />
              {searchParams.category &&
                searchParams.category.map((category) => (
                  <Button
                    key={category + "active"}
                    fullWidth
                    variant={"contained"}
                    onClick={() =>
                      setSearchParams({
                        name: searchParams.name,
                        category: searchParams.category.filter(
                          (c) => c !== category
                        ),
                      })
                    }
                  >
                    <Typography>{category.slice(0, 10)}</Typography>
                  </Button>
                ))}
              {categories &&
                categories
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(searchCategories.trim()) &&
                      !searchParams.category.includes(c.name)
                  )
                  .slice(0, 10)
                  .map((category) => (
                    <Button
                      key={category._id + "notactive"}
                      variant={"outlined"}
                      onClick={() =>
                        setSearchParams({
                          category: [...searchParams.category, category.name],
                          name: searchParams.name,
                        })
                      }
                      sx={{ color: palette.text.primary }}
                    >
                      <Typography>{category.name.slice(0, 10)}</Typography>
                    </Button>
                  ))}
            </Stack>
          </Drawer>
        )}
        <Container>
          <Container disableGutters sx={{ display: "flex" }}>
            {!matchesPr && (
              <Button
                title="Filter products"
                onClick={() => setOpenDrawer(true)}
                sx={{ m: 1 }}
                variant="contained"
              >
                <FilterListIcon />
              </Button>
            )}
            <Container sx={{ flexGrow: 1 }} disableGutters>
              <StyledSearch>
                <Input
                  sx={{ input: { color: palette.text.contrast } }}
                  fullWidth
                  disableUnderline={true}
                  startAdornment={
                    <Typography
                      sx={{
                        mr: 1,
                        color: palette.text.contrast,
                      }}
                    >
                      {searchParams.category.length > 0 &&
                        searchParams.category + ":"}
                    </Typography>
                  }
                  defaultValue={searchParams.name}
                  placeholder={
                    searchParams.name === "" ? "Search products…" : ""
                  }
                  onChange={(e) =>
                    setSearchParams((s) => {
                      return { category: s.category, name: e.target.value };
                    })
                  }
                />
              </StyledSearch>
            </Container>
          </Container>
          {productDisplay()}
        </Container>
      </Stack>
    </>
  );
}
