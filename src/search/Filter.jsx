import { useState } from "react";

import { useQuery } from "react-query";

import { TextField, Typography, Stack, Button } from "@mui/material";

export default function Filter({
  search,
  setSearch,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
}) {
  const [searchCategories, setSearchCategories] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["/category"],
  });
  return (
    <Stack sx={{ bgcolor: "primary.dark" }}>
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
        sx={{ my: 0.25, bgcolor: "primary.dark" }}
        fullWidth
        placeholder="Categories…"
        onChange={(e) => setSearchCategories(e.target.value)}
      />
      {search.category &&
        search.category.map((category) => (
          <Button
            sx={{ mb: 0.25 }}
            key={category + "active"}
            fullWidth
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
              sx={{ mb: 0.25, bgcolor: "primary.dark" }}
            >
              <Typography>{category.name.slice(0, 10)}</Typography>
            </Button>
          ))}
    </Stack>
  );
}
