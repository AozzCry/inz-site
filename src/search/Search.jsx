import { useContext, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import Context from "../utils/Context";

import {
  Button,
  Drawer,
  Input,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { StyledSearch } from "../components/styled";

import Products from "./Products";
import Filter from "./Filter";

export default function Search() {
  const matchesMd = useMediaQuery(useTheme().breakpoints.up("md"));
  const { search, setSearch } = useContext(Context);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [whichSort, setWhichSort] = useState("popularityDesc");

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
        {matchesMd ? (
          <Filter
            {...{
              search,
              setSearch,
              priceFrom,
              setPriceFrom,
              priceTo,
              setPriceTo,
              whichSort,
              setWhichSort,
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
                whichSort,
                setWhichSort,
              }}
            />
          </Drawer>
        )}
        <Container disableGutters sx={{ mx: 0.5 }}>
          <Container disableGutters sx={{ display: "flex" }}>
            {!matchesMd && (
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
                  defaultValue={search.name}
                  placeholder={search.name === "" ? "Search products…" : ""}
                  onChange={(e) => debouncedSet(e.target.value)}
                />
              </StyledSearch>
            </Container>
          </Container>
          <Products {...{ search, priceFrom, priceTo, whichSort }} />
        </Container>
      </Stack>
    </>
  );
}
