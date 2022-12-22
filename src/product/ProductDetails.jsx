import { useQuery } from "react-query";
import { getFetch, patchFetch } from "../hooks/fetchHooks";

import { NavLink, useNavigate } from "react-router-dom";

import { useContext, useRef, useState } from "react";
import Context from "../utils/Context";

import {
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
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingPage from "../main/LoadingPage";
import ErrorPage from "../main/ErrorPage";

export default function ProductDetails() {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up("md"));
  const navigate = useNavigate();
  const { userData, cart, setCart, setSB } = useContext(Context);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    text: "",
    afterConfirm: null,
  });

  const mainRef = useRef(null);
  const descriptionRef = useRef(null);
  const specificationRef = useRef(null);
  const reviewsRef = useRef(null);
  const questionsRef = useRef(null);

  const {
    isLoading,
    isError,
    error,
    data: product,
    refetch,
  } = useQuery({
    queryKey: [window.location.pathname],
    queryFn: getFetch,
  });

  function deleteProduct() {
    patchFetch("/product/delete", { productId: product.product._id }).then(
      ({ message }) => {
        setSB({ open: true, message: message });
        navigate("-1");
      }
    );
  }

  function addToCart() {
    if (!cart.some((p) => p.product._id === product.product._id))
      setCart([...cart, { product: product.product, count: 1 }]);
  }
  if (isLoading) return <LoadingPage what="product" />;
  if (isError) return <ErrorPage error={error.message} />;
  if (product)
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
                setConfirmDialog={setConfirmDialog}
                images={
                  product.images.length > 0 && product.images.slice(0).reverse()
                }
                productId={product.product._id}
                isAdmin={userData && userData.isAdmin}
              />

              <CardContent sx={{ m: 0.25, border: 1, borderRadius: 5 }}>
                {product.product.categories.map((category) => (
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
                  {product.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.product.shortDescription}
                </Typography>
                <Stack sx={{ mt: 2 }} direction="row">
                  <Paper
                    sx={{
                      borderRadius: 4,
                      bgcolor: palette.secondary.dark,
                      p: 1,
                    }}
                  >
                    {product.product.gradeFromReviews !== null && (
                      <>
                        <Rating
                          readOnly
                          value={
                            product.product.starsFromReviews /
                            product.product.countOfReviews
                          }
                          precision={0.5}
                          emptyIcon={<StarIcon />}
                        />
                        <Typography textAlign={"center"} variant="body1">
                          ({product.product.countOfReviews})
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
                    {product.product.gradeFromReviews !== null && (
                      <>
                        <Typography align="center">Times bought:</Typography>
                        <Typography align="center" sx={{ ml: 1 }}>
                          {product.product.timesBought}
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
                  Price: {product.product.price.toFixed(2)}PLN
                  {userData.isAdmin && (
                    <Button
                      sx={{ ml: 1, p: 0.5 }}
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        setConfirmDialog({
                          open: true,
                          text: "Are you sure you want to delete this product?",
                          afterConfirm: deleteProduct,
                        })
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
                  {product.product.gradeFromReviews !== null && (
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
                        Status: {product.product.status}
                      </Typography>
                      <Typography sx={{ ml: 2 }} align="center">
                        Remaining: {product.product.quantity}
                      </Typography>
                    </Container>
                  )}
                </Paper>
                {cart &&
                cart.find((ci) => ci.product._id === product.product._id) ? (
                  <NavLink to="/cart">
                    <Button fullWidth variant="contained">
                      Go to cart
                    </Button>
                  </NavLink>
                ) : (
                  <Button fullWidth onClick={addToCart} variant="contained">
                    Add to cart
                  </Button>
                )}
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
            {product.product.longDescription}
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
              {product.product.specifications.map((specification, index) => (
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
            <AddReview productId={product.product._id} refetch={refetch} />
          )}
          {product.reviews.map((review) => (
            <Review
              user={{ isAdmin: userData.isAdmin, userId: userData.userId }}
              key={review._id}
              review={review}
              refetch={refetch}
            />
          ))}
          <span ref={questionsRef} />
          {userData.isAdmin === false && (
            <AddQuestion productId={product.product._id} refetch={refetch} />
          )}
          {product.questions.map((question) => (
            <Question
              user={{ isAdmin: userData.isAdmin, userId: userData.userId }}
              key={question._id}
              question={question}
              refetch={refetch}
            />
          ))}
        </Stack>
        <ConfirmDialog
          {...{
            confirmDialog,
            setConfirmDialog,
          }}
        />
      </>
    );
}
