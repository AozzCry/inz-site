import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import fetch from '../hooks/fetchHooks';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { StyledInput, StyledSearch } from '../components/styled';
import ErrorPage from '../main/ErrorPage';
import LoadingPage from '../main/LoadingPage';

import Context from '../utils/Context';
import { deleteDocument } from '../utils/functions';

export default function ManageCategories() {
  const matchesSm = useMediaQuery(useTheme().breakpoints.up('sm'));

  const { notify, confirm } = useContext(Context);

  const [search, setSearch] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: categories,
    refetch,
  } = useQuery({
    queryKey: ['/category'],
  });

  const [alert, setAlert] = useState(null);

  const categoryValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Category name is required')
      .min(3, 'Category name must be at least 3 characters')
      .max(30, 'Category name must not exceed 30 characters'),
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
    fetch.post('category/create', { name: values.name }).then(({ error }) => {
      if (error) setAlert(error);
      else {
        setAlert(null);
        refetch();
        reset({ name: '' });
        notify('Category created successfully');
      }
    });
  }

  if (isLoading) return <LoadingPage what={'categories'} />;
  if (isError) return <ErrorPage error={error} />;
  return (
    <Container sx={{ pb: 1 }}>
      <Stack direction="row">
        {matchesSm && (
          <Box sx={{ width: 1, mt: 2 }}>
            <Tooltip title="Search by category name.">
              <StyledSearch>
                <InputBase
                  sx={{ width: 1, input: { color: 'text.contrast' } }}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Find category..."
                />
                <SearchIcon />
              </StyledSearch>
            </Tooltip>
          </Box>
        )}
        <Stack component={'form'} sx={{ width: 1 }} direction="row">
          <Tooltip title="Category name to be created.">
            <StyledInput
              sx={{ width: 1 }}
              margin="normal"
              id="name"
              name="name"
              label="Category name"
              type="text"
              {...register('name')}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
            />
          </Tooltip>
          {alert && <Typography>{alert}</Typography>}
          <Tooltip title="Click to create new category with given name.">
            <Button
              title="Create category"
              type="submit"
              variant="contained"
              size="small"
              onClick={handleSubmit(createCategory)}
              sx={{ width: 0.5, ml: 1, mt: 3, mb: 2, maxHeight: '40px' }}
            >
              Create
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      {!matchesSm && (
        <Tooltip title="Search by category name.">
          <StyledSearch>
            <InputBase
              sx={{ width: 1, input: { color: 'text.contrast' } }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find category..."
            />
            <SearchIcon />
          </StyledSearch>
        </Tooltip>
      )}
      <List
        sx={{
          mt: 2,

          borderRadius: '10px',
          bgcolor: 'primary.dark',
        }}
      >
        {categories
          .filter((c) =>
            c.name.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map((category) => {
            return (
              <ListItem
                key={category._id}
                sx={{
                  border: 1,
                  borderRadius: '15px',
                  bgcolor: 'secondary.dark',
                  m: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography color="textPrimary">{category.name}</Typography>
                  }
                />
                <Tooltip title="Delete category from database.">
                  <Button
                    title="Delete category"
                    onClick={() =>
                      confirm('Do you want to delete this category?', () =>
                        deleteDocument(
                          'category',
                          category.name,
                          refetch,
                          notify
                        )
                      )
                    }
                    variant="outlined"
                    color="error"
                    edge={'end'}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
}
