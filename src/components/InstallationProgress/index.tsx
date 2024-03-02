import { useIntl } from "react-intl";
import {
  AppDeveloperСompanyName,
  InstallationProgessWrapper,
  PercentagesMessage,
  VerifiedConteiner,
} from "../styles";
import { useSelector } from "react-redux";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { RootState } from "../../Redux/store/store";

export default function InstallationProgess() {
  const intl = useIntl();

  const isDownloadeding = useSelector(
    (state: RootState) => state.install.fakeDownload
  );

  const isProgress = useSelector(
    (state: RootState) => state.install.isInstalling
  );

  const fakeDownloadProgress = useSelector(
    (state: RootState) => state.install.fakeDownloadProgress
  );

  return isDownloadeding || isProgress ? (
    <InstallationProgessWrapper>
      <PercentagesMessage>{fakeDownloadProgress}</PercentagesMessage>
      <VerifiedConteiner>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 10, color: "green" }} />
        {intl.formatMessage({ id: "verified" })}
      </VerifiedConteiner>
    </InstallationProgessWrapper>
  ) : (
    <AppDeveloperСompanyName>
      {intl.formatMessage({ id: "developerName" })}
    </AppDeveloperСompanyName>
  );
}
