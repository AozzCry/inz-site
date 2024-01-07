import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import fetch from '../hooks/fetchHooks';

import { useLocation, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import CheckIcon from '@mui/icons-material/Check';
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { StyledInput } from '../components/styled';
import Context from '../utils/Context';

const statuses = ['in stock', 'out of stock', 'discontinued'];

export default function ProductForm() {
  const { notify } = useContext(Context);

  const { state } = useLocation();

  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [specification, setSpecification] = useState({ name: '', value: '' });
  const [specifications, setSpecifications] = useState(
    state ? state.product.specifications : []
  );
  const [categories, setCategories] = useState(
    state ? state.product.categories : []
  );
  const [searchCategories, setSearchCategories] = useState('');

  const { status, data: fetchedCategories } = useQuery({
    queryKey: ['/category'],
    queryFn: fetch.get,
  });

  const productValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .min(3, 'Name must be at least 3 characters.')
      .max(127, 'Name must not exceed 127 characters.'),
    price: Yup.number()
      .typeError('Price must be a number.')
      .required('Price is required.')
      .min(0.01, 'Price must be bigger than 0.')
      .test(
        'has-two-decimal-places',
        'Price must have exactly two decimal places',
        (value) => /^\d+\.?\d{0,2}$/.test(value)
      ),
    shortDescription: Yup.string().max(
      63,
      'Short description must not exceed 63 characters.'
    ),
    longDescription: Yup.string().max(
      4000,
      'Long description must not exceed 4000 characters.'
    ),
    quantity: Yup.number()
      .typeError('Quantity must be a number.')
      .integer('Quantity must be an intiger.')
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
    fetch
      .put('/product/addorupdate', {
        _id: state ? state.product._id : null,
        product: {
          name: values.name,
          nameLink: encodeURIComponent(values.name.replace(/ /g, '-')),
          price: values.price,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          specifications,
          quantity: values.quantity,
          status: values.status,
          categories,
        },
      })
      .then(({ error, message }) => {
        if (error) setAlert(error);
        else {
          reset();
          setSpecifications([]);
          setCategories([]);
          setAlert('');
          notify(message);
          navigate(
            '../../product/' +
              encodeURIComponent(values.name.replace(/ /g, '-'))
          );
        }
      });
  }

  function addSpecification() {
    if (specification.name && specification.value) {
      if (!specifications.some((s) => s.name === specification.name)) {
        setSpecifications((s) => [...s, specification]);
        setSpecification({ name: '', value: '' });
        setAlert('');
      } else setAlert('Specification names must be unqiue.');
    }
  }

  return (
    <Container>
      <Box component="form">
        <Typography sx={{ mb: '5px' }} variant="h5">
          Create new product
        </Typography>
        <Tooltip title="Name of new product.">
          <StyledInput
            fullWidth
            id="name"
            name="name"
            label="Name"
            type="text"
            defaultValue={state ? state.product.name : ''}
            {...register('name')}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
            autoFocus
          />
        </Tooltip>
        <Tooltip title="Price of new product.">
          <StyledInput
            fullWidth
            name="price"
            label="Price"
            defaultValue={state ? state.product.price : ''}
            id="price"
            {...register('price')}
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />
        </Tooltip>
        <Tooltip title="Short description of new product.">
          <StyledInput
            fullWidth
            name="shortDescription"
            label="Short Description"
            defaultValue={state ? state.product.shortDescription : ''}
            id="shortDescription"
            {...register('shortDescription')}
            error={errors.shortDescription ? true : false}
            helperText={errors.shortDescription?.message}
          />
        </Tooltip>
        <Tooltip title="Long description of new product.">
          <StyledInput
            fullWidth
            multiline
            name="longDescription"
            label="Long description"
            defaultValue={state ? state.product.longDescription : ''}
            id="longDescription"
            {...register('longDescription')}
            error={errors.longDescription ? true : false}
            helperText={errors.longDescription?.message}
          />
        </Tooltip>
        <Stack direction="row">
          <Tooltip title="Specification name of new product.">
            <StyledInput
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
          </Tooltip>
          <Tooltip title="Specification value of new product.">
            <StyledInput
              fullWidth
              name="specificationValue"
              label="Specification value"
              id="specificationValue"
              onChange={(e) =>
                setSpecification((s) => {
                  return { name: s.name, value: e.target.value };
                })
              }
              sx={{ ml: 1 }}
              value={specification.value}
            />
          </Tooltip>
          <Tooltip title="Click to add specification name and value group to new product.">
            <Button
              variant="contained"
              onClick={addSpecification}
              sx={{ ml: 1, mt: 1, mb: 0.5 }}
            >
              Add
            </Button>
          </Tooltip>
        </Stack>
        <Container disableGutters={true}>
          {specifications.map((specification) => (
            <Tooltip title="Click to delete specification group from new product.">
              <Button
                size="dense"
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
            </Tooltip>
          ))}
        </Container>
        <Stack direction="row">
          <Tooltip title="Click to choose status of new product. Possible statuses: in stock, out of stock, discontinued.">
            <StyledInput
              select
              fullWidth
              inputProps={{
                ...register('status'),
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
              label="Status"
              defaultValue={state ? state.product.status : 'out of stock'}
            >
              {statuses.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </StyledInput>
          </Tooltip>
          <Tooltip title="Quantity of new product in stock.">
            <StyledInput
              fullWidth
              name="quantity"
              label="Quantity"
              defaultValue={state ? state.product.quantity : 0}
              id="quantity"
              {...register('quantity')}
              error={errors.quantity ? true : false}
              helperText={errors.quantity?.message}
              sx={{ ml: 1 }}
            />
          </Tooltip>
        </Stack>
        <Stack direction={'row'}>
          <Tooltip title="Search available categories. To add new go to CATEGORIES tab.">
            <StyledInput
              label="Search categories"
              onChange={(e) => setSearchCategories(e.target.value)}
            />
          </Tooltip>
          <Container sx={{ ml: 0.5 }} disableGutters={true}>
            {categories.map((category) => (
              <Tooltip
                key={category}
                title="Click to remove category from product."
              >
                <Button
                  sx={{ m: 0.1 }}
                  variant="contained"
                  value={category}
                  onClick={() => {
                    setCategories(categories.filter((c) => c !== category));
                    setAlert(null);
                  }}
                >
                  {category}
                  <CheckIcon />
                </Button>
              </Tooltip>
            ))}
            {status === 'success' &&
              fetchedCategories
                .filter(
                  (category) =>
                    category.name
                      .toLowerCase()
                      .includes(
                        searchCategories
                          ? searchCategories.trim().toLowerCase()
                          : null
                      ) && !categories.includes(category.name)
                )
                .map((category) => (
                  <Tooltip
                    key={category._id}
                    title="Click to add category to product."
                  >
                    <Button
                      sx={{ m: 0.1, color: 'text.primary ' }}
                      variant="outlined"
                      value={category.name}
                      onClick={() => {
                        categories.length >= 5
                          ? setAlert('You can choose up to 5 categories.')
                          : setCategories([...categories, category.name]);
                      }}
                    >
                      {category.name}
                    </Button>
                  </Tooltip>
                ))}
          </Container>
        </Stack>
        {alert ? <Alert severity="error">{alert}</Alert> : <></>}
        <Tooltip title="Click to create new product with all values above.">
          <Button
            title="Add product"
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSubmit(crerateProductSubmit)}
            sx={{ mt: 1, mb: 2 }}
          >
            Create
          </Button>
        </Tooltip>
      </Box>
    </Container>
  );
}
