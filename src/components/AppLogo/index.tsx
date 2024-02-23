import CircularProgress from "@mui/material/CircularProgress";
import {
  AppImg,
  LogoContainer,
  LogoInProgressContainer,
  LogoInProgressWrapper,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { useEffect } from "react";
import {
  setInstallProgress,
  setIsInstalled,
  stopFakeInstall,
  stopInstalling,
} from "../../Redux/feat/InstallSlice";

function AppLogo() {
  const dispatch = useDispatch();

  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );

  const isFakeInstallStarted = useSelector(
    (state: RootState) => state.install.fakeInstall
  );

  const instalProgress = useSelector(
    (state: RootState) => state.install.installProgress
  );

  useEffect(() => {
    const fakeInstall = async () => {
      let progress = 0;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const randomIncrement = Math.random() * (30 - 10) + 10;
        progress += randomIncrement;
        progress = Math.min(progress, 100);
        progress = Math.floor(progress);

        dispatch(setInstallProgress(progress));

        const elapsedTime = (Date.now() - startTime) / 1000;

        if (progress >= 100 && elapsedTime >= 12) {
          clearInterval(interval);
          dispatch(stopFakeInstall());
          dispatch(stopInstalling());
          dispatch(setIsInstalled());
        }
      }, 1000);
    };

    if (isFakeInstallStarted) {
      fakeInstall();
    }
  }, [isFakeInstallStarted, dispatch]);

  const showCircularProgress = isInstalling && isFakeInstallStarted;
  const showPermanentCircularProgress = isInstalling && !isFakeInstallStarted;
  const showLogo = !isInstalling && !isFakeInstallStarted;

  return (
    <>
      {showCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src="/icon.png" alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            variant="determinate"
            value={+instalProgress}
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showPermanentCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src="/icon.png" alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showLogo && (
        <LogoContainer>
          <AppImg src="/icon.png" alt="App logo" />
        </LogoContainer>
      )}
    </>
  );
}

export default AppLogo;
