import { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ViewHeader from "../ViewHeader";
import {
  AboutAppContainer,
  AboutAppSectionTitle,
  AboutGameTextContainer,
  AppInfoContainer,
  AppInfoRow,
  AppInfoRowText,
  AppInfoTitle,
  HorizontalDivider,
  MainContentSection,
  Section,
  colors,
} from "../styles";

interface Props {
  setView: Dispatch<SetStateAction<string>>;
}

const AboutView: React.FC<Props> = ({ setView }) => {
  const intl = useIntl();
  return (
    <AboutAppContainer>
      <ViewHeader setView={setView}></ViewHeader>
      <MainContentSection>
        <AboutAppSectionTitle>
          {intl.formatMessage({ id: "about" })}
        </AboutAppSectionTitle>
        <AboutGameTextContainer>
          {intl.formatMessage({ id: "aboutGameText1" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText2" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText3" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText4" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText5" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText6" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText7" })}
          <br />
          {intl.formatMessage({ id: "aboutGameText8" })}
          <br />
          <br />
          {intl.formatMessage({ id: "aboutGameText9" })}
          <br />
          <br />
          {intl.formatMessage({ id: "aboutGameText10" })}
          <br />
          <br />
          {intl.formatMessage({ id: "aboutGameText11" })}
          <br />
          <br />
          {intl.formatMessage({ id: "aboutGameText12" })}
        </AboutGameTextContainer>
      </MainContentSection>
      <HorizontalDivider />
      <Section>
        <AboutAppSectionTitle>
          {intl.formatMessage({ id: "whatsNew" })}

          <FiberManualRecordIcon
            style={{
              color: `${colors.primary}`,
              fontSize: 12,
              marginLeft: "6px",
            }}
          />
        </AboutAppSectionTitle>
        <AboutGameTextContainer>
          {intl.formatMessage({ id: "newBonuses" })}
        </AboutGameTextContainer>
      </Section>
      <HorizontalDivider />
      <Section>
        <AppInfoTitle>{intl.formatMessage({ id: "appInfo" })}</AppInfoTitle>
        <AppInfoContainer>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "version" })}
            </AppInfoRowText>
            <AppInfoRowText>2.12.14</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "updatedOn" })}
            </AppInfoRowText>
            <AppInfoRowText>
              {intl.formatMessage({ id: "updateDate" })}
            </AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloads" })}
            </AppInfoRowText>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloadsAmount" })}
            </AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "downloadSize" })}
            </AppInfoRowText>
            <AppInfoRowText>15 MB</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "offeredBy" })}
            </AppInfoRowText>
            <AppInfoRowText>Nine Dev</AppInfoRowText>
          </AppInfoRow>
          <AppInfoRow>
            <AppInfoRowText>
              {intl.formatMessage({ id: "releasedOn" })}
            </AppInfoRowText>
            <AppInfoRowText>
              {intl.formatMessage({ id: "releaseDate" })}
            </AppInfoRowText>
          </AppInfoRow>
        </AppInfoContainer>
      </Section>
    </AboutAppContainer>
  );
};

export default AboutView;
