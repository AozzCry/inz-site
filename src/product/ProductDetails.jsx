import { useContext, useRef } from "react";
import { useQuery } from "react-query";

import { getFetch, patchFetch } from "../hooks/fetchHooks";

import { useNavigate } from "react-router-dom";

import Context from "../utils/Context";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTheme } from "@emotion/react";
import AdditionalInfo from "./AdditionalInfo";
import Review from "../review/Review";
import AddReview from "../review/AddReview";
import AddQuestion from "../question/AddQuestion";
import Question from "../question/Question";
import ImageDetails from "../image/ImageDetails";
import ProductNavbar from "./ProductNavbar";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";
import AddToCartButton from "../components/AddToCartButton";

export default function ProductDetails() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("md"));

  const navigate = useNavigate();

  const { userData, notify, confirm } = useContext(Context);

  const mainRef = useRef(null);
  const descriptionRef = useRef(null);
  const specificationRef = useRef(null);
  const reviewsRef = useRef(null);
  const questionsRef = useRef(null);

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [window.location.pathname],
    queryFn: getFetch,
  });

  function deleteProduct() {
    patchFetch("/product/delete", { productId: data.product._id }).then(
      ({ message }) => {
        notify(message);
        navigate("-1");
      }
    );
  }

  if (isLoading) return <LoadingPage what="product" />;
  if (isError) return <ErrorPage error={error.message} />;
  if (!data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={1}
      >
        <Typography variant="h6" textAlign="center">
          Product with link {window.location.pathname.split("/")[2]} doesn't
          exist.
        </Typography>
      </Box>
    );
  if (data)
    return (
      <>
        <span ref={mainRef} />
        <ProductNavbar
          {...{
            mainRef,
            descriptionRef,
            specificationRef,
            reviewsRef,
            questionsRef,
          }}
        />
        <Card
          sx={{
            bgcolor: palette.primary.dark,
            p: 1,
            flexGrow: 1,
          }}
        >
          <Stack direction={matchesSm ? "row" : "column"}>
            <Stack sx={{ width: matchesSm ? 0.6 : "auto" }}>
              <ImageDetails
                images={
                  data.images.length > 0 && data.images.slice(0).reverse()
                }
                productId={data.product._id}
                isAdmin={userData && userData.isAdmin}
                refetch={refetch}
              />

              <CardContent sx={{ m: 0.25, border: 1, borderRadius: 5 }}>
                {data.product.categories.map((category) => (
                  <Button
                    key={category}
                    sx={{ mr: 1, mb: 1, color: palette.text.primary }}
                    variant="outlined"
                    onClick={() => {
                      navigate("/product", {
                        state: {
                          name: "",
                          category: category ? [category] : [],
                        },
                      });
                    }}
                  >
                    {category}
                  </Button>
                ))}
                <Typography sx={{ borderBottom: 1 }} gutterBottom variant="h6">
                  {data.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.product.shortDescription}
                </Typography>
                <Stack sx={{ mt: 2 }} direction="row">
                  <Paper
                    sx={{
                      borderRadius: 4,
                      bgcolor: palette.secondary.dark,
                      p: 1,
                    }}
                  >
                    {data.product.gradeFromReviews !== null && (
                      <>
                        <Rating
                          readOnly
                          value={
                            data.product.starsFromReviews /
                            data.product.countOfReviews
                          }
                          precision={0.5}
                          emptyIcon={<StarIcon />}
                        />
                        <Typography textAlign={"center"} variant="body1">
                          ({data.product.countOfReviews})
                        </Typography>
                      </>
                    )}
                  </Paper>
                  <Paper
                    sx={{
                      borderRadius: 4,
                      bgcolor: palette.secondary.dark,
                      p: 1,
                      ml: 1,
                    }}
                  >
                    {data.product.gradeFromReviews !== null && (
                      <>
                        <Typography align="center">Times bought:</Typography>
                        <Typography align="center" sx={{ ml: 1 }}>
                          {data.product.timesBought}
                        </Typography>
                      </>
                    )}
                  </Paper>
                </Stack>
              </CardContent>
            </Stack>
            <Stack
              sx={{
                borderRadius: 4,
                border: 1,
                m: 0.25,
                width: matchesSm ? 0.4 : "auto",
              }}
            >
              <Stack sx={{ p: 1 }}>
                <Typography variant="h5" sx={{ m: 1 }}>
                  Price: {data.product.price.toFixed(2)}PLN
                  {userData.isAdmin && (
                    <Button
                      sx={{ ml: 1, p: 0.5 }}
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        confirm(
                          "Are you sure you want to delete this product?",
                          deleteProduct
                        )
                      }
                    >
                      Delete product
                    </Button>
                  )}
                </Typography>
                <Paper
                  sx={{
                    borderRadius: 4,
                    bgcolor: palette.secondary.dark,
                    p: 1,
                  }}
                >
                  {data.product.gradeFromReviews !== null && (
                    <Container
                      sx={{
                        borderRadius: 3,
                        py: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      disableGutters
                    >
                      <Typography align="center">
                        Status: {data.product.status}
                      </Typography>
                      <Typography sx={{ ml: 2 }} align="center">
                        Remaining: {data.product.quantity}
                      </Typography>
                    </Container>
                  )}
                </Paper>
                <AddToCartButton product={data.product} />
                <AdditionalInfo />
              </Stack>
            </Stack>
          </Stack>
        </Card>
        <Stack
          ref={descriptionRef}
          sx={{ p: 1, bgcolor: palette.primary.dark }}
        >
          <Typography sx={{ mx: 1 }} variant="h4">
            Description
          </Typography>
          <Typography sx={{ mx: 1 }} style={{ whiteSpace: "pre-line" }}>
            {data.product.longDescription}
          </Typography>
          <Typography
            ref={specificationRef}
            sx={{ mt: 2, mx: 1, borderTop: 1 }}
            variant="h4"
          >
            Specifications
          </Typography>
          <Table>
            <TableBody>
              {data.product.specifications.map((specification, index) => (
                <TableRow key={specification.name}>
                  <TableCell
                    sx={{ bgcolor: palette.primary.dark, borderRadius: 6 }}
                    component="th"
                  >
                    {specification.name}
                  </TableCell>

                  <TableCell
                    sx={{ bgcolor: palette.primary.dark, borderRadius: 6 }}
                    component="th"
                  >
                    {specification.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <span ref={reviewsRef} />
          {userData.isAdmin === false && (
            <AddReview productId={data.product._id} refetch={refetch} />
          )}
          {data.reviews.map((review) => (
            <Review
              user={{ isAdmin: userData.isAdmin, userId: userData.userId }}
              key={review._id}
              review={review}
              refetch={refetch}
            />
          ))}
          <span ref={questionsRef} />
          {userData.isAdmin === false && (
            <AddQuestion productId={data.product._id} refetch={refetch} />
          )}
          {data.questions.map((question) => (
            <Question
              user={{ isAdmin: userData.isAdmin, userId: userData.userId }}
              key={question._id}
              question={question}
              refetch={refetch}
            />
          ))}
        </Stack>
      </>
    );
}
