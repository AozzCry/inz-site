import { useState } from "react";

import { useQuery } from "react-query";

import { Typography, Stack, Button, MenuItem } from "@mui/material";
import { StyledInput } from "../components/styled";

export default function Filter({
  search,
  setSearch,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  whichSort,
  setWhichSort,
}) {
  const [searchCategories, setSearchCategories] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["/category"],
  });
  return (
    <Stack sx={{ bgcolor: "primary.dark" }}>
      <StyledInput
        select
        id="sort-select"
        value={whichSort}
        label="Sort by"
        onChange={(e) => setWhichSort(e.target.value)}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
        sx={{ mx: 0.5 }}
      >
        <MenuItem value={"popularityDesc"}>Most popular</MenuItem>
        <MenuItem value={"priceDesc"}>Price: high to low</MenuItem>
        <MenuItem value={"priceAsc"}>Price: low to high</MenuItem>
        <MenuItem value={"ratingDesc"}>Best rated</MenuItem>
      </StyledInput>
      <Typography
        align="center"
        variant="body1"
        sx={{
          pt: 0.5,
          mt: 0.5,
          mx: 0.5,
          borderTop: 1,
          borderLeft: 1,
          borderRight: 1,
          borderColor: "primary.main",
        }}
      >
        Price range
      </Typography>
      <Stack direction="row">
        <StyledInput
          value={priceFrom}
          sx={{ maxWidth: "100px", ml: 0.5 }}
          placeholder="From"
          onChange={(e) =>
            (e.target.value.match("^[0-9]+$") || e.target.value === "") &&
            setPriceFrom(e.target.value)
          }
        />
        <StyledInput
          value={priceTo}
          sx={{ maxWidth: "100px", mx: 0.5 }}
          placeholder="To"
          onChange={(e) =>
            (e.target.value.match("^[0-9]+$") || e.target.value === "") &&
            setPriceTo(e.target.value)
          }
        />
      </Stack>
      <StyledInput
        sx={{ bgcolor: "primary.dark", mx: 0.5 }}
        placeholder="Categories…"
        onChange={(e) => setSearchCategories(e.target.value)}
      />
      {search.category &&
        search.category.map((category) => (
          <Button
            sx={{ mx: 0.5, mb: 0.25 }}
            key={category + "active"}
            variant={"contained"}
            onClick={() =>
              setSearch({
                name: search.name,
                category: search.category.filter((c) => c !== category),
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
              !search.category.includes(c.name)
          )
          .slice(0, 10)
          .map((category) => (
            <Button
              key={category.name}
              variant={"outlined"}
              onClick={() =>
                setSearch({
                  category: [...search.category, category.name],
                  name: search.name,
                })
              }
              sx={{ mx: 0.25, mb: 0.25, bgcolor: "primary.dark" }}
            >
              <Typography>{category.name.slice(0, 10)}</Typography>
            </Button>
          ))}
    </Stack>
  );
}
