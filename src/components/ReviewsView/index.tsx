import { Dispatch, SetStateAction } from "react";
import {
  RatingsAndReviewsSection,
  RatingsAndReviewsWrapper,
  ViewAppContainer,
} from "../styles";
import ViewHeader from "../ViewHeader";
import Review from "../Review";
import { useIntl } from "react-intl";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
}

const reviewsData = [
  {
    name: "Stephanie Watson",
    avatarName: "S",
    color: "blueGrey",
    stars: 5,
    reviewKey: "Watson",
    date: "25/02/2024",
    src: "https://play-lh.googleusercontent.com/a-/ALV-UjW11Tdl38KLzy57nes-0mu8sD1IU104A94FXbdXiwOvmCc=s32",
  },
  {
    name: "Sheff816",
    avatarName: "F",
    color: "blue",
    stars: 5,
    reviewKey: "Sheff816",
    date: "24/02/2024",
  },
  {
    name: "Matthew",
    avatarName: "M",
    color: "deepPurple",
    stars: 3,
    reviewKey: "Matthew",
    date: "20/02/2024",
    src: "https://play-lh.googleusercontent.com/a-/ALV-UjU1J70EC47oO4pgCkbakP6NecmMx_1DGF7Ce6rn0kVKVm4=s32",
  },
  {
    name: "MassesOfPalpur",
    avatarName: "M",
    color: "brown",
    stars: 5,
    reviewKey: "MassesOfPalpur",
    date: "19/02/2024",
    src: "https://play-lh.googleusercontent.com/a-/ALV-UjXFH4QipeLANjgFHgPvyv5vrZRxSTSAXBVLx3oCvup6ETA=s32",
  },
  {
    name: "Opposum",
    avatarName: "O",
    color: "green",
    stars: 4,
    reviewKey: "Opposum",
    date: "19/02/2024",
  },
  {
    name: "Vindigo",
    avatarName: "V",
    color: "orange",
    stars: 4,
    reviewKey: "Vindigo",
    date: "18/02/2024",
    src: "https://play-lh.googleusercontent.com/a-/ALV-UjVmDNqO46bseaW5sRAS7_UuKDp4RFw9S816ZYvxqPV1lkc=s32-rw",
  },
  {
    name: "i_DrmRR_i",
    avatarName: "I",
    color: "red",
    stars: 5,
    reviewKey: "i_DrmRR_i",
    date: "17/02/2024",
    src: "https://play-lh.googleusercontent.com/a-/ALV-UjUTauTiiGmOdHTcb8HXks-qFSoR7XYimGAl2mCtsXPnQA=s32-rw",
  },
  {
    name: "Woger",
    avatarName: "W",
    color: "deepPurple",
    stars: 3,
    reviewKey: "Woger",
    date: "16/02/2024",
  },
];

const ReviewsView: React.FC<Props> = ({ setView }) => {
  const intl = useIntl();
  return (
    <ViewAppContainer>
      <ViewHeader id="ratingsAndReviews" setView={setView} />
      <RatingsAndReviewsWrapper>
        <RatingsAndReviewsSection>
          {reviewsData.map((review) => (
            <Review
              src={review.src ? review.src : undefined}
              key={review.name}
              name={review.name}
              avatarName={review.avatarName}
              color={review.color}
              stars={review.stars}
              text={intl.formatMessage({ id: review.reviewKey })}
              date={review.date}
            />
          ))}
        </RatingsAndReviewsSection>
      </RatingsAndReviewsWrapper>
    </ViewAppContainer>
  );
};

export default ReviewsView;
