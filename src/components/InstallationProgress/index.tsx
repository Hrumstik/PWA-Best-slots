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

  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );

  const installProgress = useSelector(
    (state: RootState) => state.install.installProgress
  );

  return isInstalling ? (
    <InstallationProgessWrapper>
      <PercentagesMessage>{installProgress}</PercentagesMessage>
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
