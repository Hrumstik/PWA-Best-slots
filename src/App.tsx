import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ContentSlider from "./components/ContentSlider";
import ChipSlider from "./components/ChipSlider";
import OpenSectionButton from "./components/OpenSectionButton";
import Review from "./components/Review";
import {
  MainContainer,
  AppDescriptionSection,
  AppNameContainer,
  AppHeader,
  AppHeaderInfoContainer,
  AppDeveloperСompanyName,
  AppStatisticsCard,
  AppStatisticsCardItem,
  VerticalDivider,
  AppStatisticsCardItemTitle,
  AppStatisticsCardItemContent,
  AgeLogoContainer,
  AboutGameContainer,
  ShortDescriptionWrapper,
  AppRateContainer,
  AppRatesAndSection,
  AppRatesAndReviewsContainer,
  AppStarsContainer,
  AppRatesCountContainer,
  AppRatingContainer,
  RatingContainer,
  StarsCount,
  RatingChart,
  ReviewsSection,
  AgeImg,
} from "./components/styles";
import InstallButton from "./components/InstallButton";
import AppLogo from "./components/AppLogo";
import { useIntl } from "react-intl";

const reviewsData = [
  {
    name: "Stephanie Watson",
    avatarName: "S",
    color: "blueGrey",
    stars: 5,
    reviewKey: "Watson",
    date: "19/02/2024",
  },
  {
    name: "Sheff816",
    avatarName: "F",
    color: "blue",
    stars: 5,
    reviewKey: "Sheff816",
    date: "20/02/2024",
  },
  {
    name: "Matthew",
    avatarName: "M",
    color: "deepPurple",
    stars: 5,
    reviewKey: "Matthew",
    date: "18/02/2024",
  },
  {
    name: "MassesOfPalpur",
    avatarName: "M",
    color: "brown",
    stars: 5,
    reviewKey: "MassesOfPalpur",
    date: "19/02/2024",
  },
  {
    name: "Opposum",
    avatarName: "O",
    color: "green",
    stars: 5,
    reviewKey: "Opposum",
    date: "20/02/2024",
  },
];

const ratingsData = [
  { stars: 5, rating: 95 },
  { stars: 4, rating: 1 },
  { stars: 3, rating: 1 },
  { stars: 2, rating: 1 },
  { stars: 1, rating: 1 },
];

export default function Index() {
  const intl = useIntl();

  return (
    <MainContainer>
      <AppDescriptionSection>
        <AppHeader>
          <AppLogo />
          <AppHeaderInfoContainer>
            <AppNameContainer>
              {intl.formatMessage({ id: "name" })}
            </AppNameContainer>
            <AppDeveloperСompanyName>
              {intl.formatMessage({ id: "developerName" })}
            </AppDeveloperСompanyName>
          </AppHeaderInfoContainer>
        </AppHeader>
        <AppStatisticsCard>
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              5,0 <StarIcon fontSize="inherit" />
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "reviews" })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
          <VerticalDivider orientation="vertical" variant="inset" flexItem />
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>1000 +</AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "donwloads" })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
          <VerticalDivider orientation="vertical" variant="inset" flexItem />
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              <AgeLogoContainer>
                <AgeImg src="/18.png" alt="Age icon" />
              </AgeLogoContainer>
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "age" })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
        </AppStatisticsCard>
        <InstallButton
          appLink="/"
          pwaLink="https://benioosn.com/ee27112d91?extra_param_1=49487"
        />
        <ContentSlider />
        <AboutGameContainer>
          <OpenSectionButton string="about" />
        </AboutGameContainer>
        <ShortDescriptionWrapper>
          {intl.formatMessage({ id: "shortDescription" })}
        </ShortDescriptionWrapper>

        <ChipSlider />
      </AppDescriptionSection>
      <AppRatesAndSection>
        <AboutGameContainer>
          <OpenSectionButton string="ratingAndReviews" />
        </AboutGameContainer>
        <AppRatesAndReviewsContainer>
          <AppRateContainer>4.9</AppRateContainer>
          <AppStarsContainer>
            <Rating
              name="half-rating-read"
              defaultValue={4.6}
              precision={0.1}
              readOnly
              sx={{ color: "rgb(11, 87, 207)", fontSize: "14px" }}
            />
          </AppStarsContainer>
          <AppRatesCountContainer>21,301</AppRatesCountContainer>
          <AppRatingContainer>
            {ratingsData.map((data, index) => (
              <RatingContainer key={index}>
                <StarsCount>{data.stars}</StarsCount>
                <RatingChart rating={data.rating} />
              </RatingContainer>
            ))}
          </AppRatingContainer>
        </AppRatesAndReviewsContainer>
      </AppRatesAndSection>
      <ReviewsSection>
        {reviewsData.map((review) => (
          <Review
            key={review.name}
            name={review.name}
            avatarName={review.avatarName}
            color={review.color}
            stars={review.stars}
            text={intl.formatMessage({ id: review.reviewKey })}
            date={review.date}
          />
        ))}
      </ReviewsSection>
    </MainContainer>
  );
}
