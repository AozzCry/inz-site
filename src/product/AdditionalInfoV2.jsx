import { useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import Context from '../utils/Context';

import { Stack, useMediaQuery, useTheme } from '@mui/material';

import AddQuestion from '../question/AddQuestion';
import Question from '../question/Question';
import AddReview from '../review/AddReview';
import Review from '../review/Review';

export default function AdditionalInfo(data, refetch) {
  const { palette, breakpoints } = useTheme();
  const matchesSm = useMediaQuery(breakpoints.up('sm'));
  const matchesXs = useMediaQuery(breakpoints.up('xs'));
  const navigate = useNavigate();
  const { userData, setSearch, notify, confirm } = useContext(Context);

  const mainRef = useRef(null);
  const descriptionRef = useRef(null);
  const specificationRef = useRef(null);
  const reviewsRef = useRef(null);
  const questionsRef = useRef(null);

  return (
    <Stack sx={{ my: 1, div: { bgcolor: 'secondary.main', borderRadius: 6 } }}>
      <span ref={reviewsRef} />
      {userData.isAdmin === false && (
        <AddReview productId={data.product._id} refetch={refetch} />
      )}
      {data.reviews.map((review) => (
        <Review
          user={{
            isAdmin: userData.isAdmin,
            userId: userData.userId,
          }}
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
  );
}
