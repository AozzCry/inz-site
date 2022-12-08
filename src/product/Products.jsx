import { useQuery } from "react-query";
import { getFetch } from "../hooks/fetchHooks";

import {
  Button,
  Drawer,
  Input,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

import Product from "./Product";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledSearch } from "../components/styled";
import { Container } from "@mui/system";
import { useTheme } from "@emotion/react";

export default function Products() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState(location.state);
  const { status, data } = useQuery({
    queryKey: ["/product", searchParams],
    queryFn: getFetch,
    //enabled:
    //  searchParams.categorie || searchParams.name.length > 2 ? true : false,
  });
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("sm"));

  const [searchCategories, setSearchCategories] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });
  return (
    <>
      <Stack direction={"row"} pb={1}>
        {matchesSm ? (
          <Stack sx={{ bgcolor: palette.secondary.dark }}>
            <TextField
              sx={{ bgcolor: palette.secondary.dark }}
              fullWidth
              placeholder="Categories…"
              onChange={(e) => setSearchCategories(e.target.value)}
            />
            {searchParams.category &&
              searchParams.category.map((category, index) => (
                <Button
                  key={index}
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
                  {category}
                </Button>
              ))}
            {categories &&
              categories
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(searchCategories) &&
                    !searchParams.category.includes(c.name)
                )
                .slice(0, 10)
                .map((category, index) => (
                  <Button
                    key={category._id}
                    variant={"outlined"}
                    onClick={() =>
                      setSearchParams({
                        category: [...searchParams.category, category.name],
                        name: searchParams.name,
                      })
                    }
                    sx={{ color: palette.text.primary }}
                  >
                    {category.name.slice(0, 10)}
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
            <Stack sx={{ bgcolor: palette.secondary.dark }}>
              <TextField
                sx={{ bgcolor: palette.secondary.dark }}
                fullWidth
                placeholder="Categories…"
                onChange={(e) => setSearchCategories(e.target.value)}
              />
              {searchParams.category &&
                searchParams.category.map((category, index) => (
                  <Button
                    key={index}
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
                    {category}
                  </Button>
                ))}
              {categories &&
                categories
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(searchCategories) &&
                      !searchParams.category.includes(c.name)
                  )
                  .slice(0, 10)
                  .map((category, index) => (
                    <Button
                      key={category._id}
                      variant={"outlined"}
                      onClick={() =>
                        setSearchParams({
                          category: [...searchParams.category, category.name],
                          name: searchParams.name,
                        })
                      }
                      sx={{ color: palette.text.primary }}
                    >
                      {category.name.slice(0, 10)}
                    </Button>
                  ))}
            </Stack>
          </Drawer>
        )}
        <Container>
          <Container sx={{ display: "flex" }}>
            {!matchesSm && (
              <Button
                onClick={() => setOpenDrawer(true)}
                sx={{ m: 1 }}
                variant="contained"
              >
                <CategoryIcon />
              </Button>
            )}
            <Container sx={{ flexGrow: 1 }} disableGutters>
              <StyledSearch>
                <Input
                  sx={{ input: { color: palette.text.contrast } }}
                  disableUnderline={true}
                  startAdornment={
                    <Typography sx={{ mr: 1 }}>
                      {searchParams.category.length > 0 &&
                        searchParams.category + ":"}
                    </Typography>
                  }
                  defaultValue={searchParams.name && searchParams.name}
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
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
            spacing={1}
          >
            {status === "success" &&
              data.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </Container>
        </Container>
      </Stack>
    </>
  );
}
