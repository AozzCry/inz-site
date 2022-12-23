import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getFetch, postFetch } from "../hooks/fetchHooks";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Box,
  Button,
  Alert,
  Container,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { StyledInput } from "../components/styled";
import Context from "../utils/Context";

const statuses = ["in stock", "out of stock", "discontinued"];

export default function CreateProduct() {
  const { palette } = useTheme();
  const { notify } = useContext(Context);

  const [alert, setAlert] = useState(null);
  const [specification, setSpecification] = useState({ name: "", value: "" });
  const [specifications, setSpecifications] = useState([]);

  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState("");

  const { status, data } = useQuery({
    queryKey: ["/category"],
    queryFn: getFetch,
  });

  const productValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .min(3, "Name must be at least 3 characters.")
      .max(127, "Name must not exceed 127 characters."),
    price: Yup.number()
      .typeError("Price must be a number.")
      .required("Price is required.")
      .min(0.01, "Price must be bigger than 0."),
    shortDescription: Yup.string().max(
      63,
      "Short description must not exceed 63 characters."
    ),
    longDescription: Yup.string().max(
      4000,
      "Long description must not exceed 4000 characters."
    ),
    quantity: Yup.number()
      .typeError("Quantity must be a number.")
      .min(0, "Quantity can't be negative.")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    status: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productValidationSchema),
  });

  async function crerateProductSubmit(values) {
    postFetch("/product/create", {
      name: values.name,
      price: values.price,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      specifications: specifications,
      quantity: values.quantity,
      status: values.status,
      categories: categories.map((c) => c.name),
    }).then(({ error, message }) => {
      if (error) setAlert(error);
      else {
        reset();
        setSpecifications([]);
        setCategories([]);
        setAlert("");
        notify(message);
      }
    });
  }

  function addSpecification() {
    if (specification.name && specification.value) {
      if (!specifications.some((s) => s.name === specification.name)) {
        setSpecifications((s) => [...s, specification]);
        setSpecification({ name: "", value: "" });
        setAlert("");
      } else setAlert("Specification names must be unqiue.");
    }
  }

  return (
    <Container>
      <Box component="form">
        <StyledInput
          margin="dense"
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          autoFocus
        />
        <StyledInput
          margin="dense"
          fullWidth
          name="price"
          label="Price"
          id="price"
          {...register("price")}
          error={errors.price ? true : false}
          helperText={errors.price?.message}
        />
        <StyledInput
          margin="dense"
          fullWidth
          name="shortDescription"
          label="Short Description"
          id="shortDescription"
          {...register("shortDescription")}
          error={errors.shortDescription ? true : false}
          helperText={errors.shortDescription?.message}
        />
        <StyledInput
          margin="dense"
          fullWidth
          multiline
          name="longDescription"
          label="Long description"
          id="longDescription"
          {...register("longDescription")}
          error={errors.longDescription ? true : false}
          helperText={errors.longDescription?.message}
        />
        <Stack direction="row">
          <StyledInput
            margin="dense"
            fullWidth
            name="specificationName"
            label="Specification name"
            type="specificationName"
            id="specificationName"
            onChange={(e) =>
              setSpecification((s) => {
                return { name: e.target.value, value: s.value };
              })
            }
            value={specification.name}
          />
          <StyledInput
            sx={{ ml: 1 }}
            margin="dense"
            fullWidth
            name="specificationValue"
            label="Specification value"
            id="specificationValue"
            onChange={(e) =>
              setSpecification((s) => {
                return { name: s.name, value: e.target.value };
              })
            }
            value={specification.value}
          />
          <Button
            variant="contained"
            onClick={addSpecification}
            sx={{ ml: 1, mt: 1.0, mb: 0.5 }}
          >
            Add
          </Button>
        </Stack>
        <Container disableGutters={true}>
          {specifications.map((specification) => (
            <Button
              size="dense"
              sx={{ m: 0.5 }}
              variant="contained"
              key={specification.name}
              onClick={() => {
                setSpecifications(
                  specifications.filter((c) => c !== specification)
                );
                setAlert(null);
              }}
            >
              {specification.name} : {specification.value}
            </Button>
          ))}
        </Container>
        <Stack direction="row">
          <StyledInput
            select
            fullWidth
            inputProps={{
              ...register("status"),
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: palette.primary.dark,
                  },
                },
              },
            }}
            margin="dense"
            label="Status"
            defaultValue="out of stock"
          >
            {statuses.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </StyledInput>
          <StyledInput
            sx={{ ml: 1 }}
            margin="dense"
            fullWidth
            name="quantity"
            label="Quantity"
            id="quantity"
            defaultValue={0}
            {...register("quantity")}
            error={errors.quantity ? true : false}
            helperText={errors.quantity?.message}
          />
        </Stack>
        <Stack direction={"row"}>
          <StyledInput
            margin="dense"
            label="Search categories"
            onChange={(e) => setSearchCategories(e.target.value)}
          />
          <Container sx={{ ml: 0.5 }} disableGutters={true}>
            {categories.map((category) => (
              <Button
                size="dense"
                sx={{ m: 0.1 }}
                variant="contained"
                key={category._id}
                value={category.name}
                onClick={() => {
                  setCategories(categories.filter((c) => c !== category));
                  setAlert(null);
                }}
              >
                {category.name}
                <CheckIcon />
              </Button>
            ))}

            {status === "success" &&
              data

                .filter(
                  (category) =>
                    category.name
                      .toLowerCase()
                      .includes(
                        searchCategories ? searchCategories.trim() : null
                      ) && !categories.includes(category)
                )
                .map((category) => (
                  <Button
                    size="medium"
                    sx={{ m: 0.1, color: palette.text.primary }}
                    variant="outlined"
                    key={category._id}
                    value={category.name}
                    onClick={() => {
                      categories.length >= 5
                        ? setAlert("You can choose up to 5 categories.")
                        : setCategories([...categories, category]);
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
          </Container>
        </Stack>
        {alert ? <Alert severity="error">{alert}</Alert> : <></>}
        <Button
          title="Add product"
          fullWidth
          variant="contained"
          color="success"
          onClick={handleSubmit(crerateProductSubmit)}
          sx={{ mt: 1, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
