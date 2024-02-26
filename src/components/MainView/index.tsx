import { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";
import AppLogo from "../AppLogo";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import {
  MainContainer,
  AppDescriptionSection,
  AppNameContainer,
  AppHeader,
  AppHeaderInfoContainer,
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
} from "../styles";
import InstallButton from "../InstallButton";
import ContentSlider from "../ContentSlider";
import OpenSectionButton from "../OpenSectionButton";
import ChipSlider from "../ChipSlider";
import Review from "../Review";
import InstallationProgess from "../InstallationProgress";

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
    stars: 3,
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
  { stars: 5, rating: 70 },
  { stars: 4, rating: 25 },
  { stars: 3, rating: 1 },
  { stars: 2, rating: 1 },
  { stars: 1, rating: 3 },
];

const MainView: React.FC<Props> = ({ setView }) => {
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
            <InstallationProgess />
          </AppHeaderInfoContainer>
        </AppHeader>
        <AppStatisticsCard>
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>
              4,8 <StarIcon fontSize="inherit" />
            </AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "reviews" })}
            </AppStatisticsCardItemContent>
          </AppStatisticsCardItem>
          <VerticalDivider orientation="vertical" variant="inset" flexItem />
          <AppStatisticsCardItem>
            <AppStatisticsCardItemTitle>119К+</AppStatisticsCardItemTitle>
            <AppStatisticsCardItemContent>
              {intl.formatMessage({ id: "downloads" })}
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
        <InstallButton appLink="/" />
        <ContentSlider />
        <AboutGameContainer>
          <OpenSectionButton
            mixPanelEvent="landing_btn_aboutApp_pressed"
            id="about"
            view="about"
            setView={setView}
          />
        </AboutGameContainer>
        <ShortDescriptionWrapper>
          {intl.formatMessage({ id: "shortDescription" })}
        </ShortDescriptionWrapper>
        <ChipSlider />
      </AppDescriptionSection>
      <AppRatesAndSection>
        <AppRatesAndReviewsContainer>
          <AppRateContainer>4,8</AppRateContainer>
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
};

export default MainView;
