import { useContext, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import Context from "../utils/Context";

import {
  Button,
  Drawer,
  Input,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { StyledSearch } from "../components/styled";

import Products from "./Products";
import Filter from "./Filter";

export default function Search() {
  const matchesPr = useMediaQuery(useTheme().breakpoints.up("pr"));
  const { search, setSearch } = useContext(Context);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const debouncedSet = useRef(
    debounce((e) => {
      setSearch((s) => {
        return { name: e, category: s.category };
      });
    }, 500)
  ).current;

  useEffect(() => {
    return () => debouncedSet.cancel();
  }, [debouncedSet]);

  return (
    <>
      <Stack direction={"row"}>
        {matchesPr ? (
          <Filter
            {...{
              search,
              setSearch,
              priceFrom,
              setPriceFrom,
              priceTo,
              setPriceTo,
            }}
          />
        ) : (
          <Drawer
            PaperProps={{
              sx: {
                bgcolor: "secondary.dark",
              },
            }}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <Filter
              {...{
                search,
                setSearch,
                priceFrom,
                setPriceFrom,
                priceTo,
                setPriceTo,
              }}
            />
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
                  sx={{ input: { color: "text.contrast" } }}
                  fullWidth
                  disableUnderline={true}
                  startAdornment={
                    <Typography
                      sx={{
                        mr: 1,
                        color: "text.contrast",
                      }}
                    >
                      {search.category.length > 0 && search.category + ":"}
                    </Typography>
                  }
                  defaultValue={search.name}
                  placeholder={search.name === "" ? "Search products…" : ""}
                  onChange={(e) => debouncedSet(e.target.value)}
                />
              </StyledSearch>
            </Container>
          </Container>
          <Products {...{ search, priceFrom, priceTo }} />
        </Container>
      </Stack>
    </>
  );
}
